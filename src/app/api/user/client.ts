import createClient from 'openapi-fetch';
import type { paths } from '../../../../gen/user/v1/user.schema';

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:8082';

export const client = createClient<paths>({
  baseUrl: USER_SERVICE_URL,
});
