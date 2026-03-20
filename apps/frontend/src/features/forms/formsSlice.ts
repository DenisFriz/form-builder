import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Form } from "@/generated/graphql";

interface FormsState {
  forms: Form[];
}

const initialState: FormsState = {
  forms: [],
};

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setForms(state, action: PayloadAction<Form[]>) {
      state.forms = action.payload;
    },
    addForm(state, action: PayloadAction<Form>) {
      state.forms.push(action.payload);
    },
  },
});

export const { setForms, addForm } = formsSlice.actions;
export default formsSlice.reducer;
