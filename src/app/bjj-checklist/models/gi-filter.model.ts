// tslint:disable: no-string-literal
import { Gi } from './technique.model';

export class GiFilter {
  'Gi' = false;
  'No-gi' = false;

  get gis(): Gi[] {
    const gis: Gi[] = [];
    if (this['Gi']) { gis.push('Gi'); }
    if (this['No-gi']) { gis.push('No-gi'); }
    return gis;
  }

  constructor() { }

  toggle(gi: Gi): void {
    this[gi] = !this[gi];
  }
}
