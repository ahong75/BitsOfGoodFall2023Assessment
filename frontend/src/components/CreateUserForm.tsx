import { UserForm } from '.'
import { User, UserFormDisplayMode } from '../types'
import { useCreateUserMutation } from '../hooks/userHooks'

type Props = {
  newUserInitial: User
  setUserFormDisplayMode: (mode: UserFormDisplayMode) => void
}
function CreateUserForm({ newUserInitial, setUserFormDisplayMode } : Props) {
  const createUserMutation = useCreateUserMutation()
  const handleCreateUserSave = (newUser: User) => {
    createUserMutation.mutate(newUser)
    setUserFormDisplayMode("notDisplaying")
  }
  return (
    <UserForm handleSubmit={handleCreateUserSave} initialFormState={newUserInitial} setUserFormDisplayMode={setUserFormDisplayMode}/>
  )
}

export default CreateUserForm
