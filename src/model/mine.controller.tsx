import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { MagicEdenMyNFT } from 'sdk/magicEdenSDK'
import { magicEdenSDK } from './collections.controller'

/**
 * Interface & Utility
 */

export type MyNFTsState = Record<string, MagicEdenMyNFT>

/**
 * Store constructor
 */

const NAME = 'mine'
const initialState: MyNFTsState = {}

/**
 * Actions
 */

export const getMyNFTs = createAsyncThunk<
  Partial<MyNFTsState>,
  string,
  { state: any }
>(`${NAME}/getMyNFTs`, async (walletAddress, { getState }) => {
  const { mine: prevMine } = getState()
  const data = await magicEdenSDK.getMyNFTs(walletAddress)
  const mine: MyNFTsState = {}
  for (const nft of data) mine[nft.mintAddress] = nft
  return { ...(prevMine || {}), ...mine }
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
      getMyNFTs.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
