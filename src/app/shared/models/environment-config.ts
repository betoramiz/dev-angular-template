import { z } from "zod";

export const environmentConfigSchema = z.object({
  // apiUrl: z.string().refine(
  //   url => !url.endsWith('/'), {
  //     message: 'API URL must not end with a slash'
  //   }),
  // stripePublishableKey: z.string(),
  // whatsappClientSupportNumber: z.string(),
  // whatsappClientSupportMessage: z.string(),
  // analyticsEnabled: z.string(),
  // gaMeasurementId: z.string()
})

export type EnvironmentConfigType = z.infer<typeof environmentConfigSchema>;
