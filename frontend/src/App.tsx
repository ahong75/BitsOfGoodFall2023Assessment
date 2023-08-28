import React, { useState } from 'react'
import { useQueryClient, useMutation, useQuery } from 'react-query'
import './App.css'
import { UpdateUserForm, CreateUserForm, PageControl } from './components'
import { User, UserFormDisplayMode } from './types'
import userService from './services/userService'

function App() {
  const { data: users = [], isLoading, isError, error } = useQuery<User[], Error>('users', userService.fetchUsers)
  const [userFormDisplayMode, setUserFormDisplayMode] = useState<UserFormDisplayMode>("notDisplaying")
  const newUserInitial: User = {
    name: '',
    avatar: '',
    hero_project: '',
    notes: '',
    email: '',
    phone: '',
    rating: 0,
    status: false,
    id: (users.length + 1).toString(),
  };
  const [userToUpdate, setUserToUpdate] = useState(newUserInitial)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const queryClient = useQueryClient()

  const deleteUserMutation = useMutation(userService.deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })

  const handleUpdateUserButton = (userId: string) => {
    setUserFormDisplayMode('updatingUser')
    const newUserToUpdate = users.find((user) => user.id === userId)
    if (newUserToUpdate) {
      setUserToUpdate(newUserToUpdate)
    }
  }

  const handleDeleteUserButton = (userId: string) => {
    deleteUserMutation.mutate(userId)
  }

  const totalPages = Math.ceil(users.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem)
  return (
    <div className="container mx-auto mt-8 bg-gray-100 p-4 font-sans">
      {isLoading && <div className="text-center">Loading...</div>}
      {isError && <div className="text-center text-red-500">{error.message}</div>}
      {userFormDisplayMode === 'creatingUser' && (
        <CreateUserForm newUserInitial={{ ...newUserInitial, id: (users.length + 1).toString() }} setUserFormDisplayMode={setUserFormDisplayMode} />
      )}
      {userFormDisplayMode === 'updatingUser' && (
        <UpdateUserForm userToUpdate={userToUpdate} setUserFormDisplayMode={setUserFormDisplayMode} />
      )}

      <div className="w-10/12 mx-auto bg-white p-4 rounded shadow">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => setUserFormDisplayMode('creatingUser')}
        >
          Add New User
        </button>
        {users.length > 0 ? (
          <table className="min-w-full">
            <thead>
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
            <tbody>
              {currentItems.map((user) => (
                <tr key={user.id} className="odd:bg-gray-50">
                  <td className="text-center font-bold px-2 py-1">{user.name}</td>
                  <td className="text-center px-2 py-1">
                    <img src={user.avatar} alt={`Face of ${user.name}`} />
                  </td>
                  <td className="text-center px-2 py-1">{user.phone}</td>
                  <td className="text-center px-2 py-1">{user.email}</td>
                  <td className="text-center px-2 py-1">{user.rating}</td>
                  <td className="text-center px-2 py-1">
                    {user.status ? (
                      <span className="bg-green-500 text-white rounded-full">Active</span>
                    ) : (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full">Inactive</span>
                    )}
                  </td>
                  <td className="text-center px-2 py-1">{user.hero_project}</td>
                  <td>
                    <button
                      className="text-center bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                      onClick={() => handleUpdateUserButton(user.id)}
                    >
                      Update
                    </button>
                    <button
                      className="text-center bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                      onClick={() => handleDeleteUserButton(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      ) : (
        <p className="text-center">No users found.</p>
      )}
      </div>
      
      <PageControl currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}

export default App;

