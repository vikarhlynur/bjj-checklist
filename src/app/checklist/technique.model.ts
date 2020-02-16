export interface TechniqueDto {
  id: string;
  belt: BeltName;
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
  id: string;
  belt: TechniqueBelt;
  gi: TechniqueGi;
  caption: string;
  position: TechniquePosition;
  placement: TechniquePlacement;
  video: TechniqueVideo;
  video2: TechniqueVideo;
  status: TechniqueStatus;

  constructor(dto: TechniqueDto) {
    this.id = dto.id;
    this.belt = new TechniqueBelt(dto.belt);
    this.caption = dto.caption;
    this.gi = new TechniqueGi(dto.noGi ? 'noGi' : 'gi');
    this.position = new TechniquePosition(dto.position);
    this.placement = new TechniquePlacement(dto.placement);
    this.video = new TechniqueVideo(dto.video);
    this.video2 = new TechniqueVideo(dto.video2);
    this.status = new TechniqueStatus(this.id);
  }
}

/**
 * Belt
 */
export type BeltName = 'white' | 'blue' | 'purple' | 'brown';

export class TechniqueBelt {
  name: BeltName;
  caption: string;
  index: number;
  isFilter = false;

  constructor(name: BeltName) {
    this.name = name;
    this.caption = this.captions[name];
    this.index = this.indexes[name];
  }

  private captions = {
    white: 'White',
    blue: 'Blue',
    purple: 'Purple',
    brown: 'brown'
  };

  private indexes = {
    white: 0,
    blue: 1,
    purple: 2,
    brown: 3
  };
}

/**
 * Gi
 */
export type GiName = 'gi' | 'noGi';

export class TechniqueGi {
  name: GiName;
  caption: string;
  isFilter = false;

  constructor(name: GiName) {
    this.name = name;
    this.caption = this.captions[name];
  }

  private captions = {
    gi: 'Gi',
    noGi: 'No-gi'
  };
}


/**
 * Position
 */
export type PositionName = 'backControl' | 'turtle' | 'closedGuard' | 'openGuard' | 'halfGuard'
  | 'mount' | 'sideControl' | 'standing';

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
    turtle: 'Turtle',
    closedGuard: 'Closed guard',
    openGuard: 'Open guard',
    halfGuard: 'Half guard',
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
    this.status = (this.status + 1) % 4;
  }
}
