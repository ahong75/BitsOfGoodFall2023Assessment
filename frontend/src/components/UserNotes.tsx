import { User } from '../types'
type Props = {
  user: User
}
function UserNotes({ user } : Props) {
  return (
    <div className="text-xl">
     {user.notes}
    </div>
  )
}
export default UserNotes
