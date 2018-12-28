import {Component, OnInit, ViewChild} from '@angular/core';
import {Item, ITEMS} from '../../models/item';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material//paginator';
import {ItemDialogComponent} from '../item-dialog/item-dialog.component';
import {DialogAnyData} from '../../models/dialogAnyData';
import {DeleteElementDialogComponent} from '../delete-element-dialog/delete-element-dialog.component';
import {MainService} from '../../services/main.service';
import {CompareDialogComponent} from '../compare-dialog/compare-dialog.component';

@Component({
  selector: 'app-list-of-items',
  templateUrl: './list-of-items.component.html',
  styleUrls: ['./list-of-items.component.css']
})
export class ListOfItemsComponent implements OnInit {
  displayedColumns: string[] = ['picture', 'name', 'grade', 'delete'];
  dataSource =  new MatTableDataSource<ItemViewModel>(ITEMS.map(x => {
    const ivm = new ItemViewModel(this.dialog);
    ivm.item = x;
    return ivm;
  }));
  s: string;
  constructor(public dialog: MatDialog, private mainService: MainService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // this.getItems();
    ItemDialogComponent.onAddItem.subscribe(x => {
      const ivm = new ItemViewModel(this.dialog);
      ivm.item = new Item();
      ivm.item.name = x;
      ivm.item.listId = this.dataSource.data[0].item.listId; // TODO позже исправить
      this.dataSource.data.push(ivm);
      this.mainService
        .addItem(ivm.item)
        .subscribe(data => console.log(data));
    });
    this.dataSource.paginator = this.paginator;
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
      .getString()
      .subscribe(x => {
        this.s = x;
        console.log(x);
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

  constructor(public dialog: MatDialog) { }

  deleteItem() {
    const data = new DialogAnyData();
    data.name = this.item.name;
    const dialogRef = this.dialog.open(DeleteElementDialogComponent, {
      width: '400px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
