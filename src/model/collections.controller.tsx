import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { rpc } from '@sentre/senhub'

import MagicEdenSDK, { MagicEdenCollection } from 'sdk/magicEdenSDK'

/**
 * Interface & Utility
 */

export type MagicEdenState = Record<string, MagicEdenCollection>

/**
 * Store constructor
 */

const NAME = 'collections'
const initialState: MagicEdenState = {}
export const magicEdenSDK = new MagicEdenSDK(rpc)

/**
 * Actions
 */

export const nextCollections = createAsyncThunk(
  `${NAME}/nextCollections`,
  async (limit: number = 12) => {
    const data = await magicEdenSDK.nextCollections(limit)
    const collections: MagicEdenState = {}
    for (const collection of data) collections[collection.symbol] = collection
    return collections
  },
)

export const getCollection = createAsyncThunk<
  MagicEdenState,
  { symbol: string; force?: boolean },
  { state: { collections: MagicEdenState } }
>(`${NAME}/getCollection`, async ({ symbol, force = false }, { getState }) => {
  const {
    collections: { [symbol]: currentData },
  } = getState()
  if (currentData && !force) return { [symbol]: currentData }
  const data = await magicEdenSDK.getCollection(symbol)
  return { [symbol]: data }
})

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(
        nextCollections.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        getCollection.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
