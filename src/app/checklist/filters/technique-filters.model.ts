import { Belt, PlacementName, PositionName, TechniquePlacement, TechniquePosition } from '../technique.model';
import { BeltFilter } from './belt-filter.model';

interface GiFilter {
  name: GiName;
  caption: string;
  isFilter: boolean;
}

type GiName = 'gi' | 'no-gi';

export interface TechniqueFiltersDto {
  id?: string;
  userId?: string;
  caption?: string;
  belt?: Belt[];
  position?: PositionName[];
  placement?: PlacementName[];
  gi?: GiName[];
}

export class TechniqueFilters {
  id?: string;
  userId?: string;
  caption = '';
  belt = new BeltFilter();
  belts: Belt[] = ['white', 'blue', 'purple', 'brown'];
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
  gi: GiFilter = { name: 'gi', caption: 'Gi', isFilter: false };
  noGi: GiFilter = { name: 'no-gi', caption: 'No-gi', isFilter: false };

  constructor() { }

  fromDto(dto: TechniqueFiltersDto) {
    this.id = dto.id;
    this.userId = dto.userId;
    this.caption = dto.caption || '';
    this.belt.white = dto.belt ? dto.belt.includes('white') : false;
    this.belt.blue = dto.belt ? dto.belt.includes('blue') : false;
    this.belt.purple = dto.belt ? dto.belt.includes('purple') : false;
    this.belt.brown = dto.belt ? dto.belt.includes('brown') : false;
    this.position.forEach(p => { p.isFilter = dto.position ? dto.position.includes(p.name) : false; });
    this.placement.forEach(p => { p.isFilter = dto.placement ? dto.placement.includes(p.name) : false; });
    this.gi.isFilter = dto.gi ? dto.gi.includes('gi') : false;
    this.noGi.isFilter = dto.gi ? dto.gi.includes('no-gi') : false;
  }

  toDto(): TechniqueFiltersDto {
    const dto: TechniqueFiltersDto = {};
    dto.id = this.id;
    dto.userId = this.userId;
    dto.caption = this.caption;
    dto.belt = this.belt.belts;
    dto.position = this.position.map(p => p.isFilter ? p.name : undefined).filter(pName => pName !== undefined);
    dto.placement = this.placement.map(p => p.isFilter ? p.name : undefined).filter(pName => pName !== undefined);
    dto.gi = [this.gi, this.noGi].map(g => g.isFilter ? g.name : undefined).filter(gName => gName !== undefined);
    return dto;
  }
}
