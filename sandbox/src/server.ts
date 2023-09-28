/* eslint-disable no-console */
import { ApolloServer, ApolloServerPlugin } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { log } from './logger/logger';
import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import * as Schema from './schema/typeGraphqlSchema';
import {
  CohortResolver,
  MockserverContext,
} from './resolvers';
import data from '../data/cohort.json'

const requestLogger: ApolloServerPlugin<MockserverContext> = {
  async requestDidStart(requestContext) {
    log.debug({
      infoCode: 'MCK001',
      description: `Request started! Query:\n${requestContext.request.query}`,
    });

    return {
      async willSendResponse(requestContext2) {
        log.debug({
          infoCode: 'MCK002',
          description: `Response sent ${JSON.stringify(
            requestContext2.response
          )}`,
        });
      },
    };
  },
};

const formatResponse: ApolloServerPlugin<MockserverContext> = {
  async requestDidStart() {
    return {
      async willSendResponse(requestContext) {
        if (requestContext.response?.http) {
          requestContext.response.http.headers.set(
            'x-api-key',
            'key_undefined'
          );
        }
      },
    };
  },
};

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => arg.split('='))
) as { [index: string]: string | undefined };

const port = Number.parseInt(args['--port'] || '4040', 10);

export async function returnSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    resolvers: [
      CohortResolver,
    ],
    dateScalarMode: 'isoDate', // "timestamp" or "isoDate"
    validate: { forbidUnknownValues: false }, // https://github.com/MichalLytek/type-graphql/issues/1397
    orphanedTypes: [...Schema.orphanedType],
  });

  return schema;
}

async function cohortApiMockserver() {
  const server = new ApolloServer<MockserverContext>({
    schema: await returnSchema(),

    plugins: [requestLogger, formatResponse],
  });

  async function start() {
    const { url } = await startStandaloneServer(server, {
      context: async () => ({
        allCohorts: data
      }),
      listen: { port },
    });
    console.log(`Cohort api mockserver running at ${url}`);
  }

  await start().catch((error) => {
    console.error(`Cohort API Mockserver Error: ${error.message}`);
  });
}

cohortApiMockserver().catch((e) => {
  console.error(
    `Cohort API Mockserver Error - command failed: ${process.argv.join(' ')}`
  );
  console.error(e);
  process.exitCode = 1;
});
