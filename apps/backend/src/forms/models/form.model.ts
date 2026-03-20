import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum QuestionType {
  TEXT = 'TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
}

registerEnumType(QuestionType, { name: 'QuestionType' });

@ObjectType()
export class Question {
  @Field(() => ID, { description: 'The ID of the question' })
  id: string;

  @Field({ description: 'The text of the question' })
  text: string;

  @Field(() => QuestionType, { description: 'The type of the question' })
  type: QuestionType;

  @Field(() => [String], {
    nullable: true,
    description: 'The available options for the question',
  })
  options?: string[];
}

@ObjectType()
export class Form {
  @Field(() => ID, { description: 'The ID of the form' })
  id: string;

  @Field({ description: 'The title of the form' })
  title: string;

  @Field({ description: 'The description of the form' })
  description: string;

  @Field(() => [Question], { description: 'The questions in the form' })
  questions: Question[];
}

@ObjectType()
export class Answer {
  @Field(() => ID, { description: 'The ID of the answer' })
  questionId: string;

  @Field({ description: 'The actual answer' })
  value: string;
}

@ObjectType()
export class Response {
  @Field(() => ID, { description: 'The ID of the response' })
  id: string;

  @Field(() => ID, { description: 'The ID of the form' })
  formId: string;

  @Field(() => [Answer], { description: 'The list of answers' })
  answers: Answer[];
}
