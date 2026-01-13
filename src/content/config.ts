import { defineCollection, z } from 'astro:content';

const resourcesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['guides', 'use-cases', 'best-practices', 'faq']),
    publishDate: z.date(),
    author: z.string().default('QR Generator Team'),
    image: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  resources: resourcesCollection,
};
