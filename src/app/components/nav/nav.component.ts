import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private toast: ToastrService
    ) { }

  ngOnInit(): void {
    this.router.navigate(['chamados/create'])
  }

  logout(){
    this.router.navigate(['login'])
    this.auth.logout();
    this.toast.info('Logout realizado com sucesso','LogOut',{timeOut: 7000});
  }

}
