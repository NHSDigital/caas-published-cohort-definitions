import pino, { Bindings, BaseLogger } from 'pino';

function createLogger() {
    return pino()
}

export const log = createLogger();
