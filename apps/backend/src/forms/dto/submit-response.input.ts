import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class AnswerInput {
  @Field(() => ID)
  questionId: string;

  @Field()
  value: string;
}

@InputType()
export class SubmitResponseInput {
  @Field(() => ID)
  formId: string;

  @Field(() => [AnswerInput])
  answers: AnswerInput[];
}
