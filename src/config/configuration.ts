import * as Joi from 'joi';

export default () => {
  const conf = {
    port: parseInt(process.env.PORT, 10) || 5432,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      name: process.env.DATABASE_NAME,
      schema: process.env.DATABASE_SCHEMA,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
  };

  const vSchema = Joi.object({
    port: Joi.number().integer().default(3000).required(),
    database: Joi.object({
      // host: Joi.string().pattern(/postgres:\/\/[a-zA-Z]/),
      host: Joi.string(),
      port: Joi.number().integer().default(5432),
      name: Joi.string(),
      schema: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
    }).required(),
  });

  const validate = vSchema.validate(conf);
  if (validate.error) throw validate.error;

  return conf;
};
