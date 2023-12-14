const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "cse471",
});

app.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  const qry = "insert into users values(?,?)";
  connection.query(qry, [email, password], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.json("Already registered");
      }
    } else {
      console.log(result);
      res.json("registered");
    }
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const qry = "Select email from users where email=? and password=?";
  connection.query(qry, [email, password], (err, result) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.json(result[0]);
    }
  });
});

app.post("/api/profile", (req, res) => {
  const { email, name, id, session, department, bloodgroup, phone } = req.body;
  const qry = "insert into user_profiles values(?,?,?,?,?,?,?)";
  connection.query(
    qry,
    [email, name, id, session, department, bloodgroup, phone],
    (err, result) => {
      if (err) {
        res.json({ message: err });
      } else {
        res.json("successful");
      }
    }
  );
});

app.post("/api/forgot", (req, res) => {
  const { email, password } = req.body;
  const qry = "update users set password=? where email=?";
  connection.query(qry, [password, email], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/api/addfaculty", (req, res) => {
  var qry = "insert into faculty_profiles values(?,?,?,?,?, ?)";
  const { student, name, initial, email, room, course } = req.body;
  connection.query(
    qry,
    [student, name, initial, email, room, course],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.json("Already registered");
        }
      } else {
        console.log(result);
        res.json("registered");
      }
    }
  );
});

app.post("/api/searchfaculty", (req, res) => {
  const qry = "select * from faculty_profiles where initial=?";
  connection.query(qry, [req.body.initial], (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: err });
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.post("/api/submitreview", (req, res) => {
  const { faculty, rating, comment, student } = req.body;
  const qry = "insert into reviews values(?,?,?,?)";
  connection.query(qry, [faculty, rating, comment, student], (err, result) => {
    if (err) {
      console.log(err);
      res.json("err");
    } else {
      console.log("inserted", result);
      res.json("inserted");
    }
  });
});

app.post("/api/getreviews", (req, res) => {
  const initial = req.body.initial;
  const qry = "select * from reviews where initial=?";
  connection.query(qry, [initial], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/api/addedfaculty", (req, res) => {
  const student = req.body.student;
  const qry = "select * from faculty_profiles where stu_name=?";
  connection.query(qry, [student], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/api/deletefaculty", (req, res) => {
  const initial = req.body.initial;
  const qry = "delete from faculty_profiles where initial=?";
  connection.query(qry, [initial], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

app.post("/api/updatefaculty", (req, res) => {
  const { name, initial, room, email, course, previnitial } = req.body;
  const qry =
    "update faculty_profiles set initial=?, name=?, room=?, email=?, course=? where initial=?";
  connection.query(
    qry,
    [initial, name, room, email, course, previnitial],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const qry2 = "update reviews set initial=? where initial=?";
        connection.query(qry2, [initial, previnitial], (err2, result2) => {
          if (err2) {
            console.group(err2);
          } else {
            console.log(result2);
            res.json("Updated");
          }
        });
      }
    }
  );
});

app.post("/api/searchdonor", (req, res) => {
  const qry = "select * from user_profiles where bloodgroup=?";
  connection.query(qry, [req.body.bloodgroup], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.post("/api/getprofile", (req, res) => {
  const qry = "select * from user_profiles where email=? ";
  connection.query(qry, [req.body.email], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/api/sendmessage", (req, res) => {
  const { message, sender, receiver } = req.body;
  const qry = "insert into message values(?,?,?)";
  connection.query(qry, [message, sender, receiver], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json("sent");
    }
  });
});

app.post("/api/notifications", (req, res) => {
  const qry = "select * from message where receiver=? ";
  connection.query(qry, [req.body.email], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/api/bloodrequest", (req, res) => {
  const { email, message } = req.body;
  const qry = "insert into bloodrequest values(?,?)";
  connection.query(qry, [email, message], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json("sent");
    }
  });
});

app.post("/api/getbloodrequest", (req, res) => {
  const qry = "select * from bloodrequest";
  connection.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/api/myrequest", (req, res) => {
  const qry = "select * from bloodrequest where requested_by=?";
  connection.query(qry, [req.body.email], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/api/deletereq", (req, res) => {
  const qry = "delete from bloodrequest where message=?";
  connection.query(qry, [req.body.message], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/api/postresource", (req, res) => {
  const { code, link, uploader } = req.body;
  const qry = "insert into materials values(?,?,?)";
  connection.query(qry, [uploader, code, link], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json("inserted");
    }
  });
});

app.post("/api/searchnote", (req, res) => {
  const qry = "select * from materials where course=?";
  connection.query(qry, [req.body.search], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/api/notecommentinsert", (req, res) => {
  const { commentator, comment, course } = req.body;
  const qry = "insert into material_comments values(?,?,?)";
  connection.query(qry, [course, commentator, comment], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json("Added");
    }
  });
});

app.post("/api/getnotecomments", (req, res) => {
  const qry = "select * from material_comments where course=?";
  connection.query(qry, [req.body.course], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/api/getmynotes", (req, res) => {
  const qry = "select * from materials where uploader=?";
  connection.query(qry, [req.body.uploader], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/api/deletemynote", (req, res) => {
  const qry = "delete from materials where course=?";
  connection.query(qry, [req.body.course], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

app.post("/api/addswap", (req, res) => {
  const { course, section, details, student } = req.body;
  const qry = "insert into swap_request values(?,?,?,?)";
  connection.query(qry, [course, section, details, student], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

app.post("/api/getswaplist", (req, res) => {
  const qry = "Select * from swap_request";
  connection.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(3000, (req, res) => {});
