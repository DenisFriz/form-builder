import { Field, InputType } from '@nestjs/graphql';
import { QuestionType } from '../models/form.model';

@InputType()
export class QuestionInput {
  @Field()
  text: string;

  @Field(() => QuestionType)
  type: QuestionType;

  @Field(() => [String], { nullable: true })
  options?: string[];
}

@InputType()
export class CreateFormInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [QuestionInput], { nullable: true })
  questions: QuestionInput[];
}
