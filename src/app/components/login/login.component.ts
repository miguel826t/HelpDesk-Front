import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/credenciais';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds : Credenciais = {
    email : '',
    senha : ''
  }
  email = new FormControl(this.creds.email, [Validators.required, Validators.email]);
  senha = new FormControl(this.creds.senha, [Validators.required, Validators.minLength(8)]);
  hidePass : boolean;

  constructor() { }

  ngOnInit(): void {
    this.hidePass = true;
  }

  validaCampos() : boolean{
    if(this.email.valid && this.senha.valid){
      return true;
    }else{
      return false;
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Campo obrigatório';
    }
    return this.email.hasError('email') ? 'Entre com um e-mail válido' : '';
  }

}
