import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListComponent } from './pages/list/list.component';
import { CardComponent } from './components/card/card.component';
import { AppRoutingModule } from './app-routing.module';
import { ImagenPipe } from './pipes/imagen.pipe';
import { AddComponent } from './pages/add/add.component';
import { HeroesService } from './services/heroes/heroes.service';
import { HttpFactory } from './services/interceptor/interceptor.service';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';

@NgModule({
  declarations: [
    ImagenPipe,
    AppComponent,
    ListComponent,
    CardComponent,
    AddComponent,
    ConfirmarComponent
  ],
  imports: [
    BrowserModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    HeroesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpFactory,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
