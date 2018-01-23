import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { map } from 'rxjs/operators';
import { SimpleModel, IdNameModel } from '../models';
import { ReferenceService } from '../interfaces';

@Injectable()
export class CountriesService implements ReferenceService {
  localeId = 'en';
  private items: SimpleModel[] = [
    new SimpleModel(1, 'Россия', 'Russia'),
    new SimpleModel(2, 'Германия', 'Germany'),
    new SimpleModel(3, 'США', 'USA')
  ];

  constructor() {
    this.localeId = localStorage.getItem('localeId');
  }

  public getAll(): Observable<SimpleModel[]> {
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

  public createOrUpdate(item: SimpleModel): Observable<SimpleModel[]> {
    if (item.id) {
      const old = this.items.find(x => x.id === item.id);
      Object.assign(old, item);
    } else {
      item.id = Math.max(...this.items.map(x => x.id)) + 1;
      this.items.push(item);
    }

    return Observable.from([this.items]);
  }

  public delete(item: SimpleModel): Observable<SimpleModel[]> {
    const index = this.items.indexOf(item);

    if (index !== -1) {
      this.items.splice(index, 1);
    }

    return Observable.from([this.items]);
  }
}
