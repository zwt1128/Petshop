export function useGoods() {
    const goods = useState('goods', () => [])
    return {
        goods
    }
  }
  