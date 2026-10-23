import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const contentSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  order: z.number().default(0),
  image: z.string().default(''),
  imageAlt: z.string().default(''),
  draft: z.boolean().default(false),
  columns: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
});

export const collections = {
  articles: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/articles' }), schema: contentSchema }),
  policies: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/policies' }), schema: contentSchema }),
};
