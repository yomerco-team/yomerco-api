import * as Joi from 'joi';

export default Joi.object({
  /* DATABASE INFORMATION */
  DATABASE_CLIENT: Joi.required(),
  DATABASE_HOST: Joi.required(),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USER: Joi.required(),
  DATABASE_PASSWORD: Joi.required(),
  DATABASE_NAME: Joi.required(),
  /* GCP */
  GCP_TYPE: Joi.required(),
  GCP_PROJECT_ID: Joi.required(),
  GCP_PRIVATE_KEY_ID: Joi.required(),
  GCP_PRIVATE_KEY: Joi.required(),
  GCP_CLIENT_EMAIL: Joi.required(),
  GCP_CLIENT_ID: Joi.required(),
  GCP_AUTH_URI: Joi.required(),
  GCP_TOKEN_URI: Joi.required(),
  GCP_AUTH_PROVIDER_X509_CERT_URL: Joi.required(),
  GCP_CLIENT_X509_CERT_URL: Joi.required(),
  GCP_BUCKET_NAME: Joi.required(),
  GCP_BUCKET_BASE_URL: Joi.required(),
  /* CLOUDINARY */
  CLOUDINARY_URL: Joi.required(),
  CLOUDINARY_CLOUD_NAME: Joi.required(),
  CLOUDINARY_API_KEY: Joi.required(),
  CLOUDINARY_API_SECRET: Joi.required(),
  /* BASIC ACL */
  BASIC_ACL_BASE_URL: Joi.required(),
  BASIC_ACL_COMPANY_UUID: Joi.required(),
  BASIC_ACL_ADMIN_EMAIL: Joi.required(),
  BASIC_ACL_ADMIN_PASSWORD: Joi.required(),
  BASIC_ACL_PROJECT_CODE: Joi.required()
});
