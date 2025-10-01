import { registerAs } from '@nestjs/config';

export default registerAs('a', () => ({
  environment: process.env.NODE_ENV || 'production',
}));
