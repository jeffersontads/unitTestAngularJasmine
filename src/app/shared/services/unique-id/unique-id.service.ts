import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

//torna ele um injetável
@Injectable()
export class UniqueIdService {
  private numberOfgeneratedIds = 0;
  private validId = /^[A-Za-z]+[\w\-\:\.]*$/;

  public generateUniqueIdWithPrefix(prefix: string): string {
    if (!prefix || !this.validId.test(prefix)) {
      throw new Error('Prefix can not be empty');
    }
    const uniqueId = this.generateUniqueId();
    this.numberOfgeneratedIds++;
    return `${prefix}-${uniqueId}`;
  }

  public getNumberOfgeneratedIds(): number {
    return this.numberOfgeneratedIds;
  }
  private generateUniqueId(): string {
    return uuidv4();
  }
}
