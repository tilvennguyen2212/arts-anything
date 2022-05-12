import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import MagicEdenSDK, { MagicEdenCollection } from 'app/sdk/magicEdenSDK'
import { net } from 'shared/runtime'

/**
 * Interface & Utility
 */

export type MagicEdenState = Record<string, MagicEdenCollection>

/**
 * Store constructor
 */

const NAME = 'magicEden'
const initialState: MagicEdenState = {}
const magicEdenSDK = new MagicEdenSDK(net)

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

export const getCollection = createAsyncThunk(
  `${NAME}/getCollection`,
  async (symbol: string) => {
    const data = await magicEdenSDK.getCollection(symbol)
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
