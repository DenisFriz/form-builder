import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Form, Question } from "@/generated/graphql";
import { QuestionType } from "@/generated/graphql";

export interface FormState {
  currentForm: Form;
}

const initialState: FormState = {
  currentForm: {
    id: "",
    title: "",
    description: "",
    questions: [],
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setTitle(state: FormState, action: PayloadAction<string>) {
      state.currentForm.title = action.payload;
    },
    setDescription(state: FormState, action: PayloadAction<string>) {
      state.currentForm.description = action.payload;
    },
    addQuestion(state: FormState) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        text: "",
        type: QuestionType.Text,
        options: [],
      };
      state.currentForm.questions.push(newQuestion);
    },
    removeQuestion(state: FormState, action: PayloadAction<number>) {
      state.currentForm.questions.splice(action.payload, 1);
    },
    updateQuestion<K extends keyof Question>(
      state: FormState,
      action: PayloadAction<{ index: number; key: K; value: Question[K] }>,
    ) {
      const { index, key, value } = action.payload;
      const q = state.currentForm.questions[index];
      if (q) q[key] = value;
    },
    addOption(state: FormState, action: PayloadAction<number>) {
      const q = state.currentForm.questions[action.payload];
      if (q) {
        if (!q.options) q.options = [];
        q.options.push("");
      }
    },
    removeOption(
      state: FormState,
      action: PayloadAction<{ qIndex: number; optIndex: number }>,
    ) {
      const { qIndex, optIndex } = action.payload;
      const q = state.currentForm.questions[qIndex];
      if (q && q.options) {
        q.options.splice(optIndex, 1);
      }
    },
    resetForm(state: FormState) {
      state.currentForm = { id: "", title: "", description: "", questions: [] };
    },
  },
});

export const {
  setTitle,
  setDescription,
  addQuestion,
  removeQuestion,
  updateQuestion,
  addOption,
  removeOption,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
