import { CreateSchemaCustomizationArgs } from 'gatsby';
import { createDataSchema, createPostSchema } from './schema';

export default async function createSchemaCustomization(args: CreateSchemaCustomizationArgs) {
  await createDataSchema(args);
  await createPostSchema(args);
}
