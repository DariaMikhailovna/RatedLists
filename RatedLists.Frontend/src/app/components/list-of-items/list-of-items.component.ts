import {Component, OnInit, ViewChild} from '@angular/core';
import {Item} from '../../models/item';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material//paginator';
import {ItemDialogComponent} from '../item-dialog/item-dialog.component';
import {DialogAnyData} from '../../models/dialogAnyData';
import {DeleteItemDialogComponent} from '../delete-item-dialog/delete-item-dialog.component';
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
              private itemService: ItemsService,
              public snackBar: MatSnackBar) { }
  names: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getItems();
    DeleteItemDialogComponent.onDeleteItem.subscribe(x => {
      this.getItems();
      this.openSnackBar('Item deleted:', x);
    });
    ItemDialogComponent.onAddItem.subscribe(x => {
      if (!x.isBulkAdd) {
        this.addItem(x.name);
      } else {
        const names = x.name.split(/\r?\n/);
        for (let i = 0; i < names.length; i++) {
          this.addItem(names[i]);
        }
      }
    });
  }

  getNames(items: Item[]) {
    this.names = items.map(x => x.name);
  }

  addItem(name: string) {
    if (name.trim() === '') {
      this.openSnackBar('Text is empty!', name);
      return;
    }
    if (this.names && this.names.findIndex(x => x === name) !== -1) {
      this.openSnackBar('Item already exists!', name);
      return;
    }
    const ivm = new ItemViewModel(this.dialog, this.itemService);
    ivm.item = new Item();
    ivm.item.name = name;
    ivm.item.listId = this.dataSource.data[0].item.listId; // TODO позже исправить
    this.dataSource.data.push(ivm);
    this.itemService
      .addItem(ivm.item)
      .subscribe(data => {
        this.getItems();
        this.openSnackBar('Item added:', name);
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openCompareDialog(item: Item) {
    const data = new DialogAnyData();
    if (name !== null) {
      data.firstItem = item;
    }
    // data.itemNames = this.dataSource.data.map(x => x.item.name);
    data.items = this.dataSource.data.map(x => x.item);
    const dialogRef = this.dialog.open(CompareDialogComponent, {
      width: '400px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getItems() {
    this.itemService
      .getItems()
      .subscribe(y => {
        this.dataSource =  new MatTableDataSource<ItemViewModel>(y.map(x => {
          this.getNames(y);
          const ivm = new ItemViewModel(this.dialog, this.itemService);
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
    const dialogRef = this.dialog.open(DeleteItemDialogComponent, {
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
