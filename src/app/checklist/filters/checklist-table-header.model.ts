/**
 * Checklist Table Headers.
 */
export class ChecklistTableHeader {
  caption: string;
  path: string;
  isReverse = false;

  /**
   * @param caption Name of table header in GUI
   * @param path Path to property to sort by in Technique
   */
  constructor(caption: string, path: string) {
    if (!caption || !path) { return; }
    this.caption = caption;
    this.path = path;
  }
}
