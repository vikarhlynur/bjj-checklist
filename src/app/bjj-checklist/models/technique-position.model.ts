import { TechniqueDto } from './technique.model';

export type PositionName = 'backControl' | 'fullGuard' | 'halfGuard' | 'insideGuard' | 'mount' | 'sideControl' | 'standing';
export type PositionPlacement = 'top' | 'bottom';

/**
 * Technique Position
 */
export class TechniquePosition {
  name: PositionName;
  caption: string;
  placement: PositionPlacement;
  placementCaption: string;

  constructor(technique: TechniqueDto) {
    this.name = technique.position;
    this.caption = this.captions[this.name];
    this.placement = technique.placement;
    this.placementCaption = this.getPlacementCaption();
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

  private getPlacementCaption(): string {
    if (!this.placement) { return; }
    return this.placement.charAt(0).toUpperCase() + this.placement.substring(1);
  }
}
