import pino from "pino";

const consoleStream = { stream: process.stdout };

const fileStream = { level: 'warn', path: 'warn.log' };

const errorStream = { level: 'error', path: 'error.log' }

const logger = pino({
    level: 'trace',
    streams: [consoleStream, fileStream, errorStream]
});

export default logger;