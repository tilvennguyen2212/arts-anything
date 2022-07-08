import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type Category = 'recent' | 'hot' | 'comming' | 'viewed'
export type CategoryState = Record<Category, string[]>

/**
 * Store constructor
 */

const NAME = 'category'
const initialState: CategoryState = {
  recent: [],
  hot: [],
  comming: [],
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

export const pushHot = createAsyncThunk<
  Partial<CategoryState>,
  string[],
  { state: { category: CategoryState } }
>(`${NAME}/pushHot`, async (hot, { getState }) => {
  const {
    category: { hot: prevHot },
  } = getState()
  const newHot = [...prevHot]
  for (const symbol of hot) if (!newHot.includes(symbol)) newHot.push(symbol)
  return { hot: newHot }
})

export const pushViewed = createAsyncThunk<
  Partial<CategoryState>,
  string[],
  { state: { category: CategoryState } }
>(`${NAME}/pushViewed`, async (viewed, { getState }) => {
  const {
    category: { viewed: prevViewed },
  } = getState()
  const newViewed = [...prevViewed]
  for (const symbol of viewed)
    if (!newViewed.includes(symbol)) newViewed.push(symbol)
  return { viewed: newViewed }
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
        pushRecent.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        pushHot.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        pushViewed.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
