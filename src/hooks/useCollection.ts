import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MagicEdenCollection } from 'sdk/types'
import { AppDispatch, AppState } from 'model'
import { getCollection } from 'model/collections.controller'
import EMPTY_IMAGE from 'static/images/nft-default.svg'

const EMPTY_COLLECTION: MagicEdenCollection = {
  categories: [],
  description: '',
  discord: '',
  image: EMPTY_IMAGE,
  name: '',
  symbol: '',
  twitter: '',
  website: '',
}

export const useCollection = (symbol: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const collection = useSelector((state: AppState) => state.collections[symbol])

  useEffect(() => {
    if (!collection) dispatch(getCollection({ symbol }))
  }, [dispatch, collection, symbol])

  if (!collection) return { loading: true, collection: EMPTY_COLLECTION }
  return { loading: false, collection }
}
