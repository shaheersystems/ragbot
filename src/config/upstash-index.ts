import { Index } from "@upstash/vector";

export const index = new Index({
  url: process.env.UPSTASH_ENDPOINT,
  token: process.env.UPSTASH_TOKEN,
});
