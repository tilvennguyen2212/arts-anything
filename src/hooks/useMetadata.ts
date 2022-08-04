import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { util } from '@sentre/senhub'

import { AppDispatch, AppState } from 'model'
import { getNFTMetadata } from 'model/metadata.controller'

export const useMetadata = ({
  mintAddress,
  force = false,
}: {
  mintAddress: string
  force?: boolean
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    metadata: { [mintAddress]: metadata },
  } = useSelector((state: AppState) => state)

  useEffect(() => {
    if (!metadata && force && util.isAddress(mintAddress))
      dispatch(getNFTMetadata({ mintAddress }))
  }, [dispatch, force, metadata, mintAddress])

  return metadata || {}
}
