import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { QuestionType } from "@/generated/graphql";
import { skipToken } from "@reduxjs/toolkit/query/react";
import FormFillerPageHelmet from "./FormFillerPageHelmet";
import {
  useGetFormByIdQuery,
  useSubmitResponseMutation,
} from "@/services/formApi";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import Loader from "@/components/Loader";
import { addResponse } from "@/features/responses/responsesSlice";
import { answersSchema } from "@/schemas/answersSchema";

interface LocalAnswer {
  questionId: string;
  value: string | string[];
}

export default function FormFiller() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) =>
    state.forms.forms.find((f) => f.id === id),
  );

  const { data, isLoading, error } = useGetFormByIdQuery(
    form ? skipToken : { id: id! },
  );

  const [submitResponse] = useSubmitResponseMutation();

  const [answers, setAnswers] = useState<LocalAnswer[]>([]);

  const currentForm = form || data?.form;

  useEffect(() => {
    if (!currentForm?.questions || answers.length > 0) return;

    setAnswers(
      currentForm.questions.map((q) => ({
        questionId: q.id,
        value: q.type === QuestionType.Checkbox ? ([] as string[]) : "",
      })),
    );
  }, [currentForm]);

  const handleChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) =>
      prev.map((a) => (a.questionId === questionId ? { ...a, value } : a)),
    );
  };

  const handleCheckboxChange = (questionId: string, option: string) => {
    setAnswers((prev) =>
      prev.map((a) => {
        if (a.questionId !== questionId) return a;
        const current = Array.isArray(a.value) ? [...a.value] : [];
        if (current.includes(option)) {
          return { ...a, value: current.filter((o) => o !== option) };
        } else {
          return { ...a, value: [...current, option] };
        }
      }),
    );
  };

  const handleSubmit = async () => {
    try {
      await answersSchema.validate(answers, { abortEarly: false });

      const response = await submitResponse({
        data: {
          formId: id!,
          answers: answers.map((a) => ({
            questionId: a.questionId,
            value: Array.isArray(a.value) ? a.value.join(", ") : a.value,
          })),
        },
      }).unwrap();

      dispatch(addResponse(response.submitResponse));

      setAnswers([]);

      toast.success("Form submitted successfully!");
    } catch (err: any) {
      if (err.name === "ValidationError") {
        toast.error("Please answer all questions");
      } else {
        console.error(err);
        toast.error("Error occurred while submitting the form");
      }
    }
  };

  if (isLoading)
    return (
      <div className="p-6">
        <Loader />
      </div>
    );

  if (error || !currentForm) {
    return <div className="p-6 text-red-600">Form not found</div>;
  }

  return (
    <>
      <FormFillerPageHelmet />
      <div className="min-h-screen bg-gray-100 p-6">
        <Toaster position="top-right" />
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
          <h1 className="text-3xl font-bold">{currentForm.title}</h1>
          <p className="text-gray-600">{currentForm.description}</p>
          <div className="space-y-4">
            {currentForm.questions.map((q) => (
              <div key={q.id} className="border p-4 rounded-lg space-y-2">
                <label className="font-medium">{q.text}</label>
                {q.type === QuestionType.Text && (
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={
                      (answers.find((a) => a.questionId === q.id)
                        ?.value as string) || ""
                    }
                    onChange={(e) => handleChange(q.id, e.target.value)}
                  />
                )}
                {q.type === QuestionType.MultipleChoice && (
                  <div className="flex flex-col space-y-1">
                    {q.options?.map((opt) => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={q.id}
                          value={opt}
                          checked={
                            answers.find((a) => a.questionId === q.id)
                              ?.value === opt
                          }
                          onChange={(e) => handleChange(q.id, e.target.value)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
                {q.type === QuestionType.Checkbox && (
                  <div className="flex flex-col space-y-1">
                    {q.options?.map((opt) => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={
                            (
                              answers.find((a) => a.questionId === q.id)
                                ?.value as string[] | undefined
                            )?.includes(opt) || false
                          }
                          onChange={() => handleCheckboxChange(q.id, opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
                {q.type === QuestionType.Date && (
                  <div className="flex flex-col space-y-1">
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full border rounded-lg px-3 py-2 pr-10 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 transition"
                        value={
                          (answers.find((a) => a.questionId === q.id)
                            ?.value as string) || ""
                        }
                        onChange={(e) => handleChange(q.id, e.target.value)}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        📅
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">Select a date</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="cursor-pointer w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
