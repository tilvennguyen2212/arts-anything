import { useParams } from 'react-router-dom'

import { usePlatform } from './usePlatform'

export const useCollection = () => {
  const { symbol } = useParams<{ symbol: string }>()
  const { platform } = usePlatform()

  return { platform, symbol }
}
