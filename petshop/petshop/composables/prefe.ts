export function usePrefe() {
    const prefe = useState('prefe', () => [])
    return {
        prefe
    }
  }
  