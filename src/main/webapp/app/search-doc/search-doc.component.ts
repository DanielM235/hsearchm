import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { setTimeout } from 'timers';
import { SearchDocService } from "./search-doc.service";

@Component({
  selector   : 'edc-search-doc',
  templateUrl: './search-doc.component.html',
  styleUrls  : ['./search-doc.component.less']
})
export class SearchDocComponent implements OnInit {

  // List of nodesDesc matching search.
  nodesDesc: Node[] = [];

  // Template data.
  isOpen = false;
  isLoading = false;
  isValid = false;

  // Search input control.
  searchCtrl: FormControl;

  constructor(private searchDocService: SearchDocService) {
  }

  ngOnInit(): void {
    this.initSearchField();
  }

  /**
   * Open the dropdown on input focus, only if something has already been typed.
   */
  onFocus() {
    if (this.searchCtrl.value.length) {
      // Have to use setTimeout otherwise "DropdownOutsideClickDirective" close the dropdown.
      setTimeout(() => this.isOpen = true, 200);
    }
  }

  /**
   * Closes dropdown (see DropdownOutsideClickDirective).
   */
  closeDropdown(): void {
    this.isOpen = false;
  }

  /**
   * Sets search input control listener.
   */
  private initSearchField(): void {
    this.searchCtrl = new FormControl('');
    this.searchCtrl.valueChanges.debounceTime(200).subscribe(value => {
      this.isOpen = value;
      if (value.length >= 3) {
        this.isValid = true;
        this.populateDocumentations(value);
      } else {
        this.isValid = false;
        this.nodesDesc = [];
      }
    });
  }

  /**
   * Populates the documentation list.
   * @param search the search input text.
   */
  private populateDocumentations(search: string): void {
    this.isLoading = true;
    if (this.isValid) {
      this.searchDocService.getDocumentations(search).subscribe(nodeDescriptions => {
        this.isLoading = false;
        this.nodesDesc = nodeDescriptions;
      });
    }
  }
}
