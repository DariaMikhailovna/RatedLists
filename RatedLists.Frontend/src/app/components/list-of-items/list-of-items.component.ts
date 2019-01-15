import {Component, OnInit, ViewChild} from '@angular/core';
import {Item, ITEMS} from '../../models/item';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material//paginator';
import {ItemDialogComponent} from '../item-dialog/item-dialog.component';
import {DialogAnyData} from '../../models/dialogAnyData';
import {DeleteElementDialogComponent} from '../delete-element-dialog/delete-element-dialog.component';
import {ItemsService} from '../../services/items.service';
import {CompareDialogComponent} from '../compare-dialog/compare-dialog.component';

@Component({
  selector: 'app-list-of-items',
  templateUrl: './list-of-items.component.html',
  styleUrls: ['./list-of-items.component.css']
})
export class ListOfItemsComponent implements OnInit {
  displayedColumns: string[] = ['picture', 'name', 'grade', 'delete'];
  dataSource =  new MatTableDataSource<ItemViewModel>();
  constructor(public dialog: MatDialog,
              private mainService: ItemsService,
              public snackBar: MatSnackBar) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getItems();
    DeleteElementDialogComponent.onDeleteItem.subscribe(x => {
      this.getItems();
      this.openSnackBar('Item deleted:', x);
    });
    ItemDialogComponent.onAddItem.subscribe(x => {
      const ivm = new ItemViewModel(this.dialog, this.mainService);
      ivm.item = new Item();
      ivm.item.name = x;
      ivm.item.listId = this.dataSource.data[0].item.listId; // TODO позже исправить
      this.dataSource.data.push(ivm);
      this.mainService
        .addItem(ivm.item)
        .subscribe(data => {
          this.getItems();
          this.openSnackBar('Item added:', x);
        });
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openCompareDialog(name: string) {
    const data = new DialogAnyData();
    if (name !== '') {
      data.firstItem = name;
    }
    data.itemNames = this.dataSource.data.map(x => x.item.name);
    const dialogRef = this.dialog.open(CompareDialogComponent, {
      width: '400px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getItems() {
    this.mainService
      .getItems()
      .subscribe(y => {
        this.dataSource =  new MatTableDataSource<ItemViewModel>(y.map(x => {
          const ivm = new ItemViewModel(this.dialog, this.mainService);
          ivm.item = x;
          return ivm;
        }));
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.item.name.toLowerCase().includes(filter) || data.item.grade.toString().toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openAddDialog(isBulkAdd) {
    const data = new DialogAnyData();
    data.isBulkAdd = isBulkAdd;
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '300px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

class ItemViewModel {
  item: Item;
  isChangeName = false;
  isChangeGrade = false;
  isChangePicture = false;

  constructor(public dialog: MatDialog,
              private mainService: ItemsService) { }

  deleteItem() {
    const data = new DialogAnyData();
    data.name = this.item.name;
    data.id = this.item.id;
    const dialogRef = this.dialog.open(DeleteElementDialogComponent, {
      width: '400px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  changeName() {
    this.mainService
      .updateItem(this.item)
      .subscribe(x => {
        this.isChangeName = false;
      });
  }
}
