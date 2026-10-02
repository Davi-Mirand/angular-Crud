import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule,
    MatButtonModule
],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  nomeBusca: string = "";
  listaClientes: Cliente[] = [];
  colunasTable: string[]= ["id","nome","cpf","dataNascimento","email","acoes"];
  deletando: boolean = false;

  constructor(
    private sevicel:ClienteService,
    private router: Router
  ){}

ngOnInit(){
  this.listaClientes = this.sevicel.pesquisarClientes("");

}

pesquisar(){
 this.listaClientes = this.sevicel.pesquisarClientes(this.nomeBusca);
}

preparaEditar(id: string){
  this.router.navigate(['/cadastro'], {queryParams: {"id": id}} )
}

preparaDeletar(cliente: Cliente){
  cliente.deletando = true;
}

deletar(cliente: Cliente){
  this.sevicel.deletar(cliente);
  this.listaClientes = this.sevicel.pesquisarClientes('');
  this.deletando = false;
}
}
