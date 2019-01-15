import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DialogAnyData} from '../../models/dialogAnyData';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent implements OnInit {
  static onAddItem = new Subject<DialogAnyData>();
  name = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogAnyData) { }

  ngOnInit() {
  }
  add() {
    const data = new DialogAnyData();
    data.name = this.name;
    data.isBulkAdd = this.data.isBulkAdd;
    ItemDialogComponent.onAddItem.next(data);
  }
}
