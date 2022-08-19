import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { magicEdenSDK } from './collections.controller'

/**
 * Interface & Utility
 */

export type Category = 'recent' | 'hot' | 'viewed'
export type CategoryState = Record<Category, string[]>

/**
 * Store constructor
 */

const NAME = 'category'
const initialState: CategoryState = {
  recent: [],
  hot: [],
  viewed: [],
}

/**
 * Actions
 */

export const pushRecent = createAsyncThunk<
  Partial<CategoryState>,
  string[],
  { state: { category: CategoryState } }
>(`${NAME}/pushRecent`, async (recent, { getState }) => {
  const {
    category: { recent: prevRecent },
  } = getState()
  const newRecent = [...prevRecent]
  for (const symbol of recent)
    if (!newRecent.includes(symbol)) newRecent.push(symbol)
  return { recent: newRecent }
})

export type PopularCollectionsParams = { window: string; limit: number }
export const PopularCollectionsDefault: PopularCollectionsParams = {
  window: '1d',
  limit: 12,
}
export const loadHot = createAsyncThunk<
  Partial<CategoryState>,
  PopularCollectionsParams | undefined,
  { state: { category: CategoryState } }
>(
  `${NAME}/loadHot`,
  async (
    popularCollectionsParams = PopularCollectionsDefault,
    { getState },
  ) => {
    const { window, limit } = {
      ...PopularCollectionsDefault,
      ...popularCollectionsParams,
    }
    const {
      category: { hot: prevHot },
    } = getState()
    const data = await magicEdenSDK.getPopularCollections(window, limit)
    const hot = data.map(({ collectionSymbol }) => collectionSymbol)
    const newHot = [...prevHot]
    for (const symbol of hot) if (!newHot.includes(symbol)) newHot.push(symbol)
    return { hot: newHot }
  },
)

export const setViewed = createAsyncThunk(
  `${NAME}/setViewed`,
  async (viewed: string[]) => {
    return { viewed }
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
        pushRecent.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        loadHot.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setViewed.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
