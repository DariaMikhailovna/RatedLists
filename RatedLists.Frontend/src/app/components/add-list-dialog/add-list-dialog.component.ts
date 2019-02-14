import { Component, OnInit } from '@angular/core';
import {ListsService} from '../../services/lists.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.css']
})
export class AddListDialogComponent implements OnInit {
  static onAddList= new Subject<string>();
  name: string;
  constructor(private listsService: ListsService) { }

  ngOnInit() {
  }
  addList() {
    this.listsService
        .addList(this.name)
        .subscribe(x => {
          AddListDialogComponent.onAddList.next(this.name);
        })
  }
}
