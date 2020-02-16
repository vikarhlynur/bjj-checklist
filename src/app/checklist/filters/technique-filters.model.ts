// tslint:disable-next-line: max-line-length
import { BeltName, GiName, PlacementName, PositionName, TechniqueBelt, TechniqueGi, TechniquePlacement, TechniquePosition } from '../technique.model';

export interface TechniqueFiltersDto {
  id?: string;
  userId?: string;
  caption?: string;
  belt?: BeltName[];
  position?: PositionName[];
  placement?: PlacementName[];
  gi?: GiName[];
}

export class TechniqueFilters {
  id?: string;
  userId?: string;
  caption = '';
  belt = [
    new TechniqueBelt('white'),
    new TechniqueBelt('blue'),
    new TechniqueBelt('purple'),
    new TechniqueBelt('brown')
  ];
  gi = [
    new TechniqueGi('gi'),
    new TechniqueGi('noGi')
  ];
  position = [
    new TechniquePosition('backControl'),
    new TechniquePosition('turtle'),
    new TechniquePosition('closedGuard'),
    new TechniquePosition('openGuard'),
    new TechniquePosition('halfGuard'),
    new TechniquePosition('mount'),
    new TechniquePosition('sideControl'),
    new TechniquePosition('standing')
  ];
  placement = [
    new TechniquePlacement('top'),
    new TechniquePlacement('bottom')
  ];

  constructor() { }

  fromDto(dto: TechniqueFiltersDto) {
    this.id = dto.id;
    this.userId = dto.userId;
    this.caption = dto.caption || '';
    this.belt.forEach(b => { b.isFilter = dto.belt ? dto.belt.includes(b.name) : false; });
    this.gi.forEach(g => { g.isFilter = dto.gi ? dto.gi.includes(g.name) : false; });
    this.position.forEach(p => { p.isFilter = dto.position ? dto.position.includes(p.name) : false; });
    this.placement.forEach(p => { p.isFilter = dto.placement ? dto.placement.includes(p.name) : false; });
  }

  toDto(): TechniqueFiltersDto {
    const dto: TechniqueFiltersDto = {};
    dto.id = this.id;
    dto.userId = this.userId;
    dto.caption = this.caption;
    dto.belt = this.belt.map(b => b.isFilter ? b.name : undefined).filter(bName => bName !== undefined);
    dto.gi = this.gi.map(g => g.isFilter ? g.name : undefined).filter(gName => gName !== undefined);
    dto.position = this.position.map(p => p.isFilter ? p.name : undefined).filter(pName => pName !== undefined);
    dto.placement = this.placement.map(p => p.isFilter ? p.name : undefined).filter(pName => pName !== undefined);
    return dto;
  }
}
