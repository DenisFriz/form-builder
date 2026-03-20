import { gql } from "graphql-tag";

export const FormDocument = gql`
  query Form($id: String!) {
    form(id: $id) {
      id
      title
      description
      questions {
        id
        type
        text
        options
      }
    }
  }
`;

export const FormsDocument = gql`
  query Forms {
    forms {
      id
      title
      description
      questions {
        id
        text
        type
        options
      }
    }
  }
`;

export const CreateFormDocument = gql`
  mutation CreateForm($input: CreateFormInput!) {
    createForm(data: $input) {
      id
      title
      description
      questions {
        id
        text
        type
        options
      }
    }
  }
`;

export const GetFormByIdDocument = gql`
  query GetFormById($id: String!) {
    form(id: $id) {
      id
      title
      description
      questions {
        id
        text
        type
        options
      }
    }
  }
`;

export const SubmitResponseDocument = gql`
  mutation SubmitResponse($data: SubmitResponseInput!) {
    submitResponse(data: $data) {
      id
      formId
      answers {
        questionId
        value
      }
    }
  }
`;

export const GetFormResponsesDocument = gql`
  query GetFormResponses($formId: String!) {
    responses(formId: $formId) {
      id
      formId
      answers {
        questionId
        value
      }
    }
  }
`;
