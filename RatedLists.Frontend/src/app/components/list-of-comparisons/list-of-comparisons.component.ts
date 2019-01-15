import {Component, OnInit, ViewChild} from '@angular/core';
import {ComparisonsService} from '../../services/comparisons.service';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Comparison} from '../../models/comparison';
import {DialogAnyData} from '../../models/dialogAnyData';
import {DeleteItemDialogComponent} from '../delete-item-dialog/delete-item-dialog.component';
import {DeleteComparisonDialogComponent} from '../delete-comparison-dialog/delete-comparison-dialog.component';

@Component({
  selector: 'app-list-of-comparisons',
  templateUrl: './list-of-comparisons.component.html',
  styleUrls: ['./list-of-comparisons.component.css']
})
export class ListOfComparisonsComponent implements OnInit {
  displayedColumns: string[] = ['First Name', 'Difference', 'Second Name', 'Delete'];
  dataSource =  new MatTableDataSource<ComparisonViewModel>();
  constructor(private comparisonsService: ComparisonsService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog,) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getComparisons();
    DeleteComparisonDialogComponent.onDeleteComparison.subscribe(x => {
      this.getComparisons();
      this.openSnackBar('Item deleted:', x);
    });
  }
  getComparisons() {
      this.comparisonsService
        .getComparisons()
        .subscribe(y => {
          this.dataSource =  new MatTableDataSource<ComparisonViewModel>(y.map(x => {
            const cvm = new ComparisonViewModel(this.dialog);
            cvm.comparison = x;
            return cvm;
          }));
          this.dataSource.paginator = this.paginator;
        });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  applyFilter(filterValue: string) {
    // this.dataSource.filterPredicate = function (data, filter: string): boolean {
    //   return data.comparison.item1.toLowerCase().includes(filter) || data.comparison.item2.toString().toLowerCase().includes(filter);
    // };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
 class ComparisonViewModel {
   comparison: Comparison;

   constructor(private dialog: MatDialog) {}

   deleteComparison() {
     const data = new DialogAnyData();
     data.id = this.comparison.id;
     const dialogRef = this.dialog.open(DeleteComparisonDialogComponent, {
       width: '400px',
       data: data
     });
     dialogRef.afterClosed().subscribe(result => {
     });
   }
 }
