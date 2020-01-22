
export class TechniqueVideo {
  id: string;
  start: number;
  url: string;

  constructor(video?: [string, number]) {
    if (!video || !video[0] || !Array.isArray(video)) { return; }
    this.id = video[0];
    this.start = video[1] !== undefined ? video[1] : 0;
    this.url = `https://www.youtube.com/embed/${this.id}`;
  }
}
