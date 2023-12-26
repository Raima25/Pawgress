import '@/styles/globals.css'
import { useState } from 'react'
import {AuthContext} from "../contexts/useAuth"

export default function App({ Component, pageProps }) {
  const [loginUser, setLoginUser] = useState();
  const [users, setUsers] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [trainingLogs, setTrainingLogs] = useState([]);
  const [display, setDisplay] = useState(0);
  const [editLog, setEditLog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (<AuthContext.Provider value={{ loginUser, setLoginUser, users, setUsers, animals, setAnimals, trainingLogs, setTrainingLogs, display, setDisplay, editLog, setEditLog, searchTerm, setSearchTerm }}>
     <Component {...pageProps} />
  </AuthContext.Provider>);
}
