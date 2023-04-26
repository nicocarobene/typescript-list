import { useInfiniteQuery } from '@tanstack/react-query'
import { getUsers } from '../services/getUsers'
import { type User } from '../types'

export const usenUser = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{ users: User[], nextCursor?: number }>(
    ['users'], // -->esto es una key para identific query porque las cachea para recupararlas en cualquier sitio
    getUsers, // --> indicamos como obtener la info
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5 // indica si los datso son recientes, indicamos 5 minutos
    }
  )

  const users: User[] = data?.pages?.flatMap(page => page.users) ?? []

  return { isLoading, isError, refetch, fetchNextPage, hasNextPage, users }
}
