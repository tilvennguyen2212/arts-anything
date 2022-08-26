import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MagicEdenCollectionStat } from 'sdk/types'
import { AppDispatch, AppState } from 'model'
import { getCollectionStat } from 'model/stat.controller'

const EMPTY_STAT: MagicEdenCollectionStat = {
  symbol: '',
  floorPrice: 0,
  volumeAll: 0,
  listedCount: 0,
}

export const useStat = (symbol: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const stat = useSelector((state: AppState) => state.stat[symbol])

  useEffect(() => {
    if (!stat) dispatch(getCollectionStat({ symbol }))
  }, [dispatch, stat, symbol])

  if (!stat) return { loading: true, stat: EMPTY_STAT }
  return { loading: false, stat }
}
