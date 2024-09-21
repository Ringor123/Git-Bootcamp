import { useEffect, useState } from "react";
import Diaries from "./components/Diaries";
import Form from "./components/Form";
import { getAllDiaries } from "./services/diariesService";
import { DiaryEntry } from "./types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diariesData = await getAllDiaries();
      setDiaries(diariesData);
    };
    fetchDiaries();
  }, []);

  return (
    <div>
      <h1>Ilari's flight diary</h1>
      <div>
        <Form setDiaries={setDiaries} diaries={diaries} />
        <Diaries diaries={diaries} />
      </div>
    </div>
  );
}

export default App;
