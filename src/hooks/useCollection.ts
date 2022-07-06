import { useParams } from 'react-router-dom'

export const useCollection = () => {
  const { symbol } = useParams<{ symbol: string }>()

  return { symbol }
}
