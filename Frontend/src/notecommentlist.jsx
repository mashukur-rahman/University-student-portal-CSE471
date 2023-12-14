import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
function Notecommentlist(props) {
  const [commentlist, setCommentlist] = useState([]);
  useEffect(() => {
    async function getcomments() {
      const result = await axios.post("/api/getnotecomments", {
        course: props.course,
      });
      setCommentlist(result.data);
    }
    getcomments();
  }, []);
  return (
    <>
      {commentlist.map((comment, idx) => {
        return (
          <>
            <Card key={idx} style={{ width: "70%", marginLeft: "15%" }}>
              <Card.Body>
                <Card.Title>{comment.commentator}</Card.Title>
                <Card.Text>{comment.comment}</Card.Text>
              </Card.Body>
            </Card>
          </>
        );
      })}
    </>
  );
}

export default Notecommentlist;
