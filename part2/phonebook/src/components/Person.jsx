const Person = ({person, handleDeleteClick}) => {
    return (
      <tr>
        <td><strong>Name:</strong> {person.name}</td>
        <td><strong>Number:</strong> {person.number}</td>
        <td><button onClick = {handleDeleteClick}>Delete</button></td>
      </tr>
    )
  }

  export default Person