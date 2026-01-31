import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "r1ojrcqs",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
