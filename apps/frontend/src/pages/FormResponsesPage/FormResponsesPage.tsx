import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormResponsesPageHelmet from "./FormResponsesPageHelmet";
import {
  useGetFormResponsesQuery,
  useGetFormByIdQuery,
} from "@/services/formApi";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setResponses } from "@/features/responses/responsesSlice";
import Loader from "@/components/Loader";

const FormResponses: React.FC = () => {
  const { id: formId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const responses = useAppSelector((state) => state.responses.responses);
  useEffect(() => {
    if (!formId) {
      navigate("/", { replace: true });
    }
  }, [formId, navigate]);

  const {
    data: responsesData,
    isLoading: responsesLoading,
    isError: responsesError,
  } = useGetFormResponsesQuery({ formId: formId! }, { skip: !formId });

  const {
    data: formData,
    isLoading: formLoading,
    isError: formError,
  } = useGetFormByIdQuery({ id: formId! }, { skip: !formId });

  useEffect(() => {
    if (responsesData?.responses) {
      dispatch(setResponses(responsesData.responses));
    }
  }, [responsesData, dispatch]);

  const questionMap = useMemo(() => {
    const questions = formData?.form?.questions || [];
    return Object.fromEntries(questions.map((q: any) => [q.id, q.text]));
  }, [formData]);

  if (!formId) return null;

  if (responsesLoading || formLoading) {
    return (
      <div className="p-6">
        <Loader />
      </div>
    );
  }

  if (responsesError || formError) {
    return (
      <p className="text-red-500 p-6">Failed to load form or responses.</p>
    );
  }

  return (
    <>
      <FormResponsesPageHelmet />

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">
              {formData?.form?.title || "Form Responses"}
            </h1>

            {formData?.form?.description && (
              <p className="text-gray-600">{formData.form.description}</p>
            )}
          </div>

          {responses.length === 0 ? (
            <p className="text-gray-500">No responses submitted yet.</p>
          ) : (
            <div className="space-y-6">
              {responses.map((response, index) => (
                <div
                  key={response.id}
                  className="border rounded-xl p-5 shadow-sm bg-white space-y-4"
                >
                  <h2 className="text-lg font-semibold text-blue-600">
                    Response #{index + 1}
                  </h2>

                  <div className="space-y-3">
                    {response.answers.map((answer) => (
                      <div
                        key={answer.questionId}
                        className="flex flex-col gap-1 border-b pb-2 last:border-none"
                      >
                        <span className="text-sm text-gray-500">
                          {questionMap[answer.questionId] || "Unknown question"}
                        </span>

                        <span className="text-gray-900 font-medium">
                          {answer.value || "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FormResponses;
