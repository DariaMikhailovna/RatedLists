import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {DialogAnyData} from '../../models/dialogAnyData';
import {MatSnackBar} from '@angular/material';
import {ItemsService} from '../../services/items.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-delete-element-dialog',
  templateUrl: './delete-element-dialog.component.html',
  styleUrls: ['./delete-element-dialog.component.css']
})
export class DeleteElementDialogComponent implements OnInit {
  static onDeleteItem = new Subject<string>();

  constructor( @Inject(MAT_DIALOG_DATA) public data: DialogAnyData,
               private mainService: ItemsService) { }

  ngOnInit() {
  }

  delete() {
    this.mainService
      .deleteItem(this.data.id)
      .subscribe(x => {
        DeleteElementDialogComponent.onDeleteItem.next(this.data.name);
      });
  }
}
