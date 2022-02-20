export function usePetdog() {
  const petdog = useState('petdog', () => [])
  return {
    petdog
  }
}
