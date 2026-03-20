import { configureStore } from "@reduxjs/toolkit";
import formReducer from "@/features/form/formSlice";
import formsReducer from "@/features/forms/formsSlice";
import responsesReducer from "@/features/responses/responsesSlice";
import { api } from "./baseApi";

export const store = configureStore({
  reducer: {
    form: formReducer,
    forms: formsReducer,
    responses: responsesReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
