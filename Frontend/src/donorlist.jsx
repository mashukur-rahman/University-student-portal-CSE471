import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Table } from "react-bootstrap";
function Donorlist(props) {
  const [checker, setChecker] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.list.length > 0) {
      setChecker(true);
      setData(props.list);
    }
  }, [props.list]);

  return (
    <>
      {checker && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {data.map((donor) => {
              return (
                <>
                  <tr key={donor.email}>
                    <td>{donor.name}</td>
                    <td>{donor.email}</td>
                    <td>{donor.phone}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          navigate("/contactdonor", {
                            state: { email: donor.email },
                          });
                        }}
                      >
                        Send message
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}
export default Donorlist;
