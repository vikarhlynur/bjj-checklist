import { Position } from './position-filter.model';
import { TechniqueStatus } from './technique-status.model';

export class Technique {
  id: string;
  position: Position;
  name: string;
  noGi: boolean;
  status: TechniqueStatus;
  belt: 'blue' | 'purple' | 'brown';
  videoId: string;
  videoStart: number;

  constructor(technique: Technique) {
    this.id = technique.id;
    this.position = technique.position;
    this.name = technique.name;
    this.noGi = technique.noGi;
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
