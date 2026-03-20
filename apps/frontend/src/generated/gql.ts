/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query Form($id: String!) {\n    form(id: $id) {\n      id\n      title\n      description\n      questions {\n        id\n        type\n        text\n        options\n      }\n    }\n  }\n": typeof types.FormDocument,
    "\n  query Forms {\n    forms {\n      id\n      title\n      description\n      questions {\n        id\n        text\n        type\n        options\n      }\n    }\n  }\n": typeof types.FormsDocument,
    "\n  mutation CreateForm($input: CreateFormInput!) {\n    createForm(data: $input) {\n      id\n      title\n      description\n      questions {\n        id\n        text\n        type\n        options\n      }\n    }\n  }\n": typeof types.CreateFormDocument,
    "\n  query GetFormById($id: String!) {\n    form(id: $id) {\n      id\n      title\n      description\n      questions {\n        id\n        text\n        type\n        options\n      }\n    }\n  }\n": typeof types.GetFormByIdDocument,
    "\n  mutation SubmitResponse($data: SubmitResponseInput!) {\n    submitResponse(data: $data) {\n      id\n      formId\n      answers {\n        questionId\n        value\n      }\n    }\n  }\n": typeof types.SubmitResponseDocument,
    "\n  query GetFormResponses($formId: String!) {\n    responses(formId: $formId) {\n      id\n      formId\n      answers {\n        questionId\n        value\n      }\n    }\n  }\n": typeof types.GetFormResponsesDocument,
};
const documents: Documents = {
    "\n  query Form($id: String!) {\n    form(id: $id) {\n      id\n      title\n      description\n      questions {\n        id\n        type\n        text\n        options\n      }\n    }\n  }\n": types.FormDocument,
    "\n  query Forms {\n    forms {\n      id\n      title\n      description\n      questions {\n        id\n        text\n        type\n        options\n      }\n    }\n  }\n": types.FormsDocument,
    "\n  mutation CreateForm($input: CreateFormInput!) {\n    createForm(data: $input) {\n      id\n      title\n      description\n      questions {\n        id\n        text\n        type\n        options\n      }\n    }\n  }\n": types.CreateFormDocument,
    "\n  query GetFormById($id: String!) {\n    form(id: $id) {\n      id\n      title\n      description\n      questions {\n        id\n        text\n        type\n        options\n      }\n    }\n  }\n": types.GetFormByIdDocument,
    "\n  mutation SubmitResponse($data: SubmitResponseInput!) {\n    submitResponse(data: $data) {\n      id\n      formId\n      answers {\n        questionId\n        value\n      }\n    }\n  }\n": types.SubmitResponseDocument,
    "\n  query GetFormResponses($formId: String!) {\n    responses(formId: $formId) {\n      id\n      formId\n      answers {\n        questionId\n        value\n      }\n    }\n  }\n": types.GetFormResponsesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Form($id: String!) {\n    form(id: $id) {\n      id\n      title\n      description\n      questions {\n        id\n        type\n        text\n        options\n      }\n    }\n  }\n"): (typeof documents)["\n  query Form($id: String!) {\n    form(id: $id) {\n      id\n      title\n      description\n      questions {\n        id\n        type\n        text\n        options\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Forms {\n    forms {\n      id\n      title\n      description\n      questions {\n        id\n        text\n        type\n        options\n      }\n    }\n  }\n"): (typeof documents)["\n  query Forms {\n    forms {\n      id\n      title\n      description\n      questions {\n        id\n        text\n        type\n        options\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateForm($input: CreateFormInput!) {\n    createForm(data: $input) {\n      id\n      title\n      description\n      questions {\n        id\n        text\n        type\n        options\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateForm($input: CreateFormInput!) {\n    createForm(data: $input) {\n      id\n      title\n      description\n      questions {\n        id\n        text\n        type\n        options\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFormById($id: String!) {\n    form(id: $id) {\n      id\n      title\n      description\n      questions {\n        id\n        text\n        type\n        options\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFormById($id: String!) {\n    form(id: $id) {\n      id\n      title\n      description\n      questions {\n        id\n        text\n        type\n        options\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SubmitResponse($data: SubmitResponseInput!) {\n    submitResponse(data: $data) {\n      id\n      formId\n      answers {\n        questionId\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SubmitResponse($data: SubmitResponseInput!) {\n    submitResponse(data: $data) {\n      id\n      formId\n      answers {\n        questionId\n        value\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFormResponses($formId: String!) {\n    responses(formId: $formId) {\n      id\n      formId\n      answers {\n        questionId\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFormResponses($formId: String!) {\n    responses(formId: $formId) {\n      id\n      formId\n      answers {\n        questionId\n        value\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;