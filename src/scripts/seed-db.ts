import "dotenv/config";
import sampleData from "@/data/sample-data.json";
import { splitter } from "@/config/splitter";
import { generateEmbedding } from "@/lib/generate-embedding";
import { index } from "@/config/upstash-index";

const loadSampleData = async () => {
  for await (const { url, title, content } of sampleData) {
    const chunks = await splitter.splitText(content);
    let i = 0;

    for await (const chunk of chunks) {
      const embeddings = await generateEmbedding(chunk);
      await index.upsert({
        id: `${url}-${i}`,
        metadata: {
          title: title,
          url: url,
          content: content,
        },
        vector: embeddings,
      });
      i++;
    }
  }
  console.log("Data loaded and populated");
};

const main = async () => {
  await loadSampleData();
};

main().catch(console.error);
