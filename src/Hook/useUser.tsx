// import { useEffect, useState } from 'react'
// import { type User } from '../types'
// import { getUsers } from '../services/GetUsers'
// interface Props {
//   originalUsers: React.MutableRefObject<User[]>
// }

// export default function useUser ({ originalUsers }: Props) {
//   const [loading, setLoading] = useState(false)
//   const [Page, setPage] = useState(1)
//   const [error, setError] = useState<boolean>(false)

//   const [users, setUsers] = useState<User[]>([])
//   // useEffect(() => {
//   //   setLoading(true)
//   //   setError(false)
//   //   getUsers(Page)
//   //     .then(resp => {
//   //       setUsers(prevUser => {
//   //         const newUser = prevUser.concat(resp)
//   //         originalUsers.current = newUser
//   //         return newUser
//   //       })
//   //     })
//   //     .catch(e => {
//   //       console.error(e)
//   //       setError(true)
//   //     })
//   //     .finally(() => { setLoading(false) }) // lo colocamos en finally para que cambie tanto con resp ok como cuando tenemos un error
//   // }, [Page])
//   return { users, updateUser: setUsers, loading, error, setCurrentPage: setPage }
// }
