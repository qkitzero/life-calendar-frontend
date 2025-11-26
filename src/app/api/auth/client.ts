import createClient from 'openapi-fetch';
import type { paths } from '../../../../gen/auth/v1/auth.schema';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:8081';

export const client = createClient<paths>({
  baseUrl: AUTH_SERVICE_URL,
});
