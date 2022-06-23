import { configureStore } from '@reduxjs/toolkit'
import { devTools, bigintSerializationMiddleware } from 'app/model/devTools'

import main from 'app/model/main.controller'
import magicEden from 'app/model/magicEden.controller'
import listing from 'app/model/listing.controller'
import metadata from 'app/model/metadata.controller'

/**
 * Isolated store
 */
const model = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(bigintSerializationMiddleware),
  devTools: devTools(process.env.REACT_APP_ID as string),
  reducer: {
    main,
    magicEden,
    listing,
    metadata,
  },
})

export type AppState = ReturnType<typeof model.getState>
export type AppDispatch = typeof model.dispatch
export default model
