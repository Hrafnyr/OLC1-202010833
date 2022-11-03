import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FootersComponent } from './plantillas/footers/footers.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './servicios/api/api.service';
import { ReportesComponent } from './vistas/reportes/reportes.component';
import { TablaSComponent } from './vistas/tabla-s/tabla-s.component';
import { TablaErrComponent } from './vistas/tabla-err/tabla-err.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    FootersComponent,
    routingComponents,
    ReportesComponent,
    TablaSComponent,
    TablaErrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
