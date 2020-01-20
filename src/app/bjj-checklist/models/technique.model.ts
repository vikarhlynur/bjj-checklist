import { TechniqueStatus } from './technique-status.model';

export type Belt = 'blue' | 'purple' | 'brown';
export type Gi = 'Gi' | 'No-gi';
export type Position =
  'Back control (bottom)' |
  'Back control' |
  'Full guard' |
  'Half guard' | // extra for filter
  'Half guard (bottom)' |
  'Half guard (top)' |
  'Inside guard' |
  'Mount (bottom)' |
  'Mount' |
  'Side control (bottom)' |
  'Side control' |
  'Standing';

export interface TechniqueDto {
  id: string;
  position: Position;
  name: string;
  noGi: boolean;
  status: TechniqueStatus;
  belt: Belt;
  videoId: string;
  videoStart: number;
}

/**
 * Technique
 */
export class Technique {
  id: string;
  position: Position;
  positionRoot: Position; // extra
  name: string;
  gi: Gi;
  status: TechniqueStatus;
  belt: Belt;
  videoId: string;
  videoStart: number;

  constructor(technique: TechniqueDto) {
    this.id = technique.id;
    this.position = technique.position; // e.g. "Mount (bottom)"
    this.positionRoot = technique.position.split(' (')[0] as Position; // e.g. "Mount"
    this.name = technique.name;
    this.gi = technique.noGi ? 'No-gi' : 'Gi';
    this.belt = technique.belt;
    this.videoId = technique.videoId;
    this.videoStart = technique.videoStart !== undefined ? technique.videoStart : 0;
  }

  // setStatus(statuses: TechniqueStatus[]): TechniqueStatus | boolean {
  //   const status = statuses.find(s => s.techniqueId === this.position); // TODO: Find by ID
  //   if (status) {
  //     this.status = status;
  //     return true;
  //   }
  //   return !!status;
  // }
}
