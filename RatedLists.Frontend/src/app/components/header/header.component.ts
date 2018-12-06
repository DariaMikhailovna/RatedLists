import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AuthDialogComponent} from '../auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openAuthDialog() {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
