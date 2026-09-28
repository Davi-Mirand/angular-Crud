import { Routes } from '@angular/router';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { ConsultaComponent } from './componentes/consulta/consulta.component';

export const routes: Routes = [
  {
    path:'cadastro' , component:CadastroComponent
  },
  {
    path:'consulta', component:ConsultaComponent
  }
];
