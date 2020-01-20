// tslint:disable: no-string-literal
import { Position } from './technique.model';

export const positionHierarchy: Position[] = [
  'Back control (bottom)',
  'Mount (bottom)',
  'Side control (bottom)',
  'Inside guard',
  'Half guard (bottom)',
  'Half guard (top)',
  'Full guard',
  'Side control',
  'Mount',
  'Back control',
  'Standing'
];

export class PositionFilter {
  'Back control' = false;
  'Full guard' = false;
  'Half guard' = false;
  'Inside guard' = false;
  'Mount' = false;
  'Side control' = false;
  'Standing' = false;

  get positions(): Position[] {
    const positions: Position[] = [];
    if (this['Back control']) { positions.push('Back control'); }
    if (this['Full guard']) { positions.push('Full guard'); }
    if (this['Half guard']) { positions.push('Half guard'); }
    if (this['Inside guard']) { positions.push('Inside guard'); }
    if (this['Mount']) { positions.push('Mount'); }
    if (this['Side control']) { positions.push('Side control'); }
    if (this['Standing']) { positions.push('Standing'); }
    return positions;
  }

  constructor() { }

  toggle(position: Position): void {
    if (this[position] !== undefined) {
      this[position] = !this[position];
    } else {
      console.warn(`Position "${position}" does not exist.`);
    }
  }
}
