import type { Response } from "@/generated/graphql";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ResponsesState {
  responses: Response[];
}

const initialState: ResponsesState = {
  responses: [],
};

export const responsesSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {
    setResponses(state, action: PayloadAction<Response[]>) {
      state.responses = action.payload;
    },
    addResponse(state, action: PayloadAction<Response>) {
      state.responses.push(action.payload);
    },
  },
});

export const { setResponses, addResponse } = responsesSlice.actions;
export default responsesSlice.reducer;
