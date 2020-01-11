export class TechniqueStatus {
  techniqueId: string;
  userId: string;
  status: 'none' | 'tried' | 'ok';

  constructor(status: TechniqueStatus) {
    this.techniqueId = status.techniqueId;
    this.userId = status.userId;
    this.status = status.status;
  }

  toggleStatus(): void {
    if (this.status === 'none') { this.status = 'tried'; return; }
    if (this.status === 'tried') { this.status = 'ok'; return; }
    if (this.status === 'ok') { this.status = 'none'; return; }
    this.status = 'none';
  }
}