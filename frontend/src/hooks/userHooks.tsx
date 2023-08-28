import { User } from '../types'
import { useQueryClient, useMutation, useQuery } from 'react-query'
import userService from '../services/userService'

export const useFetchUsersQuery = () => {
  return useQuery<User[], Error>('users', userService.fetchUsers)
}

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(userService.deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })
}

export const useCreateUserMutation = ()=> {
  const queryClient = useQueryClient()
  return useMutation(userService.createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })
}

export const useUpdateUserMutation = ()=> {
  const queryClient = useQueryClient()
  return useMutation(userService.updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })
}
