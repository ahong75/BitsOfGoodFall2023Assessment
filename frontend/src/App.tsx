import './App.css';
import { useState, useEffect } from 'react'
import { TableEntry, AddVolunteer} from './components'
import { Volunteer } from './types'

function App() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/bog/users')
      .then(response => response.json())
      .then(initialVolunteers => {
        setVolunteers(initialVolunteers)
      })
      .catch(error => {
        console.error('Error fetching data', error)
      })
  }, [])
  
  return (
    <div className="container mx-auto mt-8">
      <AddVolunteer volunteers={volunteers} setVolunteers={setVolunteers} />
      {volunteers.length > 0 ? (
        <table className="min-w-full">
          <thead>
            <tr>
              {Object.keys(volunteers[0]).map(propertyName => (
                <th key={propertyName} className="px-4 py-2">
                  {propertyName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {volunteers.map(volunteer => (
              <TableEntry key={volunteer.id} volunteer={volunteer} />
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

