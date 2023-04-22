import { useEffect, useState } from 'react'
import { type User } from '../types'
interface Props {
  originalUsers: React.MutableRefObject<User[]>
}

export default function useUser ({ originalUsers }: Props) {
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
