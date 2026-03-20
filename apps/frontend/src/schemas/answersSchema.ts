import * as yup from "yup";

export const answersSchema = yup.array().of(
  yup.object({
    questionId: yup.string().required(),
    value: yup
      .mixed()
      .test("required-answer", "Answer is required", (value) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== undefined && value !== null && value !== "";
      }),
  }),
);
