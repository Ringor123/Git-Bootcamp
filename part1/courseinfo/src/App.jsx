const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return <div> 
    <Part part = {props.courseParts[0].name} exercises = {props.courseParts[0].nExercises} />
    <Part part = {props.courseParts[1].name} exercises = {props.courseParts[1].nExercises} />
    <Part part = {props.courseParts[2].name} exercises = {props.courseParts[2].nExercises} />
  </div>
}

const Total = (props) => {
  return <p>Number of exercises {props.exercises[0].nExercises + props.exercises[1].nExercises + props.exercises[2].nExercises } </p>
}

const Part = (props) => {
  return <p>{props.part} {props.exercises}</p>
}


const App = () => {
  const course = 'Half Stack application development'
  const courseParts = [
    {name: 'Fundamentals of React', nExercises:10},
    {name: 'Using props to pass data', nExercises:7},
    {name: 'State of a component', nExercises:14},
  ]
  return (
    <div>
      <Header course = {course} />
      <Content courseParts = {courseParts}/>
      <Total exercises ={courseParts} />
    </div>
  )
}

export default App