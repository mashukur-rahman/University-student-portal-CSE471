import Register from "./registration";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import Profile from "./profile";
import Forgotpassword from "./forgotPassword";
import Addfaculty from "./addFaculty";
import Facultyratingfeed from "./facultyRatingFeed";
import Facultydetails from "./facultyDetails";
import Editfaculty from "./editFacultydetails";
import Bloodbank from "./bloodbank";
import Contactdonor from "./contactDOnor";
import Notifications from "./notifications";
import Notes from "./notes";
import Notesearch from "./notesearch";
import Notedetails from "./notedetails";
import Swaprequest from "./swaprequest";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot" element={<Forgotpassword />} />
          <Route path="/addfaculty" element={<Addfaculty />} />
          <Route path="/facultyratingfeed" element={<Facultyratingfeed />} />
          <Route path="/facultydetails" element={<Facultydetails />} />
          <Route path="/editfaculty" element={<Editfaculty />} />
          <Route path="/bloodbank" element={<Bloodbank />} />
          <Route path="/contactdonor" element={<Contactdonor />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notesearch" element={<Notesearch />} />
          <Route path="/notedetails" element={<Notedetails />} />
          <Route path="/swaprequest" element={<Swaprequest />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
