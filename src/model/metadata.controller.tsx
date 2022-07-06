import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { MagicEdenNFTMetadata } from 'sdk/magicEdenSDK'
import { magicEdenSDK } from './collections.controller'

/**
 * Interface & Utility
 */

export type MetadataState = Record<string, MagicEdenNFTMetadata>

/**
 * Store constructor
 */

const NAME = 'metadata'
const initialState: MetadataState = {}

/**
 * Actions
 */

export const getNFTMetadata = createAsyncThunk<
  Partial<MetadataState>,
  { mintAddress: string; force?: boolean },
  { state: any }
>(
  `${NAME}/getNFTMetadata`,
  async ({ mintAddress, force = false }, { getState }) => {
    const {
      metadata: { [mintAddress]: currentData },
    } = getState()
    if (currentData && !force) return { [mintAddress]: currentData }
    const data = await magicEdenSDK.getNFTMetadata(mintAddress)
    return { [mintAddress]: data }
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
      getNFTMetadata.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
