import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useState } from "react";
import Select from "react-select";

const AuthorBirthyearFormSelect = ({ setNotify, authors }) => {
  const [changeBornYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const errorMessage =
        error.graphQLErrors[0].message || "An unexpected error ocurred";
      setNotify(errorMessage);
    },
  });

  const [born, setBorn] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (event) => {
    event.preventDefault();

    setBorn(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    changeBornYear({variables: {name: selectedOption.value, setBornTo: Number(born)}})
    setBorn("")
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <label>
          Name:{" "}
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            name="name"
            options={authors.data.allAuthors.map(a => ({value:a.name, label: a.name}))}
          ></Select>
        </label>
        <label>
          Birth Year:{" "}
          <input
            onChange={handleChange}
            type="number"
            name="born"
            value={born}
          ></input>
        </label>
        <button style={{ width: "200px" }} type="submit">
          Update Author Birthyear
        </button>
      </form>
    </div>
  );
};

export default AuthorBirthyearFormSelect;
