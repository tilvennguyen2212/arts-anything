import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import MagicEdenSDK, { MagicEdenListingNFT } from 'app/sdk/magicEdenSDK'
import { net } from 'shared/runtime'

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
const magicEdenSDK = new MagicEdenSDK(net)

/**
 * Actions
 */

export const nextListingNFTs = createAsyncThunk(
  `${NAME}/nextListingNFTs`,
  async ({ symbol, limit = 12 }: { symbol: string; limit?: number }) => {
    const data = await magicEdenSDK.nextListingNFTs(symbol, limit)
    const nfts: ListingNFTs = {}
    for (const nft of data) nfts[nft.tokenMint] = nft
    return { [symbol]: nfts }
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
      nextListingNFTs.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
