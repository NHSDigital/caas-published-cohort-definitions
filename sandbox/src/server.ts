/* eslint-disable no-console */
import { ApolloServer, ApolloServerPlugin, GraphQLRequestContext } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
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

  async unexpectedErrorProcessingRequest() {
    log.error({
        description: 'Unexpected server error',
        infoCode: 'APIMS500'
    })
  },

  async invalidRequestWasReceived() {
    log.error({
        description: 'Invalid Request',
        infoCode: 'APIMS400'
    })
  },

  async startupDidFail() {
    log.error({
        description: 'Server startup failure',
        infoCode: 'APIMSERR'
    })
  }
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

const port = Number.parseInt(args['--port'] || '9000', 10);

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
    const app = express();
    // const httpServer = http.createServer(app);
    const server = new ApolloServer<MockserverContext>({
        schema: await returnSchema(),

        plugins: [requestLogger, formatResponse/*, ApolloServerPluginDrainHttpServer({httpServer})*/],
    });

  async function start() {
    await server.start()


    app.get('/_ping', (req,res,next) => {
        res.json({
            status: "pass",
            ping: "pong",
            service: req.app.locals.app_name,
            version: req.app.locals.version_info
        })
        res.end();
        next();
    });

    app.get('/_status', (req, res, next) =>{
        res.json({
            status: "pass",
            ping: "pong",
            service: req.app.locals.app_name,
            version: req.app.locals.version_info
        });
        res.end();
        next();
    });

    app.use(
        '/',
        cors<cors.CorsRequest>(),
        bodyParser.json({ limit: '5MB' }),
        expressMiddleware(server, {
            context: async () => ({
                allCohorts: data
            }),
        })
    )

    await new Promise<void>((resolve) => app.listen({ port }, resolve));
    console.log(`Published cohort definitions API sandbox running at ${port}`);
  }

  await start().catch((error) => {
    console.error(`Published cohort definitions API sandbox Error: ${error.message}`);
  });
}

cohortApiMockserver().catch((e) => {
  console.error(
    `Published cohort definitions API sandbox Error - command failed: ${process.argv.join(' ')}`
  );
  console.error(e);
  process.exitCode = 1;
});
