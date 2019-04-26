import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlgorithmComponent } from './algorithm/algorithm.component';
import { AlgorithmDetailComponent } from './algorithm-detail/algorithm-detail.component';
import { ListComponent } from './list/list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GroupComponent } from './group/group.component';
import { TitlePipe } from './title.pipe';
import { MarkdownPipe } from './markdown.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AlgorithmComponent,
    AlgorithmDetailComponent,
    ListComponent,
    HeaderComponent,
    FooterComponent,
    GroupComponent,
    TitlePipe,
    MarkdownPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
