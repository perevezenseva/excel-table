import { Component, OnInit } from '@angular/core';
import { get } from "lodash";

export interface IRow {
  row: string;
  name: string;
  expandable: boolean;
  expanded: boolean;
  parent: IRow | null;
  path: string;
}
export interface IChild {
  name: string;
  number: number | null;
  children: IChild[];
}

export interface IData {
  year: number;
  titles: IChild[];
  date: Date | null;
  select: string | null;
  file: FormData | null;
  [k: string]: any;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  data: IData[] = [
    {
      year: 2017,
      titles: [
        {
          name: "Title",
          number: null,
          children: [
            {
              name: "Subtitle 1",
              number: null,
              children: []
            },
            {
              name: "Subtitle 2",
              number: null,
              children: [
                {
                  name: "Data 1",
                  number: null,
                  children: []
                },
                {
                  name: "Data 2",
                  number: null,
                  children: []
                }
              ]
            }
          ]
        }
      ],
      date: null,
      file: null,
      select: null
    },
    {
      year: 2018,
      titles: [
        {
          name: "Title",
          number: null,
          children: [
            {
              name: "Subtitle 1",
              number: null,
              children: []
            },
            {
              name: "Subtitle 2",
              number: null,
              children: [
                {
                  name: "Data 1",
                  number: null,
                  children: []
                },
                {
                  name: "Data 2",
                  number: null,
                  children: []
                }
              ]
            }
          ]
        }
      ],
      date: new Date(),
      file: null,
      select: null
    },
    {
      year: 2019,
      titles: [{
        name: "Title",
        number: null,
        children: [
          {
            name: "Subtitle 1",
            number: null,
            children: []
          },
          {
            name: "Subtitle 2",
            number: null,
            children: [
              {
                name: "Data 1",
                number: null,
                children: []
              },
              {
                name: "Data 2",
                number: null,
                children: []
              }
            ]
          }
        ]
      }
      ],
      date: null,
      file: null,
      select: 'Option 1'
    }
  ];
  rows: IRow[] = [];

  getRows() {
    const rows: IRow[] = [];
    const titles = this.data[0].titles;
    titles.forEach((title, index) => {
      const row = {
        name: title.name,
        row: 'row-' + index,
        expandable: title.children.length > 0,
        expanded: true,
        parent: null,
        path: "['titles'][" + index + "]"
      };
      rows.push(row);
      title.children.forEach((title2, index2) => {
        const row2 = {
          name: title2.name,
          row: 'row-' + index + '-' + index2,
          expandable: title2.children.length > 0,
          expanded: true,
          parent: row,
          path: "['titles'][" + index + "]['children'][" + index2 + "]"
        };
        rows.push(row2);
        title2.children.forEach((title3, index3) => {
          const row3 = {
            name: title3.name,
            row: 'row-' + index2 + '-' + index3,
            expandable: title3.children.length > 0,
            expanded: true,
            parent: row2,
            path: "['titles'][" + index + "]['children'][" + index2 + "]['children'][" + index3 + "]"
          };
          rows.push(row3);
        });
      });
    });
    return rows;
  }

  expandRow(row: IRow) {
    const children: IRow[] = this.rows.filter(r => r.parent && r.parent.row === row.row) || [];
    if (children.filter((ch) => ch.expandable && ch.expanded).length === 0) {
      row.expanded = !row.expanded;
    }
  }

  getByPath(object: IData, path: string) {
    return get(object, path);
  }

  downloadFile(data: any) {
    if (!data) return;
    const url = window.URL.createObjectURL(data);
    window.open(url);
  }

  onFocusOutEvent(event: any, year: any, path: string, type: string) {
    switch (type) {
      case 'date':
        year[path] = event.target.value;
        break;
      case 'file':
        this.changeFile(event, year, path);
        break;
      case 'select':
        year[path] = event.target.value;
        break;
      case 'number':
        const _updatedObj = this.getByPath(year, path)
        _updatedObj.number = event.target.value;
        this.calculateSum();
        break;
      default:
        year[path] = event.target.value;
        break;
    }
  }

  changeFile(event: any, year: any, path: string) {
    if (event.target.files && event.target.files.length) {
      const arrFiles: File[] = Array.from(event.target.files);
      const formData = new FormData();
      formData.append("file", arrFiles[0], arrFiles[0].name);
      year[path] = event.target.files[0];
    }
  }

  calculateSum(): void {
    this.data.forEach((d) => {
      d.titles.forEach((title) => {
        this.calculateNode(title);
      });
    });
  }

  calculateNode(title: IChild): void {
    if (!title.children || !title.children.length) return;

    title.children.forEach((child) => {
      this.calculateNode(child);
    });
    const notNull = title.children.filter(c => !!c.number);
    title.number = notNull && notNull.length ? notNull.map((ch) => Number(ch.number)).reduce((a, b) => a + b, 0) : null;
  }

  constructor() { }

  ngOnInit(): void {
    this.rows = this.getRows();
  }

}
