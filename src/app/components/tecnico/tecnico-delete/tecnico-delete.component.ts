import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico : Tecnico = {
    id:       '',
    nome:     '',
    cpf:      '',
    email:    '',
    senha:    '',
    perfils:  [],
    dataCriacao:''
  }

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta =>{
      resposta.perfils = []
      this.tecnico = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe(() => {
      this.toast.success('Técnico deletado com sucesso.');
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


}
