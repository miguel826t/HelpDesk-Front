import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/tecnico';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA : Tecnico[] = [
    {
      id : 1,
      nome : "Mrc",
      email : "mrc@gmail.com",
      cpf : "132.432.543-43",
      perfils : ['0'],
      dataCriacao : "10/09/2022"
    }
  ]  
  displayedColumns: string[] = ['id', 'nome', 'email', 'cpf','acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  constructor() { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
  }

}
