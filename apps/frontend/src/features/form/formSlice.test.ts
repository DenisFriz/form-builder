import formReducer, {
  setTitle,
  setDescription,
  addQuestion,
  removeQuestion,
  updateQuestion,
  addOption,
  removeOption,
  resetForm,
  type FormState,
} from "./formSlice";
import { QuestionType } from "@/generated/graphql";

describe("formSlice reducer", () => {
  let initialState: FormState = {
    currentForm: { id: "", title: "", description: "", questions: [] },
  };

  beforeEach(() => {
    initialState = {
      currentForm: { id: "", title: "", description: "", questions: [] },
    };
  });

  test("should handle initial state", () => {
    expect(formReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  test("should handle setTitle", () => {
    const action = setTitle("New Form Title");
    const state = formReducer(initialState, action);
    expect(state.currentForm.title).toBe("New Form Title");
  });

  test("should handle setDescription", () => {
    const action = setDescription("Some description");
    const state = formReducer(initialState, action);
    expect(state.currentForm.description).toBe("Some description");
  });

  test("should handle addQuestion", () => {
    const state = formReducer(initialState, addQuestion());
    expect(state.currentForm.questions.length).toBe(1);
    expect(state.currentForm.questions[0].text).toBe("");
    expect(state.currentForm.questions[0].type).toBe(QuestionType.Text);
  });

  test("should handle removeQuestion", () => {
    const stateWithQuestion = formReducer(initialState, addQuestion());
    const state = formReducer(stateWithQuestion, removeQuestion(0));
    expect(state.currentForm.questions.length).toBe(0);
  });

  test("should handle updateQuestion", () => {
    let state = formReducer(initialState, addQuestion());
    state = formReducer(
      state,
      updateQuestion({ index: 0, key: "text", value: "Updated Question" }),
    );
    expect(state.currentForm.questions[0].text).toBe("Updated Question");
  });

  test("should handle addOption", () => {
    let state = formReducer(initialState, addQuestion());
    state = formReducer(state, addOption(0));
    expect(state.currentForm.questions[0].options?.length).toBe(1);
  });

  test("should handle removeOption", () => {
    let state = formReducer(initialState, addQuestion());
    state = formReducer(state, addOption(0));
    state = formReducer(state, removeOption({ qIndex: 0, optIndex: 0 }));
    expect(state.currentForm.questions[0].options?.length).toBe(0);
  });

  test("should handle resetForm", () => {
    let state = formReducer(initialState, addQuestion());
    state = formReducer(state, setTitle("Test"));
    state = formReducer(state, resetForm());
    expect(state).toEqual(initialState);
  });
});
