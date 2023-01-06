import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.hidePass = true;
  }

  validaCampos() : boolean{
    return this.email.valid && this.senha.valid
  }

  logar(){
    this.service.authenticate(this.creds).subscribe(resposta => {
      let tokenResposta = resposta.headers.get('Authorization');
      if(tokenResposta != null){
        this.service.successfulLogin(tokenResposta.substring(7));
        if(this.service.isAuthenticated()){
          this.router.navigate(['home'])
        }else{
          this.toast.error('Usuário ou senha inválidos');
        }
      }else{
        this.toast.error('Usuário ou senha inválidos');
      }
    }, 
    () => {
      this.toast.error('Usuário ou senha inválidos');
    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Campo obrigatório';
    }
    return this.email.hasError('email') ? 'Entre com um e-mail válido' : '';
  }

}
