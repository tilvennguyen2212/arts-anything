import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MagicEdenPopularCollection } from 'sdk/types'
import { magicEdenSDK } from './collections.controller'

/**
 * Interface & Utility
 */

export type PopularCollectionsState = Record<string, MagicEdenPopularCollection>

/**
 * Store constructor
 */

const NAME = 'popularCollection'
const initialState: PopularCollectionsState = {}

/**
 * Actions
 */

export type PopularCollectionsParams = { window: string; limit: number }
export const PopularCollectionsDefault: PopularCollectionsParams = {
  window: '30d',
  limit: 6,
}
export const getPopularCollections = createAsyncThunk(
  `${NAME}/getPopularCollections`,
  async (
    popularCollectionsParams: PopularCollectionsParams = PopularCollectionsDefault,
  ) => {
    const { window, limit } = {
      ...PopularCollectionsDefault,
      ...popularCollectionsParams,
    }
    const data = await magicEdenSDK.getPopularCollections(window, limit)
    const collections: PopularCollectionsState = {}
    for (const collection of data)
      collections[collection.collectionSymbol] = collection
    return collections
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
      getPopularCollections.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
