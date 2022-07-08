import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from 'model'
import { MagicEdenCollection } from 'sdk/types'
import EMPTY_IMAGE from 'static/images/nft-default.svg'
import { useEffect } from 'react'
import { getCollection } from 'model/collections.controller'

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

export const useCollection = ({
  symbol,
  force = false,
}: {
  symbol: string
  force?: boolean
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const collections = useSelector((state: AppState) => state.collections)
  const { [symbol]: collection } = collections

  useEffect(() => {
    if (!collection && symbol && force) dispatch(getCollection(symbol))
  }, [dispatch, collection, symbol, force])

  if (!collection) return { loading: true, collection: EMPTY_COLLECTION }
  return { loading: false, collection }
}
