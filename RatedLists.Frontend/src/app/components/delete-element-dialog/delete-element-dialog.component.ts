import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DialogAnyData} from '../../models/dialogAnyData';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-delete-element-dialog',
  templateUrl: './delete-element-dialog.component.html',
  styleUrls: ['./delete-element-dialog.component.css']
})
export class DeleteElementDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: DialogAnyData, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  delete() {
    this.openSnackBar('Item deleted:', this.data.name);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
