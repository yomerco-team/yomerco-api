import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  environment: process.env.NODE_ENV || 'local',
  app: {
    port: parseInt(process.env.PORT, 10) || 8080
  },
  database: {
    client: process.env.DATABASE_CLIENT,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  },
  gcp: {
    type: process.env.GCP_TYPE,
    projectId: process.env.GCP_PROJECT_ID,
    privateKeyId: process.env.GCP_PRIVATE_KEY_ID,
    privateKey: process.env.GCP_PRIVATE_KEY,
    clientEmail: process.env.GCP_CLIENT_EMAIL,
    clientId: process.env.GCP_CLIENT_ID,
    authUri: process.env.GCP_AUTH_URI,
    tokenUri: process.env.GCP_TOKEN_URI,
    authProviderX509CertUrl: process.env.GCP_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.GCP_CLIENT_X509_CERT_URL
  }
}));