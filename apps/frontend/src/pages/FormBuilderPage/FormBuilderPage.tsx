import { useCreateFormMutation } from "@/services/formApi";
import toast from "react-hot-toast";
import * as yup from "yup";
import { formSchema } from "@/schemas/formSchema";
import FormBuilderPageHelmet from "./FormBuilderPageHelmet";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import QuestionItem from "@/components/QuestionItem";
import {
  addQuestion,
  resetForm,
  setDescription,
  setTitle,
} from "@/features/form/formSlice";
import { addForm } from "@/features/forms/formsSlice";

const FormBuilder = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.form?.currentForm);
  const [createForm] = useCreateFormMutation();

  const handleSaveForm = async () => {
    try {
      await formSchema.validate(form, { abortEarly: false });

      const result = await createForm({
        input: {
          title: form.title,
          description: form.description,
          questions: form.questions.map((q) => ({
            text: q.text,
            type: q.type,
            options: q.options?.length ? q.options : undefined,
          })),
        },
      });

      if (result.data?.createForm) {
        dispatch(addForm(result.data.createForm));
      }

      toast.success("Form saved successfully!");
      dispatch(resetForm());
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        err.errors.forEach((e) => toast.error(e));
      } else {
        toast.error("Error occurred while creating form");
        console.error(err);
      }
    }
  };

  return (
    <>
      <FormBuilderPageHelmet />
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow space-y-6">
          <input
            type="text"
            placeholder="Form title"
            className="w-full text-xl sm:text-2xl font-semibold outline-none border-b pb-2"
            value={form.title}
            onChange={(e) => dispatch(setTitle(e.target.value))}
          />
          <textarea
            placeholder="Form description"
            className="w-full text-sm sm:text-base outline-none border-b pb-2 resize-none"
            value={form.description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
          />
          <div className="space-y-4">
            {form.questions.map((q, index) => (
              <QuestionItem key={q.id} question={q} index={index} />
            ))}
          </div>
          <button
            onClick={() => dispatch(addQuestion())}
            className="cursor-pointer w-full py-2 sm:py-3 border-2 border-dashed rounded-lg text-gray-600 hover:bg-gray-50 text-sm sm:text-base"
          >
            + Add Question
          </button>
          <button
            onClick={handleSaveForm}
            className="cursor-pointer w-full py-3 sm:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Save Form
          </button>
        </div>
      </div>
    </>
  );
};

export default FormBuilder;
