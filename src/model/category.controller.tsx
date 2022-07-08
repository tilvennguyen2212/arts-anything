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
        pushHot.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setViewed.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
