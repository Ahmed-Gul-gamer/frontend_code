import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//components

import ListOfStudents from "./components/ListOfStudents";
import EditPage from "./components/EditPage"


function App() {
  return (
      <div>
        <Router>
          <Routes>
          <Route path="/" element={<ListOfStudents/>}/>
          <Route path="/EditPage/" element={<EditPage/>}/>
          </Routes>
        </Router>
      </div>
  );
};

export default App;
