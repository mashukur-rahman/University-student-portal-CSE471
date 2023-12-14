import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
function Myrequests() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function myrequest() {
      const result = await axios.post("/api/myrequest", {
        email: sessionStorage.getItem("user"),
      });
      setData(result.data);
    }
    myrequest();
  }, []);

  function deleterequest(request) {
    async function deletereq() {
      const result = await axios.post("/api/deletereq", { message: request });
      setData(data.filter((requests) => requests.message !== request));
    }
    deletereq();
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>My requests</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((request) => {
            return (
              <>
                <tr key={request.requested_by}>
                  <td>{request.message}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => deleterequest(request.message)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Myrequests;
