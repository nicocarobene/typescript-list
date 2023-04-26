export const getUsers = async ({ pageParam = 1 }) => {
  return await fetch(`https://randomuser.me/api?results=10&seed=nicodev&page=${pageParam}`)
    .then(async res => {
      if (!res.ok) throw new Error('Error en la peticion')
      return await res.json()
    })
    .then(json => {
      const number = Number(json.info.page)
      const page = number > 10 ? undefined : number + 1
      return {
        users: json.results,
        nextCursor: page
      }
    })
}
