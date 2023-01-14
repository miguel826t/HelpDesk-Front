import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  titulo     : FormControl = new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(30)])
  status     : FormControl = new FormControl(null,[Validators.required])
  prioridade : FormControl = new FormControl(null,[Validators.required])
  tecnico    : FormControl = new FormControl(null,[Validators.required])
  cliente    : FormControl = new FormControl(null,[Validators.required])
  descricao  : FormControl = new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(30)])

  constructor() { }

  ngOnInit(): void {
  }

  validaCampos(): boolean{
    return this.titulo.valid && this.status.valid &&
           this.prioridade.valid && this.tecnico.valid &&
           this.cliente.valid && this.descricao.valid
  }

}
