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
  id: string;
  caption: string;
  position: TechniquePosition;
  placement: TechniquePlacement;
  video: TechniqueVideo;
  video2: TechniqueVideo;
  status: TechniqueStatus;

  constructor(technique: TechniqueDto) {
    this.belt = technique.belt;
    this.caption = technique.caption;
    this.giCaption = technique.noGi ? 'No-gi' : 'Gi';
    this.id = technique.name;
    this.noGi = technique.noGi;
    this.position = new TechniquePosition(technique.position);
    this.placement = new TechniquePlacement(technique.placement);
    this.video = new TechniqueVideo(technique.video);
    this.video2 = new TechniqueVideo(technique.video2);
    this.status = new TechniqueStatus(this.id);
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
    this.url = `https://www.youtube.com/embed/${this.id}?start=${this.start}`;
  }
}

/**
 * Status
 */
export interface TechniqueStatusDto {
  id?: string;
  techniqueId: string;
  userId: string;
  status: number;
}

export class TechniqueStatus {
  id?: string;
  techniqueId: string;
  status = 0;
  userId?: string;

  isFilter = false;

  constructor(techniqueId: string) {
    this.techniqueId = techniqueId;
  }

  updateFormDto(dto: TechniqueStatusDto): void {
    if (!dto || !dto.id || dto.techniqueId !== this.techniqueId) { return; }
    this.id = dto.id;
    this.status = dto.status;
    this.userId = dto.userId;
  }

  toDto(): TechniqueStatusDto {
    return {
      techniqueId: this.techniqueId,
      userId: this.userId,
      status: this.status
    };
  }

  toggle(): void {
    this.status = (this.status + 1) % 3;
  }
}
