import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { NFTPlatform, PLATFORM_LOGOS, PLATFORM_NAMES } from 'sdk'

export const usePlatform = () => {
  const { platform } = useParams<{ platform: NFTPlatform }>()
  const name = useMemo(() => PLATFORM_NAMES[platform], [platform])
  const logo = useMemo(() => PLATFORM_LOGOS[platform], [platform])

  return { platform, name, logo }
}
