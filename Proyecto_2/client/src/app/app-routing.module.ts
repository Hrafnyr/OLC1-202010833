import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalizadorComponent } from './vistas/analizador/analizador.component';
import { ReportesComponent } from './vistas/reportes/reportes.component';
import { TablaErrComponent } from './vistas/tabla-err/tabla-err.component';
import { TablaSComponent } from './vistas/tabla-s/tabla-s.component';
const routes: Routes = [
  {path: "", redirectTo: "analizador", pathMatch:"full"},
  {path:"analizador", component:AnalizadorComponent},
  {path: "Reportes", component: ReportesComponent},
  {path: "Simbolos", component: TablaSComponent},
  {path: "Errores", component: TablaErrComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AnalizadorComponent,ReportesComponent,TablaSComponent,TablaErrComponent]
