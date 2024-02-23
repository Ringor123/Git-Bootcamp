import Course from "./components/Course"
import React from "react"


const App = ({courses}) => 
  <div>
    <h1>Web development curriculum</h1> <br/>
    <Course courses={courses} /> 
  </div>
  

export default App