import './App.css'
import UserList from './component/UserList'
import useUser from './Hook/useUser'
import { useState, useRef, useMemo } from 'react'
import { SortBy, type User } from './types.d'

function App () {
  const originalUsers = useRef<User[]>([])
  const { users, updateUser } = useUser({ originalUsers })

  const [showColors, setShowColor] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const togleColors = () => {
    setShowColor(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
    // setSortCountry(!sortCountry)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    updateUser(filteredUsers)
  }

  const handleReset = () => {
    updateUser(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const filterUsers = useMemo(() => {
    console.log('filter')
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    console.log('user')

    if (sorting === SortBy.NONE) return filterUsers
    if (sorting === SortBy.COUNTRY) return filterUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    if (sorting === SortBy.NAME) return filterUsers.toSorted((a, b) => a.name.first.localeCompare(b.name.first))
    if (sorting === SortBy.LAST) return filterUsers.toSorted((a, b) => a.name.last.localeCompare(b.name.last))

    // alternativa extensible que vimos con midu muy buena e interesante a implementar
    // const comparePropertis: Record<string, (user: User) => any> = {
    //   [SortBy.COUNTRY]: (user) => user.location.country,
    //   [SortBy.NAME]: (user) => user.name.first,
    //   [SortBy.LAST]: (user) => user.name.last
    // }
    // return filterUsers.toSorted((a, b) => {
    //   const extractProperty = comparePropertis[sorting]
    //   return extractProperty(a).localeCompare(extractProperty(b))
    // })

    // alternativa de tosorted ya que sort muta el objeto y no queremos eso porque no renderiza el componente si mutamos.
    // [...users].sort((a, b) => {
    // return a.location.country.localeCompare(b.location.country)
    // })

    return filterUsers
  }, [filterUsers, sorting])

  return (
    <div className="App">
      <h1>Prueba tecnica</h1>
      <header>
        <button type='button' onClick={togleColors}>Show Colors</button>
        <button type='button' onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'MessCountry' : 'SortByCountry' }
        </button>
        <button type='button' onClick={handleReset}>Reset Original Users</button>
        <input className='Country' placeholder='Filtra por Pais' onChange={(e) => {
          setFilterCountry(e.target.value)
        }}/>
      </header>
      <main>
      <UserList changeSorting={handleChangeSort} users={sortedUsers} deleteUser={handleDelete} showColors={showColors}/>
      </main>
    </div>
  )
}

export default App
