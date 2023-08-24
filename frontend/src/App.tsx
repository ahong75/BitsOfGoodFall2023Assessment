import './App.css';
import { useState, useEffect } from 'react'

interface Volunteer {
  name: string;
  avatar: string;
  hero_project: string;
  notes: string;
  email: string;
  phone: string;
  rating: number;
  status: boolean;
  id: number;
}
const TableEntry: React.FC<{ volunteer: Volunteer }> = ({volunteer}) => {
  return (
    <div>
      <p>{volunteer.name}</p>
      <p>{volunteer.avatar}</p>
      <p>{volunteer.hero_project}</p>
      <p>{volunteer.notes}</p>
      <p>{volunteer.email}</p>
      <p>{volunteer.phone}</p>
      <p>{volunteer.rating}</p>
      <p>{volunteer.status}</p>
    </div>
  )
}
function App() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  
  useEffect(() => {
    fetch('http://localhost:5001/api/bog/users')
      .then(response => {
        return response.json()
      })
      .then(initialVolunteers => {
        setVolunteers(initialVolunteers)
      })
      .catch(error => {
        console.error('Error fetching data', error)
      })
  }, [])
  return (
    <div>
      {volunteers.map(volunteer => <TableEntry volunteer={volunteer}/>)}
    </div>
  );
}

export default App;
