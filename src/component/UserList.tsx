import { SortBy, type User } from '../types.d'
interface Props {
  users: User[]
  showColors: boolean
  deleteUser: (email: string) => void
  changeSorting: (sort: SortBy) => void
}
export default function UserList ({ changeSorting, users, deleteUser, showColors }: Props) {
  return (
    <table width='100%'>
        <thead>
            <tr>
                <th>Foto</th>
                {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <th className='pointer' onClick={() => { changeSorting(SortBy.NAME) }}>Nombre</th>
                 {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <th className='pointer' onClick={() => { changeSorting(SortBy.LAST) }}>Apellido</th>
                 {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <th className='pointer' onClick={() => { changeSorting(SortBy.COUNTRY) }}>Pais</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {
                users.map((user, index) => {
                  const backgroundColor = index % 2 === 0 ? '#333' : '#555'
                  const color = showColors ? backgroundColor : 'transparent'
                  return (
                    <tr key={user.email} style={{ backgroundColor: color }}>
                        <td>
                            <img src={user.picture.thumbnail} alt={user.name.title}/>
                        </td>
                        <td>
                            {user.name.first}
                        </td>
                        <td>
                            {user.name.last}
                        </td>
                        <td>
                            {user.location.country}
                        </td>
                        <td>
                         <button onClick={() => { deleteUser(user.email) }} type='button'>Eliminar</button>
                        </td>
                    </tr>
                  )
                }
                )
            }
        </tbody>
    </table>
  )
}
