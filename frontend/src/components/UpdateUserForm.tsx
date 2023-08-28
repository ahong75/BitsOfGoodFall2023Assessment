import { UserForm } from '.'
import { User, UserFormDisplayMode } from '../types'
import userService from '../services/userService' 
import { useQueryClient, useMutation } from 'react-query'

type Props = {
  userToUpdate: User
  setUserFormDisplayMode: (mode: UserFormDisplayMode) => void
}
function UpdateUserForm({ userToUpdate, setUserFormDisplayMode } : Props) {
  const queryClient = useQueryClient()
  const updateUserMutation = useMutation(userService.updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    }
  })
  const handleUpdateUserSave = (updatedUser: User) => {
    updateUserMutation.mutate(updatedUser)
    setUserFormDisplayMode("notDisplaying")
  }
  return (
    <UserForm handleSubmit={handleUpdateUserSave} initialFormState={userToUpdate} setUserFormDisplayMode={setUserFormDisplayMode}/>
  )
}

export default UpdateUserForm
