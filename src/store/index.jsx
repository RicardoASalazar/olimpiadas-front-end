import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoading.Slice'

export default configureStore({
    reducer: {
        isLoading:isLoadingSlice,
    }
})
