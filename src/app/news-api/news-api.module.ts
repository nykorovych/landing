import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaArticlListComponent } from './na-articl-list/na-articl-list.component';
import { TrimOutletNamePipe } from './trim-outlet-name.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NaArticlListComponent, TrimOutletNamePipe],
  imports: [CommonModule, SharedModule],
  exports: [NaArticlListComponent],
})
export class NewsApiModule {}
