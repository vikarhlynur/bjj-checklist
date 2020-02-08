import { Belt } from '../../models/technique.model';

export class BeltFilter {
  blue = true;
  purple = true;
  brown = true;

  get belts(): Belt[] {
    const belts: Belt[] = [];
    if (this.blue) { belts.push('blue'); }
    if (this.purple) { belts.push('purple'); }
    if (this.brown) { belts.push('brown'); }
    return belts;
  }

  constructor() { }

  toggle(belt: Belt): void {
    this[belt] = !this[belt];
  }
}
