import { apiSlice } from "@/services/core/BaseQuery";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Abaikan semua action dengan tipe "api/executeMutation/fulfilled"
        ignoredActions: [
          // Jika nama middleware-mu berbeda, sesuaikan prefix-nya
          "api/executeMutation/pending",
          "api/executeMutation/fulfilled",
          "api/executeMutation/rejected",
          // Jika kamu punya beberapa endpoint mutation lain yg return blob,
          // bisa masukkan juga nama-nama action-nya di sini
        ],
        // (Opsional) Kalau kamu ingin abaikan path tertentu di state:
        ignoredPaths: ["api.mutations.getLaporanCSV"],
      },
    }).concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
