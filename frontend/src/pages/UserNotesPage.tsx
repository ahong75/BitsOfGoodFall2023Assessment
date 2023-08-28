import { UserNotes } from '../components'
import { useParams } from 'react-router' 
import { User } from '../types'
import { useQuery } from 'react-query'
import userService from '../services/userService'

function UserNotesPage() {
  const { data: users = [], isLoading, isError, error } = useQuery<User[], Error>('users', userService.fetchUsers)
  const { id } = useParams<{ id: string }>()
  const selectedUser = users.find(user => user.id === id)
  if (isLoading) {
    return (
    <div className="text-center">Loading...</div>
    )
  }
  if (!selectedUser || isError) {
    return (
      <div className="text-center text-red-500">{selectedUser ? error?.message : "User Not Found"}</div>
    )
  }
  return (
    <div className="container mx-auto mt-8 bg-gray-100 p-4 font-sans">
      <div className="w-10/12 mx-auto bg-white p-4 rounded shadow">
        <h1 className="text-center font-bold mb-4">Notes for {selectedUser.name}</h1>
        <UserNotes user={selectedUser} />
      </div>
    </div>
  )
}

export default UserNotesPage

