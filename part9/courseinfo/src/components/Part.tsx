import { CoursePart } from "../types";

interface CourseProps {
  courses: CoursePart[];
}

const Part = ({ courses }: CourseProps) => {
  return (
    <div>
      {courses.map((part) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={part.name}>
                <p>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                  <br />
                  <em>{part.description}</em>
                </p>
              </div>
            );

          case "group":
            return (
              <div key={part.name}>
                <p>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                  <br />
                  Project exercises {part.groupProjectCount}
                </p>
              </div>
            );

          case "background":
            return (
              <div key={part.name}>
                <p>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                  <br />
                  <em>{part.description}</em>
                  <br />
                  Download material here: 
                  <a href={part.backgroundMaterial}>
                    {part.backgroundMaterial}
                  </a>
                </p>
              </div>
            );

          case "special":
            return (
              <div key={part.name}>
                <p>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                  <br />
                  <em>{part.description}</em>
                  <br />
                  required skils: {part.requirements.map(req => req + ", ")}
                </p>
              </div>
            )

          default:
            throw new Error("The course kind is incorrect or missing")
        }
      })}
    </div>
  );
};

export default Part;
