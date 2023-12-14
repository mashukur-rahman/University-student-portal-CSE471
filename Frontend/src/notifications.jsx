import { useEffect, useState } from "react";
import Navigationbar from "./navbar";
import axios from "axios";
import { Card } from "react-bootstrap";
function Notifications() {
  const [noti, setNoti] = useState([]);
  useEffect(() => {
    async function getnotification() {
      const result = await axios.post("/api/notifications", {
        email: sessionStorage.getItem("user"),
      });
      if (result.data.length > 0) {
        setNoti(result.data);
      }
    }
    getnotification();
  }, []);

  return (
    <>
      <Navigationbar />
      {noti.map((notifications) => {
        return (
          <>
            <Card>
              <Card.Body>
                <Card.Title>
                  Notification from: {notifications.sender}
                </Card.Title>
                <Card.Text>
                  <h5>Mesage: </h5>
                  {notifications.message}
                </Card.Text>
              </Card.Body>
            </Card>
          </>
        );
      })}
    </>
  );
}

export default Notifications;
