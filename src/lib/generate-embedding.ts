import { mistralClient } from "@/config/mistral";

export const generateEmbedding = async (input: string) => {
  const embedding = await mistralClient.embeddings.create({
    model: "mistral-embed",
    inputs: input,
  });

  const embeddings = embedding.data.map((item) => item.embedding);

  return embeddings[0] as number[];
};
