import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { AlgorithmDetailComponent } from './algorithm-detail/algorithm-detail.component';

const routes: Routes = [
  {
    path: ':group/:algorithm',
    component: AlgorithmDetailComponent
  },
  {
    path: '',
    component: ListComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
