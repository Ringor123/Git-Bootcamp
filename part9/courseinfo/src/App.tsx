// import "./App.css";
import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { courses } from "./data/courses";

const App = () => {
  const courseName = "Half Stack application development";

  const totalExercises = courses.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header courseName={courseName} />
      <Content courses={courses} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
