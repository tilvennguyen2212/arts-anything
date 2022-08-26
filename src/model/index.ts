import { configureStore } from '@reduxjs/toolkit'
import { devTools, bigintSerializationMiddleware } from 'model/devTools'

import collections from 'model/collections.controller'
import stat from 'model/stat.controller'
import popularCollections from 'model/popularCollections.controller'
import category from 'model/category.controller'
import mine from 'model/mine.controller'
import viewed from 'model/viewed.controller'
import listing from 'model/listing.controller'
import metadata from 'model/metadata.controller'

/**
 * Isolated store
 */
const model = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(bigintSerializationMiddleware),
  devTools: devTools(process.env.REACT_APP_ID as string),
  reducer: {
    collections,
    stat,
    popularCollections,
    category,
    mine,
    viewed,
    listing,
    metadata,
  },
})

export type AppState = ReturnType<typeof model.getState>
export type AppDispatch = typeof model.dispatch
export default model
