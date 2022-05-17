import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-babies-interventions',
  templateUrl: './list-babies.component.html',
  styleUrls: ['./list-babies.component.scss']
})
export class ListBabiesComponent implements OnInit {


  constructor(
    private readonly titleService: Title,
  ) {
    this.titleService.setTitle('bébés');

  }

  ngOnInit(): void {

  }




 



}
