import formReducer, { setForms, addForm } from "./formsSlice";
import type { Form } from "@/generated/graphql";

describe("formsSlice reducer", () => {
  let initialState: { forms: Form[] };

  beforeEach(() => {
    initialState = { forms: [] };
  });

  test("should handle initial state", () => {
    expect(formReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  test("should handle setForms", () => {
    const mockForms: Form[] = [
      { id: "1", title: "Form 1", description: "Desc 1", questions: [] },
      { id: "2", title: "Form 2", description: "Desc 2", questions: [] },
    ];
    const state = formReducer(initialState, setForms(mockForms));
    expect(state.forms.length).toBe(2);
    expect(state.forms[0].title).toBe("Form 1");
    expect(state.forms[1].title).toBe("Form 2");
  });

  test("should handle addForm", () => {
    const newForm: Form = {
      id: "1",
      title: "New Form",
      description: "Desc",
      questions: [],
    };
    const state = formReducer(initialState, addForm(newForm));
    expect(state.forms.length).toBe(1);
    expect(state.forms[0].id).toBe("1");
    expect(state.forms[0].title).toBe("New Form");
  });
});
