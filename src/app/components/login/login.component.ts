import { Component, OnInit } from '@angular/core';
import { LoginUsuario } from '../../model/login-usuario';
import { TokenService } from '../../service/token.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isLogged = false;
  isLogginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password! : string;
  roles: string[] = [];
  errMsj!: string;

  constructor(private TokenService: TokenService, private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(this.TokenService.getToken()){
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.TokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario();
    this.loginUsuario.nombreUsuario = this.nombreUsuario;
    this.loginUsuario.password = this.password;
    this.AuthService.login(this.loginUsuario).subscribe(data => {
        this.isLogged = true;
        this.isLogginFail = false;
        this.TokenService.setToken(data.token);
        this.TokenService.setUsername(data.nombreUsuario);
        this.TokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/'])
      }, err =>{
        this.isLogged = false;
        this.isLogginFail = true;
        this.errMsj = err.error.mensaje;
        console.log(this.errMsj);
      })
  }

}
