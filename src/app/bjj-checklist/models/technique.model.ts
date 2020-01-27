import { ReturnStatement } from '@angular/compiler';

export type Belt = 'blue' | 'purple' | 'brown';
export type Gi = 'Gi' | 'No-gi';

export interface TechniqueDto {
  belt: Belt;
  name: string;
  caption: string;
  noGi: boolean;
  position: PositionName;
  placement?: PlacementName;
  status: TechniqueStatus;
  video: [string, number]; // e.g. ['CtcZlbLkedg', 90]
  video2?: [string, number];
}

/**
 * Technique
 */
export class Technique {
  belt: Belt;
  noGi: boolean;
  giCaption: Gi;
  name: string;
  caption: string;
  position: TechniquePosition;
  placement: TechniquePlacement;
  video: TechniqueVideo;
  video2: TechniqueVideo;
  private status: TechniqueStatus;

  constructor(technique: TechniqueDto) {
    this.belt = technique.belt;
    this.caption = technique.caption;
    this.giCaption = technique.noGi ? 'No-gi' : 'Gi';
    this.name = technique.name;
    this.noGi = technique.noGi;
    this.position = new TechniquePosition(technique.position);
    this.placement = new TechniquePlacement(technique.placement);
    this.video = new TechniqueVideo(technique.video);
    this.video2 = new TechniqueVideo(technique.video2);
    this.status = new TechniqueStatus();
    this.status.techniqueId = this.name;
  }

  getStatus(): TechniqueStatus {
    this.status.techniqueId = this.name;
    return this.status;
  }

  setStatus(statuses: TechniqueStatus[]): void {
    const foundStatus = statuses.find(status => status.techniqueId === this.name);
    this.status.set(foundStatus);
  }

  toggleStatus(userId: string): void {
    this.status.toggle(userId);
  }
}

/**
 * Position
 */
export type PositionName = 'backControl' | 'fullGuard' | 'halfGuard' | 'insideGuard' | 'mount' | 'sideControl' | 'standing';

export class TechniquePosition {
  name: PositionName;
  caption: string;
  isFilter = false;

  constructor(name: PositionName) {
    this.name = name;
    this.caption = this.captions[this.name];
  }

  private captions = {
    backControl: 'Back control',
    fullGuard: 'Full guard',
    halfGuard: 'Half guard',
    insideGuard: 'Inside guard',
    mount: 'Mount',
    sideControl: 'Side control',
    standing: 'Standing'
  };
}

/**
 * Placement
 */
export type PlacementName = 'top' | 'bottom';

export class TechniquePlacement {
  name: PlacementName;
  caption: string;
  isFilter = false;

  constructor(placement: PlacementName) {
    this.name = placement;
    this.caption = this.getPlacementCaption();
  }

  private getPlacementCaption(): string {
    if (!this.name) { return; }
    return this.name.charAt(0).toUpperCase() + this.name.substring(1);
  }
}

/**
 * Video
 */
export class TechniqueVideo {
  id: string;
  start: number;
  url: string;

  constructor(video?: [string, number]) {
    if (!video || !video[0] || !Array.isArray(video)) { return; }
    this.id = video[0];
    this.start = video[1] !== undefined ? video[1] : 0;
    this.url = `https://www.youtube.com/embed/${this.id}`;
  }
}

/**
 * Status
 */
export interface TechniqueStatusDto {
  techniqueId: string;
  userId?: string;
  status: number;
}

export class TechniqueStatus {
  techniqueId: string;
  userId?: string;
  status = 0;
  isFilter = false;

  constructor(status?: TechniqueStatusDto) {
    this.set(status);
  }

  set(status: TechniqueStatus | TechniqueStatusDto): void {
    if (!status) { return; }
    if (status.techniqueId) { this.techniqueId = status.techniqueId; }
    if (status.status) { this.status = status.status; }
    if (status.userId) { this.userId = status.userId; }
  }

  toggle(userId: string): void {
    this.userId = userId;
    this.status = (this.status + 1) % 3;
    console.log('this.status: ', this.status);
  }
}
