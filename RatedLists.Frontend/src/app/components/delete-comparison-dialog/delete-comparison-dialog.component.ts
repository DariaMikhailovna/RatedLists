import {Component, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ComparisonsService} from '../../services/comparisons.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DialogAnyData} from '../../models/dialogAnyData';

@Component({
  selector: 'app-delete-comparison-dialog',
  templateUrl: './delete-comparison-dialog.component.html',
  styleUrls: ['./delete-comparison-dialog.component.css']
})
export class DeleteComparisonDialogComponent implements OnInit {
  static onDeleteComparison = new Subject<string>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogAnyData,
              private comparisonsService: ComparisonsService) { }

  ngOnInit() {
  }

  delete() {
    this.comparisonsService
      .deleteComparison(this.data.id)
      .subscribe(x => {
        DeleteComparisonDialogComponent.onDeleteComparison.next(this.data.id);
      });
  }
}
