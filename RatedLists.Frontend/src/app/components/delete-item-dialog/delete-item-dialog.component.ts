import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DialogAnyData} from '../../models/dialogAnyData';
import {ItemsService} from '../../services/items.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-delete-item-dialog',
  templateUrl: './delete-item-dialog.component.html',
  styleUrls: ['./delete-item-dialog.component.css']
})
export class DeleteItemDialogComponent implements OnInit {
  static onDeleteItem = new Subject<string>();

  constructor( @Inject(MAT_DIALOG_DATA) public data: DialogAnyData,
               private itemsService: ItemsService) { }

  ngOnInit() {
  }

  delete() {
    this.itemsService
      .deleteItem(this.data.id)
      .subscribe(x => {
        DeleteItemDialogComponent.onDeleteItem.next(this.data.name);
      });
  }
}
