import { Exome } from "exome";

export type Source = {
  title: string;
  url: string;
};
export class SourcesStore extends Exome {
  public sources: Source[] = [];

  public addSources(sources: Source[]) {
    this.sources = sources;
  }
}
