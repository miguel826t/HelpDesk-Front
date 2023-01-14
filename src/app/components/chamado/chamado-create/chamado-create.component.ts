import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  chamado : Chamado = {
    titulo      : '',
    status      : '',
    prioridade  : '',
    idTecnico   : '',
    idCliente   : '',
    observacoes : '',
    nomeTecnico : '',
    nomeCliente : '',
  }

  listCliente : Cliente[] = [];
  listTecnico : Tecnico[] = [];

  titulo     : FormControl = new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(30)])
  status     : FormControl = new FormControl(null,[Validators.required])
  prioridade : FormControl = new FormControl(null,[Validators.required])
  idTecnico    : FormControl = new FormControl(null,[Validators.required])
  idCliente    : FormControl = new FormControl(null,[Validators.required])
  observacoes  : FormControl = new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(30)])

  constructor(
    private chamadoService: ChamadoService,  
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findAllClientes():void{
    this.clienteService.findAll().subscribe(resposta =>{
      this.listCliente = resposta;
    })
  }
  findAllTecnicos():void{
    this.tecnicoService.findAll().subscribe(resposta =>{
      this.listTecnico = resposta;
    })
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(resposta => {
      this.toast.success('Chamado criado com sucesso.');
      this.router.navigate(['chamados']);
    }, ex => {
      console.log(ex);
      if(ex.error.errors){
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        })
      }else{
        this.toast.error(ex.error.message)
        console.log(ex.error.message)
      }
    })
  }


  validaCampos(): boolean{
    return this.titulo.valid && this.status.valid &&
           this.prioridade.valid && this.idTecnico.valid &&
           this.idCliente.valid && this.observacoes.valid
  }

}
