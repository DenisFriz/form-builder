import { api } from "@/store/baseApi";
import {
  CreateFormDocument,
  FormsDocument,
  GetFormByIdDocument,
  GetFormResponsesDocument,
  SubmitResponseDocument,
  type CreateFormMutation,
  type CreateFormMutationVariables,
  type FormsQuery,
  type GetFormByIdQuery,
  type GetFormByIdQueryVariables,
  type GetFormResponsesQuery,
  type GetFormResponsesQueryVariables,
  type SubmitResponseMutation,
  type SubmitResponseMutationVariables,
} from "@/generated/graphql";

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getForms: builder.query<FormsQuery, void>({
      query: () => ({ document: FormsDocument }),
      providesTags: [{ type: "Forms" }],
    }),

    createForm: builder.mutation<
      CreateFormMutation,
      CreateFormMutationVariables
    >({
      query: (variables) => ({ document: CreateFormDocument, variables }),
      invalidatesTags: [{ type: "Forms" }],
    }),

    getFormById: builder.query<GetFormByIdQuery, GetFormByIdQueryVariables>({
      query: (variables) => ({ document: GetFormByIdDocument, variables }),
      providesTags: (result, error, arg) =>
        result ? [{ type: "Forms", id: arg.id }] : [],
    }),

    submitResponse: builder.mutation<
      SubmitResponseMutation,
      SubmitResponseMutationVariables
    >({
      query: (variables) => ({ document: SubmitResponseDocument, variables }),
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: "Responses", id: arg.data.formId }] : [],
    }),

    getFormResponses: builder.query<
      GetFormResponsesQuery,
      GetFormResponsesQueryVariables
    >({
      query: (variables) => ({ document: GetFormResponsesDocument, variables }),
      providesTags: (result, error, arg) =>
        result ? [{ type: "Responses", id: arg.formId }] : [],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useCreateFormMutation,
  useGetFormByIdQuery,
  useSubmitResponseMutation,
  useGetFormResponsesQuery,
} = extendedApi;
