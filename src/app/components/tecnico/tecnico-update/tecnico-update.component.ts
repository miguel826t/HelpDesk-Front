import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

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
    senha : FormControl = new FormControl(null,[Validators.required,Validators.minLength(3)])
  
    constructor(
      private service: TecnicoService,
      private toast: ToastrService,
      private router: Router,
      private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    console.log(this.tecnico.id)
    this.findById();
  }
  validaCampos(): boolean {
    return this.nome.valid && 
           this.cpf.valid  && 
           this.email.valid && 
           this.senha.valid
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta =>{
      resposta.perfils = []
      this.tecnico = resposta;
    })
  }


  update(): void {
    console.log(this.tecnico);
    this.service.update(this.tecnico).subscribe(() => {
      this.toast.success('Técnico atualizado com sucesso.');
      this.router.navigate(['tecnicos']);
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
    console.log(this.tecnico.perfils)
  }

}

