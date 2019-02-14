import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {AddListDialogComponent} from '../add-list-dialog/add-list-dialog.component';
import {ListsService} from '../../services/lists.service';
import {ListOfItems} from '../../models/listOfItems';
import {ItemsService} from '../../services/items.service';
import {DialogAnyData} from '../../models/dialogAnyData';
import {DeleteListDialogComponent} from '../delete-list-dialog/delete-list-dialog.component';

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
              private listsService: ListsService,
              private  itemsService: ItemsService,
              public snackBar: MatSnackBar,
              private listService: ListsService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getLists();
    AddListDialogComponent.onAddList.subscribe(x => {
      this.getLists();
      this.openSnackBar('List added:', x);
    });
    DeleteListDialogComponent.onDeleteList.subscribe(x => {
      this.getLists();
      this.openSnackBar('List deleted:', x);
    });
  }

  getLists() {
    this.listsService
        .getLists()
        .subscribe(y => {
          this.dataSource =  new MatTableDataSource<ListViewModel>(y.map(x => {
            const lvm = new ListViewModel(this.dialog, this.itemsService, this.listService);
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
              private  itemsService: ItemsService,
              private listService: ListsService) {

  }

  deleteList() {
    const data = new DialogAnyData();
    data.name = this.list.name;
    data.id = this.list.id;
    const dialogRef = this.dialog.open(DeleteListDialogComponent, {
      width: '400px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  changeName() {
    this.listService
      .updateItem(this.list)
      .subscribe(x => {
        this.isChangeName = false;
      });
  }
}
