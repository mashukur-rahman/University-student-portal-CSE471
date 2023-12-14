import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function Facultycard(props) {
  const [checker, setChecker] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.data.initial) {
      setChecker(true);
    }
  }, [props.data]);
  return (
    <>
      {checker && (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{props.data.name}</Card.Title>
            <Card.Text>
              <h5>{props.data.initial}</h5>
              <h6>{props.data.course}</h6>
            </Card.Text>

            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/facultydetails", {
                  state: {
                    initial: props.data.initial,
                    name: props.data.name,
                    email: props.data.email,
                    room: props.data.room,
                  },
                });
              }}
            >
              Details
            </button>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default Facultycard;
