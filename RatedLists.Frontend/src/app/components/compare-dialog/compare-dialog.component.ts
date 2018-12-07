import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DialogAnyData} from '../../models/dialogAnyData';

@Component({
  selector: 'app-compare-dialog',
  templateUrl: './compare-dialog.component.html',
  styleUrls: ['./compare-dialog.component.css']
})
export class CompareDialogComponent implements OnInit {
  value: any;
  items: string[] = [];
  constructor( @Inject(MAT_DIALOG_DATA) public data: DialogAnyData) {
    this.items = this.data.itemNames;
    this.value = this.data.firstItem;
  }

  ngOnInit() {
  }

  compare() {

  }
}
