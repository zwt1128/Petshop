export function usePetcat() {
  const petcat = useState('petcat', () => [])
  return {
    petcat
  }
}
