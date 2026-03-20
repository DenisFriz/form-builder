import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

type GetFormsData = {
  forms: { id: string; title: string }[];
};

describe('Global GraphQL Rate Limiter (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const GET_FORMS_QUERY = `
    query GetForms {
      forms {
        id
        title
      }
    }
  `;

  const gqlRequest = async <T>(query: string) => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('X-Forwarded-For', '1.1.1.1')
      .send({ query })
      .expect(200);

    return response.body as GraphQLResponse<T>;
  };

  it('should allow requests under the limit', async () => {
    for (let i = 0; i < 5; i++) {
      const body = await gqlRequest<GetFormsData>(GET_FORMS_QUERY);
      expect(body.errors ?? []).toHaveLength(0);
      expect(Array.isArray(body.data?.forms)).toBe(true);
    }
  });

  it('should block requests over the limit', async () => {
    const limit = 10;

    for (let i = 0; i < limit; i++) {
      await gqlRequest<GetFormsData>(GET_FORMS_QUERY);
    }

    const body = await gqlRequest<GetFormsData>(GET_FORMS_QUERY);

    expect(body.data).toBeNull();
    expect(body.errors).toBeDefined();
    expect(body.errors?.[0].message).toMatch(/too many requests/i);
  });
});
