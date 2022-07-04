import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Connection, AccountInfo, PublicKey } from '@solana/web3.js'

import configs from 'configs'

const {
  sol: { node, metaplexAddress },
} = configs

/**
 * Interface & Utility
 */

export type State = {}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: State = {}

/**
 * Actions
 */

export const getAccounts = createAsyncThunk(`${NAME}/getAccounts`, async () => {
  const connection = new Connection(node)
  const programId = new PublicKey(metaplexAddress)
  const value: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
    await connection.getProgramAccounts(programId, {
      filters: [
        { dataSize: 679 },
        {
          memcmp: {
            offset: 0,
            bytes: metaplexAddress,
          },
        },
      ],
    })
  // let bulk: any = {}
  // value.forEach(({ pubkey, account: { data: buf } }) => {
  //   const address = pubkey.toBase58()
  //   const data = interDao.parseDaoData(buf)
  //   bulk[address] = { ...data }
  // })
  console.log(value)
  return {}
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
      getAccounts.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
