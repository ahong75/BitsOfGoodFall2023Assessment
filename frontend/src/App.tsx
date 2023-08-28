import './App.css';
import { useState } from 'react'
import { UserForm } from './components'
import { User } from './types'
import userService from './services/userService' 
import { useQueryClient, useMutation, useQuery } from 'react-query'

type UserFormDisplayMode = "notDisplaying" | "updatingUser" | "creatingUser"
function App() {
  const { data: users = [], isLoading, isError, error} = useQuery<User[], Error>('users', userService.fetchUsers)
  const [userFormDisplayMode, setUserFormDisplayMode] = useState<UserFormDisplayMode>("notDisplaying");
  const newUserInitial = {
    name: "",
    avatar: "",
    hero_project: "",
    notes: "",
    email: "",
    phone: "",
    rating: 0,
    status: false,
    id: 0,
  }
  const [userToUpdate, setUserToUpdate] = useState(newUserInitial)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const queryClient = useQueryClient()
  const createUserMutation = useMutation(userService.createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    }
  })
  const updateUserMutation = useMutation(userService.updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    }
  })
  const deleteUserMutation = useMutation(userService.deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    }
  })

  const handleNewUserSave = (newUser: User) => {
    const newUserWithId = { ...newUser, id: users.length + 1 }
    createUserMutation.mutate(newUserWithId)
    setUserFormDisplayMode("notDisplaying")
  }

  const handleUpdateUserSave = (updatedUser: User) => {
    updateUserMutation.mutate(updatedUser)
    setUserFormDisplayMode("notDisplaying")
  }

  const handleUpdateUserButton = (userId: number) => {
    setUserFormDisplayMode("updatingUser")
    const newUserToUpdate = users.find(user => user.id === userId)
    if (newUserToUpdate) {
      setUserToUpdate(newUserToUpdate)
    }
  }

  const handleDeleteUserButton = (userId: number) => {
    deleteUserMutation.mutate(userId)
  }

  const renderPaginationControls = () => {
    const totalPages = Math.ceil(users.length / itemsPerPage);

    return (
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem)
  return (
    <div className="container mx-auto mt-8">
      {isLoading && 'Loading...'}
      {isError && error.message}
      <button onClick={() => {setUserFormDisplayMode("creatingUser")}}>Add New User</button>
      {userFormDisplayMode === "creatingUser" && (
        <UserForm handleSubmit={handleNewUserSave} initialFormState={newUserInitial}/>
      )}
      {userFormDisplayMode === "updatingUser" && (
        <UserForm handleSubmit={handleUpdateUserSave} initialFormState={userToUpdate}/>
      )}
      {users.length > 0 ? (
        <table className="min-w-full">
          <thead>
            <tr>
              {Object.keys(users[0]).map(propertyName => (
                <th key={propertyName} className="px-4 py-2">
                  {propertyName}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(user => (
              <tr key={user.id}>
                <td className="font-bold px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">
                  <img src={user.avatar} alt={`Face of ${user.name}`}/>
                </td>
                <td className="px-4 py-2">{user.hero_project}</td>
                <td className="px-4 py-2">{user.notes}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.rating}</td>
                <td className="px-4 py-2">
                  {user.status ? (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full">
                      Inactive
                    </span>
                  )}
                </td>
                <td>
                  <button onClick={() => {handleUpdateUserButton(user.id)}}>Update</button>
                  <button onClick={() => {handleDeleteUserButton(user.id)}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
      {renderPaginationControls()}
    </div>
  )
}

export default App;
