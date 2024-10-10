import { ALL_AUTHORS } from "../queries"
import { useQuery } from "@apollo/client";
import AuthorBirthyearFormSelect from "./AuthorBirthyearFormSelect";
import AuthorBirthyearForm from "./AuthorBirthyearForm";

const Authors = ({show, setNotify}) => {

  const authors = useQuery(ALL_AUTHORS)
  

  if (!show) {
    return null
  }

  if (authors.loading) {
    return <div>Loading...</div>
  }

  if (authors.error) {
    return <div>Error {authors.error.message}</div>
  }

  console.log(authors.data.allAuthors)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birthyear</h2>
      
      {/* Exercise 8.11
      <AuthorBirthyearForm setNotify={setNotify}/> */}

      {/* Exercise 8.12 */}
      <AuthorBirthyearFormSelect setNotify={setNotify} authors={authors} />
    </div>
  )
}

export default Authors
