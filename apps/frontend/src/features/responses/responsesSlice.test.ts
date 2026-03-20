import responsesReducer, { setResponses, addResponse } from "./responsesSlice";
import type { Response } from "@/generated/graphql";

describe("responsesSlice reducer", () => {
  let initialState: { responses: Response[] };

  beforeEach(() => {
    initialState = { responses: [] };
  });

  test("should handle initial state", () => {
    expect(responsesReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
  });

  test("should handle setResponses", () => {
    const mockResponses: Response[] = [
      { id: "r1", formId: "f1", answers: [] },
      { id: "r2", formId: "f2", answers: [] },
    ];
    const state = responsesReducer(initialState, setResponses(mockResponses));
    expect(state.responses.length).toBe(2);
    expect(state.responses[0].id).toBe("r1");
    expect(state.responses[1].id).toBe("r2");
  });

  test("should handle addResponse", () => {
    const newResponse: Response = { id: "r1", formId: "f1", answers: [] };
    const state = responsesReducer(initialState, addResponse(newResponse));
    expect(state.responses.length).toBe(1);
    expect(state.responses[0].id).toBe("r1");
    expect(state.responses[0].formId).toBe("f1");
  });
});
