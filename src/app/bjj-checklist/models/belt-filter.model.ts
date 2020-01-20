import { Belt } from './technique.model';

export class BeltFilter {
  blue = false;
  purple = false;
  brown = false;

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
