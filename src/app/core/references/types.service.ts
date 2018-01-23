import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { from } from 'rxjs/observable/from';
import { map } from 'rxjs/operators';
import { SimpleModel, IdNameModel } from '../models';
import { ReferenceService } from '../interfaces/referenceService.interface';

@Injectable()
export class TypesService implements ReferenceService {
  localeId = 'en';
  items: SimpleModel[] = [
    new SimpleModel(1, 'Игрушка', 'Toy'),
    new SimpleModel(2, 'Машина', 'Car'),
    new SimpleModel(3, 'Яблоко', 'Apple')
  ];

  constructor() {
    this.localeId = localStorage.getItem('localeId');
  }

  getAll(): Observable<SimpleModel[]> {
    return Observable.from([this.items]);
  }

  getAllTranslated(): Observable<IdNameModel[]> {
    return Observable.from([this.items]).pipe(
      map(x =>
        x.map(
          y =>
            this.localeId === 'en'
              ? new IdNameModel(y.id, y.nameEn)
              : new IdNameModel(y.id, y.nameRu)
        )
      )
    );
  }

  createOrUpdate(item: SimpleModel): Observable<SimpleModel[]> {
    if (item.id) {
      const old = this.items.find(x => x.id === item.id);
      Object.assign(old, item);
    } else {
      item.id = Math.max(...this.items.map(x => x.id)) + 1;
      this.items.push(item);
    }
    return Observable.from([this.items]);
  }

  delete(item: SimpleModel): Observable<SimpleModel[]> {
    const index = this.items.indexOf(item);

    if (index !== -1) {
      this.items.splice(index, 1);
    }

    return Observable.from([this.items]);
  }
}
