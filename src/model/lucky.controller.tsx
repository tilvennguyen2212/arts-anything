import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type LuckyState = {
  announcement: boolean
  congratulation: boolean
}

/**
 * Store constructor
 */

const NAME = 'lucky'
const initialState: LuckyState = { announcement: true, congratulation: false }

/**
 * Actions
 */

export const setAnnouncement = createAsyncThunk(
  `${NAME}/setAnnouncement`,
  async (announcement: boolean) => {
    return { announcement }
  },
)

export const setCongratulation = createAsyncThunk(
  `${NAME}/setCongratulation`,
  async (congratulation: boolean) => {
    return { congratulation }
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
        setAnnouncement.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setCongratulation.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
