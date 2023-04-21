import { useEffect, useState } from 'react'
import { type User } from '../types'
export default function useUser ({ originalUsers }) {
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(json => {
        setUsers(json.results)
        originalUsers.current = json.results
      })
      .catch(e => {
        console.error(e)
      })
  }, [setUsers])
  return { users, updateUser: setUsers }
}
