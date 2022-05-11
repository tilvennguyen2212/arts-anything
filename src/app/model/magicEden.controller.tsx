import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import MagicEdenSDK, { MagicEdenCollection } from 'app/sdk/magicEdenSDK'
import { net } from 'shared/runtime'

/**
 * Interface & Utility
 */

export type MagicEdenState = {
  offset: number
  limit: number
  collections: Record<string, MagicEdenCollection>
}

/**
 * Store constructor
 */

const NAME = 'magicEden'
const initialState: MagicEdenState = {
  offset: 0,
  limit: 12,
  collections: {},
}
const magicEdenSDK = new MagicEdenSDK(net)

/**
 * Actions
 */

export const getCollections = createAsyncThunk<
  Partial<MagicEdenState>,
  void,
  { state: any }
>(`${NAME}/getCollections`, async (_, { getState }) => {
  const {
    magicEden: { offset: prevOffset, limit, collections: prevCollections },
  } = getState()
  const collections = await magicEdenSDK.getCollections(prevOffset, limit)
  const nextCollections: Record<string, MagicEdenCollection> = {}
  for (const collection of collections) {
    nextCollections[collection.symbol] = collection
  }
  return {
    offset: prevOffset + collections.length,
    collections: { ...prevCollections, ...nextCollections },
  }
})

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(
      getCollections.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
