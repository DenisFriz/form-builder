import { Test, TestingModule } from '@nestjs/testing';
import { FormsService } from './forms.service';
import { CreateFormInput } from './dto/create-form.input';
import { QuestionType } from './models/form.model';

describe('FormsService', () => {
  let service: FormsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormsService],
    }).compile();

    service = module.get<FormsService>(FormsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a form', () => {
    const formData: CreateFormInput = {
      title: 'Test Form',
      description: 'A sample form',
      questions: [{ text: 'What is your name?', type: QuestionType.TEXT }],
    };

    const form = service.createForm(formData);

    expect(form.id).toBeDefined();
    expect(form.title).toBe('Test Form');
    expect(form.questions.length).toBe(1);
    expect(form.questions[0].id).toBeDefined();
  });

  it('should return forms', () => {
    expect(service.getForms()).toHaveLength(0);

    service.createForm({
      title: 'Another Form',
      description: 'Desc',
      questions: [],
    });

    expect(service.getForms()).toHaveLength(1);
  });

  it('should get a form by id', () => {
    const form = service.createForm({
      title: 'My Form',
      description: 'Desc',
      questions: [],
    });

    const found = service.getFormById(form.id);
    expect(found).toEqual(form);
  });

  it('should submit a response', () => {
    const form = service.createForm({
      title: 'Survey',
      description: '',
      questions: [{ text: 'Q1', type: QuestionType.TEXT }],
    });

    const response = service.submitResponse(form.id, [
      { questionId: form.questions[0].id, value: 'Answer' },
    ]);

    expect(response.id).toBeDefined();
    expect(response.formId).toBe(form.id);
    expect(response.answers[0].value).toBe('Answer');
  });

  it('should get responses for a form', () => {
    const form = service.createForm({
      title: 'Survey 2',
      description: '',
      questions: [{ text: 'Q1', type: QuestionType.TEXT }],
    });

    service.submitResponse(form.id, [
      { questionId: form.questions[0].id, value: 'A' },
    ]);
    service.submitResponse(form.id, [
      { questionId: form.questions[0].id, value: 'B' },
    ]);

    const responses = service.getResponses(form.id);
    expect(responses.length).toBe(2);
  });
});
