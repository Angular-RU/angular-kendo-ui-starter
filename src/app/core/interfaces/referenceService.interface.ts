import { Observable } from 'rxjs/Observable';
import { SimpleModel, IdNameModel } from '../models';

export interface ReferenceService {
  getAll(): Observable<SimpleModel[]>;
  getAllTranslated(): Observable<IdNameModel[]>;
  createOrUpdate(item: SimpleModel): Observable<SimpleModel[]>;
  delete(item: SimpleModel): Observable<SimpleModel[]>;
}
