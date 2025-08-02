import { index } from "../config/upstash-index";
import { generateEmbedding } from "@/lib/generate-embedding";

type Source = {
  title: string;
  url: string;
};

export const getContext = async (
  query: string
): Promise<{ context: string; sources: Source[] }> => {
  const embeddedQuery = await generateEmbedding(query);

  const data = await index.query({
    topK: 1,
    vector: embeddedQuery,
    includeMetadata: true,
  });

  const knowledge = data.map((item) => {
    return {
      title: item.metadata?.title as string,
      content: item.metadata?.content as string,
      url: item.metadata?.url as string,
    };
  });
  let text = "";
  const sources: Source[] = [];
  for (let index = 0; index < knowledge.length; index++) {
    text =
      text +
      `
        TITLE: ${knowledge[index].title} \n
        CONTENT: ${knowledge[index].content}
    ` +
      "\n\n";

    sources.push({
      title: knowledge[index].title,
      url: knowledge[index].url,
    });
  }
  return {
    context: text,
    sources,
  };
};
