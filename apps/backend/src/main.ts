import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT', 3000);

  const corsOrigins = configService.get<string>('CORS_ORIGINS', '').split(',');

  app.enableCors({
    origin: corsOrigins,
    methods: 'POST,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  await app.listen(port);

  console.log(`Allowed origins: ${corsOrigins.join(' ')}`);

  if (configService.get<string>('GRAPHQL_PLAYGROUND') === 'true') {
    console.log(`GraphQL playground: http://localhost:${port}/graphql`);
  }

  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Frontend is running on http://localhost:5173`);
}
bootstrap();
