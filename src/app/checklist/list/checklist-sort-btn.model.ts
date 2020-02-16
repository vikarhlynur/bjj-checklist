/**
 * Checklist Sort Button (Table Headers).
 */
export class ChecklistSortBtn {
  caption: string;
  path: string;
  isReverse = false;

  /**
   * @param caption Name of header in GUI
   * @param path Path to property to sort by in Technique
   */
  constructor(caption: string, path: string) {
    if (!caption || !path) { return; }
    this.caption = caption;
    this.path = path;
  }
}
