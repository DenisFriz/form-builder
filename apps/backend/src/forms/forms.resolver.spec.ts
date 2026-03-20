import { Test, TestingModule } from '@nestjs/testing';
import { FormsService } from './forms.service';
import { FormsResolver } from './forms.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { QuestionType } from './models/form.model';
import { ApolloDriver } from '@nestjs/apollo';

describe('FormsResolver (GraphQL)', () => {
  let resolver: FormsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot({
          driver: ApolloDriver,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
      ],
      providers: [FormsResolver, FormsService],
    }).compile();

    resolver = module.get<FormsResolver>(FormsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a form via resolver', async () => {
    const input = {
      title: 'GraphQL Form',
      description: 'Test Desc',
      questions: [{ text: 'Q1', type: QuestionType.TEXT }],
    };

    const form = await resolver.createForm(input);
    expect(form.id).toBeDefined();
    expect(form.questions[0].id).toBeDefined();
    expect(form.title).toBe('GraphQL Form');
  });
});
