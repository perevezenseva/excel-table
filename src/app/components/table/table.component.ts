import { Component, OnInit } from '@angular/core';

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

  downloadFile(data: any) {
    if(!data) return;
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(data); 
    window.open(url);
  }

  onFocusOutEvent(event: any, year: any, field: string) {
    if (field === 'file') {
      if (event.target.files && event.target.files.length) {
          const arrFiles: File[] = Array.from(event.target.files);
          const formData = new FormData();
          formData.append("file", arrFiles[0], arrFiles[0].name);
          year[field] = event.target.files[0];
      }
    } else {
      year[field] = event.target.value;
    }
    if (field === 'number') {
      this.calculateSum();
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
    title.number = title.children.map((ch) => Number(ch.number)).reduce((a, b) => a + b);
  }

  expandRow() {
    
  }

  viewTable() {
    console.log('this.data', this.data);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
