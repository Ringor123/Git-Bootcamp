import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courses: CoursePart[];
}

const Content = ({ courses }: ContentProps) => {
  return (
    <div>
        <Part courses={courses} />
    </div>
  );
};

export default Content;
