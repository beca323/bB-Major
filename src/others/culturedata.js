const url = 'https://beca323.github.io/hi/culture.json'
export const getCultureData = () => fetch(url)
  .then(response => response.json())
  .then(result => {
    return result.reduce((acc, current) => {
      const x = acc.find(item => item.ID === current.ID)
      if (!x) {
        return [...acc, current]
      } else {
        return acc
      }
    }, [])
  })

