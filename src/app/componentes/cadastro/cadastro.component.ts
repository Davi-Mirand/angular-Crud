import {MatSnackBar} from '@angular/material/snack-bar'
import { Cliente } from './cliente';
import { ClienteService } from '../../service/cliente.service';
import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective

  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit{

  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar)


  constructor(
    private servicel: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe( (query: any) => {
      const params = query['params'];
      const id = params['id'];
      if(id){
        let clienteEncontrado = this.servicel.buscarClientePorId(id);

        if(clienteEncontrado){
          this.atualizando = true;
          this.cliente = clienteEncontrado;
        }else{
          this.cliente = Cliente.newCliente();
        }


        this.cliente = this.servicel.buscarClientePorId(id) || Cliente.newCliente();
      }
    })
  }

  salvar(){
    if(!this.atualizando){
      this.servicel.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem('Salvo com sucesso!')
    }else{
      this.servicel.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem('Atualizado com sucesso!')
    }


  }

  mostrarMensagem(mensagem: string){
      this.snack.open(mensagem, 'OK')
    }
}
