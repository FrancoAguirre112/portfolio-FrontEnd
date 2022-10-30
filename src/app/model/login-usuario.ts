export class LoginUsuario {
    public nombreUsuario: string="";
    public password: string="";

    contructor(nombreUsuario: string, password: string){
        this.nombreUsuario = nombreUsuario;
        this.password = password;
    }
}
