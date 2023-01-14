import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = []
  FILTERED_DATA: Chamado[] = []
  displayedColumns: string[] = ['id', 'titulo', 'nomeCliente','nomeTecnico', 'dataAbertura','prioridade','status','acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: ChamadoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAll(): void{
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  retornaStatus(status: any): string{
    console.log(status)
    switch(status){
      case 0:
        return 'Em aberto'
      case 1:
        return 'Em andamento'
      case 2:
        return 'Encerrado'
    }
    return '';
  }

  retornaPrioridade(prioridade: any): string{
    switch(prioridade){
      case 0:
        return 'Baixa'
      case 1:
        return 'Media'
      case 2:
        return 'Alta'
    }
    return '';
  }

  resetFilter(): void{
    this.FILTERED_DATA = []
    this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  orderByStatus(status : any): void{
    let list: Chamado[] = []
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status){
        list.push(element)
      }
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(this.FILTERED_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
