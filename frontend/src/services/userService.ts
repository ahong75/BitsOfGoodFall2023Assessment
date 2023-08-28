import { User } from '../types'
const baseUrl = 'http://localhost:5000/api/bog/users'
async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function createUser(newUser: User): Promise<User> {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      const createdUser = await response.json();
      return createdUser;
    } else {
      throw new Error('Failed to create user');
    }
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id: number): Promise<void> {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error('Failed to delete user')
    }
  } catch(error) {
    throw error;
  }
}

async function updateUser(updatedUser: User): Promise<User> {
  try {
    const response = await fetch(`${baseUrl}/${updatedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser)
    })
    if (response.ok) {
      const updatedUser = await response.json()
      return updatedUser
    } else {
      throw new Error('Failed to update user')
    }
  } catch(error) {
    throw error
  }
}

const userService = { fetchUsers, createUser, deleteUser, updateUser }
export default userService
