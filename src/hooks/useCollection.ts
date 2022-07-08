import { useSelector } from 'react-redux'

import { AppState } from 'model'
import { MagicEdenCollection } from 'sdk/types'
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
  const collections = useSelector((state: AppState) => state.collections)
  const { [symbol]: collection } = collections

  if (!collection) return { loading: true, collection: EMPTY_COLLECTION }
  return { loading: false, collection }
}
