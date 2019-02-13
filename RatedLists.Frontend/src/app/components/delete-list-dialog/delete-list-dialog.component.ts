import {Component, Inject, OnInit} from '@angular/core';
import {DialogAnyData} from '../../models/dialogAnyData';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ListsService} from '../../services/lists.service';
import {Subject} from 'rxjs/index';

@Component({
  selector: 'app-delete-list-dialog',
  templateUrl: './delete-list-dialog.component.html',
  styleUrls: ['./delete-list-dialog.component.css']
})
export class DeleteListDialogComponent implements OnInit {
  static onDeleteList = new Subject<string>();

  constructor( @Inject(MAT_DIALOG_DATA) public data: DialogAnyData,
               private listsService: ListsService) { }

  ngOnInit() {
  }

  delete() {
    this.listsService
      .deleteList(this.data.id)
      .subscribe(x => {
        DeleteListDialogComponent.onDeleteList.next(this.data.name);
      });
  }
}
