import { PositionName, PositionPlacement, TechniquePosition } from './technique-position.model';
import { TechniqueStatus } from './technique-status.model';
import { TechniqueVideo } from './technique-video.model';

export type Belt = 'blue' | 'purple' | 'brown';
export type Gi = 'Gi' | 'No-gi';

export interface TechniqueDto {
  belt: Belt;
  name: string;
  caption: string;
  noGi: boolean;
  position: PositionName;
  placement?: PositionPlacement;
  status: TechniqueStatus;
  video: [string, number]; // e.g. ['CtcZlbLkedg', 90]
  video2?: [string, number];
}

/**
 * Technique
 */
export class Technique {
  belt: Belt;
  gi: Gi;
  name: string;
  caption: string;
  position: TechniquePosition;
  status: TechniqueStatus;
  video: TechniqueVideo;
  video2: TechniqueVideo;

  constructor(technique: TechniqueDto) {
    this.position = new TechniquePosition(technique);
    this.name = technique.name;
    this.caption = technique.caption;
    this.gi = technique.noGi ? 'No-gi' : 'Gi';
    this.belt = technique.belt;
    this.video = new TechniqueVideo(technique.video);
    this.video2 = new TechniqueVideo(technique.video2);
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
