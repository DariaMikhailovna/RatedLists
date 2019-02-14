import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DialogAnyData} from '../../models/dialogAnyData';
import {ComparisonsService} from '../../services/comparisons.service';
import {Comparison} from '../../models/comparison';
import {Item} from '../../models/item';

@Component({
  selector: 'app-compare-dialog',
  templateUrl: './compare-dialog.component.html',
  styleUrls: ['./compare-dialog.component.css']
})
export class CompareDialogComponent implements OnInit {
  value: Item = new Item();
  itemNames: string[] = [];
  items: Item[] = [];
  item1: string;
  item2: string;
  constructor( @Inject(MAT_DIALOG_DATA) public data: DialogAnyData,
               private comparisonsService: ComparisonsService) {
    this.itemNames = this.data.itemNames;
    if (data.firstItem) {
      this.value = this.data.firstItem;
      this.item1 = this.data.firstItem.id;
    }
    this.items = this.data.items;
  }

  ngOnInit() {
  }

  compare() {
    const comparison = new Comparison();
    comparison.item1 = this.item1;
    comparison.item2 = this.item2;
    this.comparisonsService
      .addComparison(comparison)
      .subscribe(x => {

      });
  }
}
