import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchDocComponent } from "./search-doc.component";
import { SearchDocService } from "./search-doc.service";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports        : [
    CommonModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  entryComponents: [
    SearchDocComponent
  ],
  providers      : [
    SearchDocService
  ],
})
export class SearchDocModule {
}
