import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { MagicEdenCollectionStat } from 'sdk/magicEdenSDK'
import { magicEdenSDK } from './collections.controller'

/**
 * Interface & Utility
 */

export type StatState = Record<string, MagicEdenCollectionStat>

/**
 * Store constructor
 */

const NAME = 'stat'
const initialState: StatState = {}

/**
 * Actions
 */

export const getCollectionStat = createAsyncThunk<
  StatState,
  { symbol: string; force?: boolean },
  { state: { stat: StatState } }
>(
  `${NAME}/getCollectionStat`,
  async ({ symbol, force = false }, { getState }) => {
    const {
      stat: { [symbol]: currentData },
    } = getState()
    if (currentData && !force) return { [symbol]: currentData }
    const data = await magicEdenSDK.getCollectionStat(symbol)
    return { [symbol]: data }
  },
)

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(
      getCollectionStat.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
