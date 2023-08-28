import { UserForm } from '.'
import { User, UserFormDisplayMode } from '../types'
import userService from '../services/userService' 
import { useQueryClient, useMutation } from 'react-query'

type Props = {
  newUserInitial: User
  setUserFormDisplayMode: (mode: UserFormDisplayMode) => void
}
function CreateUserForm({ newUserInitial, setUserFormDisplayMode } : Props) {
  const queryClient = useQueryClient()
  const createUserMutation = useMutation(userService.createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    }
  })
  const handleCreateUserSave = (newUser: User) => {
    createUserMutation.mutate(newUser)
    setUserFormDisplayMode("notDisplaying")
  }
  return (
    <UserForm handleSubmit={handleCreateUserSave} initialFormState={newUserInitial} setUserFormDisplayMode={setUserFormDisplayMode}/>
  )
}

export default CreateUserForm
