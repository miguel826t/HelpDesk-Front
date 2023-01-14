import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [
    {
      id : 1,
      dataAbertura   : '21/06/2021',
      dataFechamento : '23/06/2021',
      prioridade  : 'ALTA',
      status      : 'ANDAMENTTO',
      titulo      : 'Chamado 1',
      observacoes : 'Teste de chamado',
      idTecnico   : 1,
      nomeTecnico : 'MRC',
      idCliente   : 1,
      nomeCliente : 'Debote'
    }
  ]
  displayedColumns: string[] = ['id', 'titulo', 'nomeCliente','nomeTecnico', 'dataAbertura','prioridade','status','acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
