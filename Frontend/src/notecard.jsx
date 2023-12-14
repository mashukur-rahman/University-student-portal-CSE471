import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Notecard(props) {
  const navigate = useNavigate();
  const [checker, setChecker] = useState(false);

  useEffect(() => {
    if (props.data.length > 0) {
      setChecker(true);
    }
  }, [props.data.length]);

  return (
    <>
      {checker && (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Course: {props.data[0].course}</Card.Title>
            <Card.Text>
              <h5>Uploaded by: {props.data[0].uploader}</h5>
              <h6></h6>
            </Card.Text>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/notedetails", {
                  state: {
                    course: props.data[0].course,
                    uploader: props.data[0].uploader,
                    link: props.data[0].link,
                  },
                })
              }
            >
              Details
            </button>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
export default Notecard;
