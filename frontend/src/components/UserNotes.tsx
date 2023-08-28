import { useParams } from 'react-router-dom'

function UserNotes() {
  const userId = useParams()
  return (
    <div>
      <h2>User Notes</h2>
    </div>
  )
}
export default UserNotes
