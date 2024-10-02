import { useState } from "react";
import { DiaryEntry, Visibility, Weather } from "../types";
import { createDiaryEntry } from "../services/diariesService";
import axios from "axios";

interface FormProps {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  diaries: DiaryEntry[];
}

const Form = ({ setDiaries, diaries }: FormProps) => {
  const [inputValues, setInputValues] = useState({
    date: "",
    visibility: Visibility.Great,
    weather: Weather.Sunny,
    comment: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createDiaryEntry(inputValues)
      .then((data) => {
        setDiaries(diaries.concat(data));
        setInputValues({
          weather: Weather.Sunny,
          visibility: Visibility.Great,
          date: "",
          comment: "",
        });
        setSuccessMessage('Entry added successfully')
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        }
      });
  };

  return (
    <>
      <h3>Add new diary</h3>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={inputValues.date}
          placeholder="date"
        ></input>
        <fieldset>
          <legend>Choose visibility conditions</legend>
          {Object.values(Visibility).map((visibility, index) => (
            <div key={index}>
              <input
                type="radio"
                id={visibility}
                name="visibility"
                onChange={handleChange}
                value={visibility}
                checked={inputValues.visibility === visibility}
              />
              <label htmlFor={visibility}>{visibility}</label>
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>Choose weather conditions</legend>
          {Object.values(Weather).map((weather, index) => (
            <div key={index}>
              <input
                type="radio"
                name="weather"
                id={weather}
                onChange={handleChange}
                value={weather}
                checked={inputValues.weather === weather}
              />
              <label htmlFor={weather}>{weather}</label>
            </div>
          ))}
        </fieldset>

        <input
          name="comment"
          onChange={handleChange}
          value={inputValues.comment}
          placeholder="comment"
        ></input>
        <button type="submit">Add entry</button>
      </form>
    </>
  );
};

export default Form;
