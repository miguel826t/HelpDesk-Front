import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente : Cliente = {
    id:       '',
    nome:     '',
    cpf:      '',
    email:    '',
    senha:    '',
    perfils:  [],
    dataCriacao:''
  }
  
    nome  : FormControl = new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(30)])
    cpf   : FormControl = new FormControl(null,[Validators.required])
    email : FormControl = new FormControl(null,[Validators.required,Validators.email])
    senha : FormControl = new FormControl(null,[Validators.required,Validators.minLength(3)])
  
    constructor(
      private service: ClienteService,
      private toast: ToastrService,
      private router: Router,
      private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }
  validaCampos(): boolean {
    return this.nome.valid && 
           this.cpf.valid  && 
           this.email.valid && 
           this.senha.valid
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta =>{
      resposta.perfils = []
      this.cliente = resposta;
    })
  }


  update(): void {
    console.log(this.cliente);
    this.service.update(this.cliente).subscribe(() => {
      this.toast.success('Cliente atualizado com sucesso.');
      this.router.navigate(['clientes']);
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

  addPerfil(perfil: any): void {
    if(this.cliente.perfils.includes(perfil)){
      this.cliente.perfils.splice(this.cliente.perfils.indexOf(perfil),1);
    }else{
      this.cliente.perfils.push(perfil)
    }
    console.log(this.cliente.perfils)
  }

}

