import { Cliente } from './cliente';
import { ClienteService } from '../../service/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit{

  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;


  constructor(
    private servicel: ClienteService,
    private route: ActivatedRoute
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
    this.servicel.salvar(this.cliente);
    this.cliente = Cliente.newCliente();
  }
}
