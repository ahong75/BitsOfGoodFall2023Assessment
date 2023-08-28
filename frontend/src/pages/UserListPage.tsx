import React, { useState } from 'react'
import { UserTable, UpdateUserForm, CreateUserForm, PageControl } from '../components'
import { User, UserFormDisplayMode } from '../types'
import { useFetchUsersQuery } from '../hooks/userHooks'

function UserListPage() {
  const { data: users = [], isLoading, isError, error } = useFetchUsersQuery()
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
  }
  const [userToUpdate, setUserToUpdate] = useState(newUserInitial)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(users.length / itemsPerPage)
  const indexOfLastUser = currentPage * itemsPerPage
  const indexOfFirstUser = indexOfLastUser - itemsPerPage
  const displayedUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  if (isLoading) return <div className="text-center">Loading...</div>
  if (isError) return <div className="text-center text-red-500">{error.message}</div>

  return (
    <div className="container mx-auto bottom:mt-8 bg-gray-100 p-4 font-sans">
      <header className="w-10/12 mx-auto text-center font-bold text-2xl mb-6">HaHa Heroes</header>
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
        {users.length > 0 && <UserTable users={displayedUsers} setUserFormDisplayMode={setUserFormDisplayMode} setUserToUpdate={setUserToUpdate}/>}
      </div>
      <PageControl currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}

export default UserListPage
