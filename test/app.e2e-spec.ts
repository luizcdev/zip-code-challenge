import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { Mongoose } from 'mongoose';
import { ConfigService } from '@nestjs/config';

describe('App Controller (e2e)', () => {
  let app: INestApplication;
  let redisContainer: StartedTestContainer;
  let mongoContainer: StartedTestContainer;

  beforeAll(async () => {
    redisContainer = await new GenericContainer('redis')
      .withExposedPorts(6379)
      .start();

    mongoContainer = await new GenericContainer('mongo')
      .withEnv('MONGO_INITDB_ROOT_USERNAME', 'test')
      .withEnv('MONGO_INITDB_ROOT_PASSWORD', 'test')
      .withExposedPorts(27017)
      .start();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: jest.fn((key: string) => {
          console.log(key);
          // this is being super extra, in the case that you need multiple keys with the `get` method
          if (key === 'MONGODB_URI') {
            return `mongodb://test:test@${mongoContainer.getHost()}:${mongoContainer.getMappedPort(
              27017,
            )}`;
          }

          if (key === 'REDIS_HOST') {
            console.log(redisContainer.getHost());
            return redisContainer.getHost();
          }

          if (key === 'REDIS_PORT') {
            console.log(redisContainer.getMappedPort(6379));
            return redisContainer.getMappedPort(6379);
          }

          return null;
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    console.log('AAAAA-AAAAA');
    await app.init();
  });

  afterAll(async () => {
    Mongoose.conn
    console.log('BBBBBB-BBBBB');
    console.log('11');
    await app.close();
    console.log('33');
    console.log('77');
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    await redisContainer.stop();
    console.log('44');
    await mongoContainer.stop();
    console.log('55');
  });

  it('/api/addresses/ (GET)', () => {
    console.log('CCCCC-CCCCC');
    return expect('A').toBe('A');
  });
});
