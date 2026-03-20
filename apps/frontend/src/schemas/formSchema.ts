import * as yup from "yup";
import { QuestionType } from "@/generated/graphql";

export const formSchema = yup.object().shape({
  title: yup.string().trim().required("Title is required"),
  description: yup.string().trim().required("Description is required"),
  questions: yup
    .array()
    .of(
      yup.object().shape({
        text: yup.string().trim().required("Question text is required"),
        type: yup
          .mixed<QuestionType>()
          .oneOf(Object.values(QuestionType))
          .required(),
        options: yup
          .array()
          .of(yup.string().trim())
          .test(
            "options-required",
            "At least two options are required for multiple choice or checkbox",
            function (value) {
              const { type } = this.parent;
              if (
                type === QuestionType.MultipleChoice ||
                type === QuestionType.Checkbox
              ) {
                if (!value || value.length < 2) {
                  return false;
                }
              }
              return true;
            },
          )
          .nullable(),
      }),
    )
    .min(1, "Add at least one question"),
});
