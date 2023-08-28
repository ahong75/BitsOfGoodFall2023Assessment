import { useState } from 'react';
import { User, UserFormDisplayMode } from '../types';

type Props = {
  handleSubmit: (formData: User) => void
  initialFormState: User
  setUserFormDisplayMode: (mode: UserFormDisplayMode) => void
}

function UserForm({ handleSubmit, initialFormState, setUserFormDisplayMode }: Props) {
  const [formData, setFormData] = useState(initialFormState)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(formData)
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-10/12 md:w-1/2 lg:w-1/3 relative">
        <button onClick={() => setUserFormDisplayMode('notDisplaying')} className="absolute top-4 right-4 text-lg">×</button>

        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="block w-full p-2 my-2 border rounded"
          />
          <input
            type="url"
            placeholder="Profile Picture Link"
            value={formData.avatar}
            onChange={e => setFormData({ ...formData, avatar: e.target.value })}
            className="block w-full p-2 my-2 border rounded"
          />
          <input
            type="text"
            placeholder="Hero Project"
            value={formData.hero_project}
            onChange={e => setFormData({ ...formData, hero_project: e.target.value })}
            className="block w-full p-2 my-2 border rounded"
          />
          <input
            type="text"
            placeholder="Notes"
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            className="block w-full p-2 my-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="block w-full p-2 my-2 border rounded"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="block w-full p-2 my-2 border rounded"
          />
          <input
            type="number"
            placeholder="Rating"
            value={formData.rating === 0 ? "" : formData.rating}
            onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
            min="1"
            max="10"
            className="block w-full p-2 my-2 border rounded"
          />
          <label className="flex items-center mt-4">
            <input
              type="checkbox"
              placeholder="Active"
              checked={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.checked })}
              className="mr-2"
            />
            Active
          </label>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </form>
      </div>
    </div>
  );
}

export default UserForm

