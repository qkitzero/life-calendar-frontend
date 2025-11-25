import createClient from 'openapi-fetch';
import type { paths } from '../../../../gen/event/v1/event.schema';

const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL || 'http://localhost:8083';

export const client = createClient<paths>({
  baseUrl: EVENT_SERVICE_URL,
});
