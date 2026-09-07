import { defineLive } from "next-sanity/live";
import { client } from "./client";
import { isSanityConfigured } from "./env";

const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token || false,
  browserToken: token || false,
});

export { isSanityConfigured };
