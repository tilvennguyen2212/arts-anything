import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export enum Events {
  None,
  LuckyWheel,
  TradingContest,
}

/**
 * Interface & Utility
 */

export type LuckyState = {
  announcement: Events
  congratulation: Events
}

/**
 * Store constructor
 */

const NAME = 'event'
const initialState: LuckyState = {
  announcement: Events.None,
  congratulation: Events.None,
}

/**
 * Actions
 */

export const setAnnouncement = createAsyncThunk(
  `${NAME}/setAnnouncement`,
  async (announcement: Events) => {
    return { announcement }
  },
)

export const setCongratulation = createAsyncThunk(
  `${NAME}/setCongratulation`,
  async (congratulation: Events) => {
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
