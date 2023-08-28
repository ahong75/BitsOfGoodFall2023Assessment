import { User, UserFormDisplayMode } from '../types'
import { useDeleteUserMutation } from '../hooks/userHooks'
import { useNavigate } from 'react-router'

type Props = {
  users: User[]
  setUserFormDisplayMode: (mode: UserFormDisplayMode) => void
  setUserToUpdate: (user: User) => void
}

function UserTable({ users, setUserFormDisplayMode, setUserToUpdate } : Props) {
  const navigate = useNavigate()

  const handleUpdateClick = (userId: string) => {
    setUserFormDisplayMode('updatingUser')
    const newUserToUpdate = users.find((user) => user.id === userId)
    if (newUserToUpdate) {
      setUserToUpdate(newUserToUpdate)
    }
  }

  const deleteUserMutation = useDeleteUserMutation()

  const handleDeleteClick = (userId: string) => {
    deleteUserMutation.mutate(userId)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="hidden sm:table-header-group">
          <tr>
            <th className="px-2 py-1 text-center bg-gray-200">Name</th>
            <th className="px-2 py-1 text-center bg-gray-200">Profile Picture</th>
            <th className="px-2 py-1 text-center bg-gray-200">Phone</th>
            <th className="px-2 py-1 text-center bg-gray-200">Email</th>
            <th className="px-2 py-1 text-center bg-gray-200">Rating</th>
            <th className="px-2 py-1 text-center bg-gray-200">Status</th>
            <th className="px-2 py-1 text-center bg-gray-200">Hero Project</th>
            <th className="px-2 py-1 text-center bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="flex flex-col sm:table-row odd:bg-gray-50 hover:bg-gray-100" onClick={() => navigate(`/user/${user.id}`)}>
              <td className="text-center font-bold px-2 py-1 sm:border-b">{user.name}</td>
              <td className="text-center px-2 py-1 sm:border-b">
                <img className="mx-auto sm:mx-0" src={user.avatar} alt={`Face of ${user.name}`} />
              </td>
              <td className="text-center px-2 py-1 sm:border-b">{user.phone}</td>
              <td className="text-center px-2 py-1 sm:border-b">{user.email}</td>
              <td className="text-center px-2 py-1 sm:border-b">{user.rating}</td>
              <td className="text-center px-2 py-1 sm:border-b">
                {user.status ? (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full">Active</span>
                ) : (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full">Inactive</span>
                )}
              </td>
              <td className="text-center px-2 py-1 sm:border-b">{user.hero_project}</td>
              <td className="px-2 py-1 text-center sm:border-b">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleUpdateClick(user.id)
                  }}>
                  Update
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteClick(user.id)
                  }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable

