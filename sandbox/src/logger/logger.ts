import pino from 'pino';

function createLogger() {
    return pino()
}

export const log = createLogger();
