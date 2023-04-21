import './App.css'
import UserList from './component/UserList'
import useUser from './Hook/useUser'
import { useState, useRef } from 'react'
import { type User } from './types'

function App () {
  const originalUsers = useRef<User[]>([])
  const { users, updateUser } = useUser({ originalUsers })
  const [showColors, setShowColor] = useState(false)
  const [sortCountry, setSortCountry] = useState(false)
  const togleColors = () => {
    setShowColor(!showColors)
  }
  const toggleSortByCountry = () => {
    setSortCountry(!sortCountry)
  }
  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    updateUser(filteredUsers)
  }

  const handleReset = () => {
    updateUser(originalUsers.current)
  }
  const sortedUsers = sortCountry
    ? users.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
  // [...users].sort((a, b) => {
  // return a.location.country.localeCompare(b.location.country)
  // })
    : users
  return (
    <div className="App">
      <h1>Prueba tecnica</h1>
      <header>
        <button type='button' onClick={togleColors}>Show Colors</button>
        <button type='button' onClick={toggleSortByCountry}>
          {sortCountry ? 'MessCountry' : 'SortByCountry' }
        </button>
        <button type='button' onClick={handleReset}>Reset Original Users</button>
      </header>
      <main>
      <UserList users={sortedUsers} deleteUser={handleDelete} showColors={showColors}/>
      </main>
    </div>
  )
}

export default App
