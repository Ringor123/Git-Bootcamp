const Person = ({person}) => {
    return (
      <tr>
        <td><strong>Name:</strong> {person.name}</td>
        <td><strong>Number:</strong> {person.number}</td>
      </tr>
    )
  }

  export default Person