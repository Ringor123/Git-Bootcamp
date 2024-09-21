import { DiaryEntry } from "../types";

interface DiariesProps {
  diaries: DiaryEntry[];
}

const Diaries = ({ diaries }: DiariesProps) => {
  // console.log(diaries);

  return (
    <div>
      <h2>Diary entries</h2>
      <ul className="cards">
        {diaries.map((diary) => (
          <li key={diary.id}>
            <h3>{diary.date}</h3>
            <p>
              <strong>Weather: </strong>
              {diary.weather}
            </p>
            <p>
              <strong>Visibility: </strong>
              {diary.visibility}
            </p>
            {diary.comment && (
              <p>
                <strong>Comment: </strong>
                <em>{diary.comment}</em>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Diaries;
