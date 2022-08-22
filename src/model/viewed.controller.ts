import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createPDB, util } from '@sentre/senhub'

import configs from 'configs'

const {
  manifest: { appId },
} = configs

/**
 * Interface & Utility
 */

export type ViewedNftsState = string[]

/**
 * Store constructor
 */

const NAME = 'viewed'
const initialState: ViewedNftsState = []

/**
 * Actions
 */

export const getViewedSymbols = createAsyncThunk(
  `${NAME}/getViewedSymbols`,
  async ({ walletAddress }: { walletAddress: string }) => {
    if (!util.isAddress(walletAddress))
      throw new Error('Invalid wallet address')
    const pdb = createPDB(walletAddress, appId)
    const viewed: string[] = (await pdb.getItem('history')) || []
    return viewed
  },
)

export const addViewedSymbol = createAsyncThunk<
  ViewedNftsState,
  {
    walletAddress: string
    symbol: string
  },
  { state: { viewed: ViewedNftsState } }
>(
  `${NAME}/addViewedSymbol`,
  async ({ walletAddress, symbol }, { getState }) => {
    if (!util.isAddress(walletAddress))
      throw new Error('Invalid wallet address')
    if (!symbol) throw new Error('Invalid symbol')
    const { viewed: prevViewed } = getState()
    const nextViewed = [...prevViewed]
    const index = nextViewed.findIndex((value) => value === symbol)
    if (index >= 0) nextViewed.splice(index, 1)
    nextViewed.unshift(symbol)
    const pdb = createPDB(walletAddress, appId)
    await pdb.setItem('history', nextViewed)
    return [...nextViewed]
  },
)

export const deleteViewedSymbol = createAsyncThunk<
  ViewedNftsState,
  {
    walletAddress: string
    symbol?: string
    all?: boolean
  },
  { state: { viewed: ViewedNftsState } }
>(
  `${NAME}/deleteViewedSymbol`,
  async ({ walletAddress, symbol = '', all = false }, { getState }) => {
    if (!util.isAddress(walletAddress))
      throw new Error('Invalid wallet address')
    const { viewed: prevViewed } = getState()
    const nextViewed = all ? [] : prevViewed.filter((value) => value !== symbol)
    const pdb = createPDB(walletAddress, appId)
    await pdb.setItem('history', nextViewed)
    return [...nextViewed]
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
      .addCase(getViewedSymbols.fulfilled, (state, { payload }) => payload)
      .addCase(addViewedSymbol.fulfilled, (state, { payload }) => payload)
      .addCase(deleteViewedSymbol.fulfilled, (state, { payload }) => payload),
})

export default slice.reducer
