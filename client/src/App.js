import React, {useState, useEffect}  from 'react';
import './App.css';
import {CREATE_USER}                 from "./mutations/user.js";
import {GET_ALL_USERS, GET_ONE_USER} from "./query/user.js";
import {useQuery, useMutation}       from '@apollo/client'

const App = () => {
   const {data, loading, error, refetch} = useQuery(GET_ALL_USERS)
   const {data:oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
      variables: {
         id: 1
      }
   })
   const [newUser] = useMutation(CREATE_USER)
   const [users, setUsers] = useState([])

   const [username, setUsername] = useState('')
   const [age, setAge] = useState(0)

   useEffect(() => {
      if (!loading) {
         setUsers(data.getAllUsers)
      }
   }, [data])


   const addUser = e  => {
      e.preventDefault()
      newUser({
         variables: {
            input: {
               username, age: +age
            }
         }
      }).then(({data}) => {
         console.log(data)
         setUsername('')
         setAge(0)
      })
   }

   const getAll = e  => {
      e.preventDefault()
      refetch()

   }

   if (loading) {
      return <h1>Loading...</h1>
   }

   return (
      <div>
         <form action="">
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text"/>
            <input value={age} onChange={(e) => setAge(e.target.value)} type="number"/>
            <div className="btns">
               <button onClick={addUser}>Создать</button>
               <button onClick={getAll}>Получить</button>
            </div>
         </form>
         <div>
            {
               users.map(user => <div key={user.id} className="user">{user.id}. {user.username} {user.age}</div>)
            }
         </div>

      </div>
   );
}

export default App;
