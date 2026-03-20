import React from "react";
import { QuestionType, type Question } from "@/generated/graphql";
import { useAppDispatch } from "@/hooks/hook";
import {
  addOption,
  removeOption,
  removeQuestion,
  updateQuestion,
} from "@/features/form/formSlice";

interface QuestionItemProps {
  question: Question;
  index: number;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, index }) => {
  const dispatch = useAppDispatch();

  const options = question.options ?? [];

  return (
    <div className="border p-3 sm:p-4 rounded-lg space-y-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <input
          type="text"
          placeholder="Question text"
          className="w-full border p-2 rounded text-sm sm:text-base"
          value={question.text}
          onChange={(e) =>
            dispatch(
              updateQuestion({
                index,
                key: "text",
                value: e.target.value,
              }),
            )
          }
        />
        <button
          type="button"
          onClick={() => dispatch(removeQuestion(index))}
          className="text-red-600 hover:text-red-800 font-bold mt-2 sm:mt-0"
        >
          Delete Question
        </button>
      </div>
      <select
        className="w-full border p-2 rounded text-sm sm:text-base"
        value={question.type}
        onChange={(e) =>
          dispatch(
            updateQuestion({
              index,
              key: "type",
              value: e.target.value as QuestionType,
            }),
          )
        }
      >
        {Object.values(QuestionType).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {(question.type === QuestionType.MultipleChoice ||
        question.type === QuestionType.Checkbox) && (
        <div className="space-y-2">
          {options.map((opt, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2"
            >
              <input
                type="text"
                placeholder={`Option ${i + 1}`}
                className="w-full border p-2 rounded text-sm sm:text-base"
                value={opt}
                onChange={(e) =>
                  dispatch(
                    updateQuestion({
                      index,
                      key: "options",
                      value: options.map((o, k) =>
                        k === i ? e.target.value : o,
                      ),
                    }),
                  )
                }
              />
              <button
                type="button"
                onClick={() =>
                  dispatch(removeOption({ qIndex: index, optIndex: i }))
                }
                className="text-red-600 hover:text-red-800 font-bold"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => dispatch(addOption(index))}
            className="text-sm sm:text-base text-blue-600 hover:underline"
          >
            + Add option
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionItem;
