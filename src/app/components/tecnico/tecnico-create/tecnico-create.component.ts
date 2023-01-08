import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

tecnico : Tecnico = {
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
    private service: TecnicoService,
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
    this.service.create(this.tecnico).subscribe(resposta => {
      this.toast.success('Técnico criado com sucesso.')
      this.router.navigate(['tenicos'])
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
    if(this.tecnico.perfils.includes(perfil)){
      this.tecnico.perfils.splice(this.tecnico.perfils.indexOf(perfil),1);
    }else{
      this.tecnico.perfils.push(perfil)
    }
  }

}
