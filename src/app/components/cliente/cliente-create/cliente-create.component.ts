import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

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
  senha : FormControl = new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(30)])

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.nome.valid && 
           this.cpf.valid  && 
           this.email.valid && 
           this.senha.valid
  }

  create(): void {
    this.service.create(this.cliente).subscribe(resposta => {
      this.toast.success('Cliente criado com sucesso.');
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
  }

}
