import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
function Bloodrequestlist() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getbloodrequest() {
      const result = await axios.post("/api/getbloodrequest", {
        email: sessionStorage.getItem("user"),
      });
      setData(result.data);
    }
    getbloodrequest();
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Requested by</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {data.map((request) => {
            return (
              <>
                <tr key={request.requested_by}>
                  <td>{request.requested_by}</td>
                  <td>{request.message}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
export default Bloodrequestlist;
