import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalizadorComponent } from './vistas/analizador/analizador.component';
const routes: Routes = [
  {path: "", redirectTo: "analizador", pathMatch:"full"},
  {path:"analizador", component:AnalizadorComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AnalizadorComponent]
