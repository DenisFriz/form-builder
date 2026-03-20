import { Injectable } from '@nestjs/common';
import { Answer, Form, Response } from './models/form.model';
import { v4 as uuid } from 'uuid';
import { CreateFormInput } from './dto/create-form.input';

@Injectable()
export class FormsService {
  private forms: Form[] = [];
  private responses: Response[] = [];

  createForm(formData: CreateFormInput): Form {
    const form: Form = {
      id: uuid(),
      title: formData.title,
      description: formData.description,
      questions: formData.questions.map((q) => ({ ...q, id: uuid() })),
    };
    this.forms.push(form);
    return form;
  }

  getForms(): Form[] {
    return this.forms;
  }

  getFormById(id: string): Form | undefined {
    return this.forms.find((f) => f.id === id);
  }

  submitResponse(formId: string, answers: Answer[]): Response {
    const response: Response = {
      id: uuid(),
      formId,
      answers,
    };
    this.responses.push(response);
    return response;
  }

  getResponses(formId: string): Response[] {
    return this.responses.filter((r) => r.formId === formId);
  }
}
