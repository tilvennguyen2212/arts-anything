import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { MagicEdenListingNFT } from 'sdk/magicEdenSDK'
import { magicEdenSDK } from './collections.controller'

/**
 * Interface & Utility
 */

export type ListingNFTs = Record<string, MagicEdenListingNFT>
export type NFTState = Record<string, ListingNFTs>

/**
 * Store constructor
 */

const NAME = 'listing'
const initialState: NFTState = {}

/**
 * Actions
 */

export const nextListingNFTs = createAsyncThunk<
  Partial<NFTState>,
  { symbol: string; limit?: number },
  { state: any }
>(`${NAME}/nextListingNFTs`, async ({ symbol, limit = 12 }, { getState }) => {
  const {
    listing: { [symbol]: prevNFTs },
  } = getState()
  const data = await magicEdenSDK.nextListingNFTs(symbol, limit)
  const nfts: ListingNFTs = {}
  for (const nft of data) nfts[nft.tokenMint] = nft
  return { [symbol]: { ...(prevNFTs || {}), ...nfts } }
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
      nextListingNFTs.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
