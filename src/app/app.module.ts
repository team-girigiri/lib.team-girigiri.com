import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlgorithmComponent } from './algorithm/algorithm.component';
import { AlgorithmDetailComponent } from './algorithm-detail/algorithm-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AlgorithmComponent,
    AlgorithmDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
