import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaArticlListComponent } from './na-articl-list/na-articl-list.component';



@NgModule({
  declarations: [NaArticlListComponent],
  imports: [
    CommonModule
  ],
  exports: [NaArticlListComponent]
})
export class NewsApiModule { }
