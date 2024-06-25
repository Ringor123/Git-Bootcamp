import { useParams } from "react-router-dom";


export const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(anecdote => anecdote.id === Number(id))

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Author: {anecdote.author}</p>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  );
};

export default Anecdote;