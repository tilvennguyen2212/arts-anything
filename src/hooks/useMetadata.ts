import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from 'model'
import { getNFTMetadata } from 'model/metadata.controller'

export const useMetadata = (mintAddress: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const metadata = useSelector((state: AppState) => state.metadata[mintAddress])

  useEffect(() => {
    if (!metadata) dispatch(getNFTMetadata({ mintAddress }))
  }, [dispatch, metadata, mintAddress])

  return metadata || {}
}
