import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App'
import './index.css'

const baseUrl = '/api/persons'

axios.get(baseUrl).then(response => {
  const persons = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(<App persons={persons} />)
})