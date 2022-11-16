import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PERSONEN} from "../mock-personen";
import {Person} from "../person";
import {Observable, of} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort,Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['action','firstname', 'lastname','comment'];
  dataSource = new MatTableDataSource(PERSONEN);


  // personen = PERSONEN;
  selectedPerson?: Person;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.refresh()
  }

  refresh() {
    this.dataSource.data = this.dataSource.data;
  }

  @ViewChild(MatSort) sort: MatSort;

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }

  add(): void {
    this.selectedPerson = {  firstname: '',lastname:'' };
    this.refresh()
  }


  delete(p: Person) {
    let index = this.dataSource.data.indexOf(p,0) ;
    if (index > -1) {
      this.dataSource.data.splice(index,1);
    }
    this.refresh()
    this.add()
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getButtonColor():string {
    if (this.dataSource.data.length == 0) {
      return "buttonGreen"
    } else if (this.dataSource.data.length > 0 && this.dataSource.data.length < 2){
      return "buttonOrange"
    } else {
      return "buttonRed"
    }
  }
}
