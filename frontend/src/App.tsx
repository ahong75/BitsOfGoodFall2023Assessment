import './App.css';
import { useState, useEffect } from 'react'
import { UserForm } from './components'
import { User } from './types'
import userService from './services/users' 

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [userFormDisplayMode, setUserFormDisplayMode] = useState("notDisplaying");
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

  useEffect(() => {
    userService
      .fetchUsers()
      .then(response => response.json())
      .then(initialUsers => {
        setUsers(initialUsers)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])
  
  const newUserSubmit = (newUser: User) => {
    const newUserWithId = { ...newUser, id: users.length + 1 }
    userService
      .createUser(newUserWithId)
      .then(response => {
        if (response.ok) {
          setUsers([newUserWithId, ...users])
        }
      })
      .catch(error => {
        console.log(error)
      })
    setUserFormDisplayMode("notDisplaying")
  }

  const updateUserSubmit = (updatedUser: User) => {
    userService
      .updateUser(updatedUser)
      .then(response => {
        if (response.ok) {
          const updatedUsers = users.map(user => (
            updatedUser.id === user.id ? updatedUser : user
          ))
          setUsers(updatedUsers)
        }
      })
      .catch(error => {
        console.error(error)
      })
    setUserFormDisplayMode("notDisplaying")
  }

  const userUpdate = (userId: number) => {
    setUserFormDisplayMode("updatingUser")
    const newUserToUpdate = users.find(user => user.id === userId)
    if (newUserToUpdate) {
      setUserToUpdate(newUserToUpdate)
    }
  }

  const userDelete = (userId: number) => {
    userService
      .deleteUser(userId)
      .then(response => {
        if (response.ok) {
          setUsers(users.filter(user => user.id !== userId))
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
  return (
    <div className="container mx-auto mt-8">
      <button onClick={() => {setUserFormDisplayMode("creatingUser")}}>Add New User</button>
      {userFormDisplayMode === "creatingUser" && (
        <UserForm handleSubmit={newUserSubmit} initialFormState={newUserInitial}/>
      )}
      {userFormDisplayMode === "updatingUser" && (
        <UserForm handleSubmit={updateUserSubmit} initialFormState={userToUpdate}/>
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
            {users.map(user => (
              <tr>
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
                  <button onClick={() => {userUpdate(user.id)}}>Update</button>
                  <button onClick={() => {userDelete(user.id)}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default App;
