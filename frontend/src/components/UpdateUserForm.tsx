import { UserForm } from '.'
import { User, UserFormDisplayMode } from '../types'
import { useUpdateUserMutation } from '../hooks/userHooks'

type Props = {
  userToUpdate: User
  setUserFormDisplayMode: (mode: UserFormDisplayMode) => void
}
function UpdateUserForm({ userToUpdate, setUserFormDisplayMode } : Props) {
  const updateUserMutation = useUpdateUserMutation()
  const handleUpdateUserSave = (updatedUser: User) => {
    updateUserMutation.mutate(updatedUser)
    setUserFormDisplayMode("notDisplaying")
  }
  return (
    <UserForm handleSubmit={handleUpdateUserSave} initialFormState={userToUpdate} setUserFormDisplayMode={setUserFormDisplayMode}/>
  )
}

export default UpdateUserForm
