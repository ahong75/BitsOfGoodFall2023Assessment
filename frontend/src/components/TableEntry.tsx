import { Volunteer } from '../types'
function TableEntry({ volunteer } : { volunteer: Volunteer }) {
  return (
    <tr>
      <td className="font-bold px-4 py-2">{volunteer.name}</td>
      <td className="px-4 py-2">
        <img src={volunteer.avatar} alt={`Face of ${volunteer.name}`}/>
      </td>
      <td className="px-4 py-2">{volunteer.hero_project}</td>
      <td className="px-4 py-2">{volunteer.notes}</td>
      <td className="px-4 py-2">{volunteer.email}</td>
      <td className="px-4 py-2">{volunteer.phone}</td>
      <td className="px-4 py-2">{volunteer.rating}</td>
      <td className="px-4 py-2">
        {volunteer.status ? (
          <span className="bg-green-500 text-white px-2 py-1 rounded-full">
            Active
          </span>
        ) : (
          <span className="bg-red-500 text-white px-2 py-1 rounded-full">
            Inactive
          </span>
        )}
      </td>
    </tr>
  )
}

export default TableEntry
