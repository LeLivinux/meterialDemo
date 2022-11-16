import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from "../person";
import {PERSONEN} from "../mock-personen";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.scss']
})
export class FormularComponent implements OnInit {
  personen = PERSONEN;
  @Input() person?: Person;

  @Output() myEvent = new EventEmitter<string>();

  refreshTable(): void{
    this.myEvent.emit('tablerefresh');
  }

  constructor() { }

  ngOnInit(): void {
    this.person = {  firstname: '',lastname:'' };
  }

  save(person: Person): void {
    console.log("save")
    if (!this.personen.find((h) => h == person))
      this.personen.push(person);
    this.person = {  firstname: '',lastname:'' };
    this.myEvent.emit('refreshTable');
  }

  onSubmit(): void{
    console.log("submit");
  }

  add(): void {
    this.person = {  firstname: '',lastname:'' };
  }

}
