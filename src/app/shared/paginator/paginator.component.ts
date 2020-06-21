import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
  @Input() numberOfPages: number;
  pageOptions: number[];
  
  currentPage = 7;

  constructor() {
  
  }

  ngOnInit(): void {
    this.pageOptions = [
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2,
    ].filter(page => page >=1 && page <= this.numberOfPages)
  }
}
