import { CourseParts } from "../types";

interface ContentProps {
  courseParts: CourseParts[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((course, index) => (
        <p key={index}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
