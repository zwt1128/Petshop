export function useCount() {
  const user = useState('user', () => {
    return {}
  })
  const city = useState('city', () => [])
  return {
    user,
    city
  }
}
