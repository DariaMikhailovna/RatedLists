import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {AddListDialogComponent} from '../add-list-dialog/add-list-dialog.component';
import {ListsServiceService} from '../../services/lists-service.service';
import {ListOfItems} from '../../models/listOfItems';
import {ItemsService} from '../../services/items.service';

@Component({
  selector: 'app-list-of-lists',
  templateUrl: './list-of-lists.component.html',
  styleUrls: ['./list-of-lists.component.css']
})
export class ListOfListsComponent implements OnInit {
  // displayedColumns: string[] = ['picture', 'name'];
  displayedColumns: string[] = ['name', 'delete'];
  dataSource =  new MatTableDataSource<ListViewModel>();
  constructor(public dialog: MatDialog,
              private listsServiceService: ListsServiceService,
              private  itemsService: ItemsService,
              public snackBar: MatSnackBar) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getLists();
    AddListDialogComponent.onAddList.subscribe(x => {
      this.getLists();
      this.openSnackBar('List added:', x);
    });
  }

  getLists() {
    this.listsServiceService
        .getLists()
        .subscribe(y => {
          this.dataSource =  new MatTableDataSource<ListViewModel>(y.map(x => {
            const lvm = new ListViewModel(this.dialog, this.itemsService);
            lvm.list = x;
            return lvm;
          }));
          this.dataSource.paginator = this.paginator;
        })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.list.name.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addList() {
    const dialogRef = this.dialog.open(AddListDialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

class ListViewModel {
  list: ListOfItems;
  isChangeName = false;
  constructor(public dialog: MatDialog,
              private  itemsService: ItemsService) {

  }

  deleteList() {

  }
}
