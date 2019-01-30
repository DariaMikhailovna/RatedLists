import { Component, OnInit } from '@angular/core';
import {ListsServiceService} from '../../services/lists-service.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.css']
})
export class AddListDialogComponent implements OnInit {
  static onAddList= new Subject<string>();
  name: string;
  constructor(private listsServiceService: ListsServiceService) { }

  ngOnInit() {
  }
  addList() {
    this.listsServiceService
        .addList(this.name)
        .subscribe(x => {
          AddListDialogComponent.onAddList.next(this.name);
        })
  }
}
