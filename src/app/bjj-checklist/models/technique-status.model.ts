export class TechniqueStatus {
  techniqueId: string;
  userId: string;
  status: number;

  constructor(status: TechniqueStatus) {
    this.techniqueId = status.techniqueId;
    this.userId = status.userId;
    this.status = status.status;
  }

  toggleStatus(): void {
    this.status = this.status + 1 % 3;
  }
}
