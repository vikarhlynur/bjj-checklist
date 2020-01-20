export type BeltColor = 'blue' | 'purple' | 'brown';

export class BeltFilter {
  blue = true;
  purple = true;
  brown = true;

  get belts(): BeltColor[] {
    const belts: BeltColor[] = [];
    if (this.blue) { belts.push('blue'); }
    if (this.purple) { belts.push('purple'); }
    if (this.brown) { belts.push('brown'); }
    return belts;
  }

  constructor() { }

  toggle(belt: BeltColor): void {
    this[belt] = !this[belt];
  }
}
