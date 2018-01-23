import {
  Component,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { SimpleModel, ReferenceService } from '../../../core/index';

@Component({
  selector: 'app-reference-table',
  templateUrl: './reference-table.component.html'
})
export class ReferenceTableComponent implements OnInit {
  items: SimpleModel[];

  @Input() title: string;
  @Input() service: ReferenceService;

  public formGroup: FormGroup;
  editedRowIndex: number;

  constructor() {}

  ngOnInit() {
    this.service.getAll().subscribe(x => (this.items = x));
    console.log(this.service);
  }

  protected editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      id: new FormControl(dataItem.id),
      nameRu: new FormControl(dataItem.nameRu, Validators.required),
      nameEn: new FormControl(dataItem.nameEn, Validators.required)
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  protected addHandler({ sender }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      id: new FormControl({ value: 0, disabled: true }),
      nameRu: new FormControl('', Validators.required),
      nameEn: new FormControl('', Validators.required)
    });
    sender.addRow(this.formGroup);
  }

  protected cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  protected saveHandler({ sender, rowIndex, formGroup, isNew }) {
    const product: SimpleModel = formGroup.value;
    this.service.createOrUpdate(product).subscribe(x => (this.items = x));
    sender.closeRow(rowIndex);
  }

  protected removeHandler({ dataItem }) {
    this.service.delete(dataItem).subscribe(x => (this.items = x));
  }

  closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}
