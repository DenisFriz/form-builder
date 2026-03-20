import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FormsService } from './forms.service';
import { Form, Response } from './models/form.model';
import { CreateFormInput } from './dto/create-form.input';
import { SubmitResponseInput } from './dto/submit-response.input';

@Resolver()
export class FormsResolver {
  constructor(private readonly formsService: FormsService) {}

  @Query(() => [Form])
  forms() {
    return this.formsService.getForms();
  }

  @Query(() => Form, { nullable: true })
  form(@Args('id') id: string) {
    return this.formsService.getFormById(id);
  }

  @Query(() => [Response])
  responses(@Args('formId') formId: string) {
    return this.formsService.getResponses(formId);
  }

  @Mutation(() => Form)
  createForm(@Args('data') data: CreateFormInput) {
    return this.formsService.createForm(data);
  }

  @Mutation(() => Response)
  submitResponse(@Args('data') data: SubmitResponseInput) {
    return this.formsService.submitResponse(data.formId, data.answers);
  }
}
