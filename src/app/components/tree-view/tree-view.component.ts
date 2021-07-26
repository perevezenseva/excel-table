import { Component, Input, OnInit } from '@angular/core';
import { IChild } from '../table/table.component';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  @Input("children")
  children: IChild[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onFocusOutEvent(event: any, year: any, field: string) {
    year[field] = event.target.value;
    console.log(event.target.value);
  }

  expandRow() {

  }

}
