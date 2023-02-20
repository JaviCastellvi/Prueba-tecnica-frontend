import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';



const routes: Routes = [

  { path: '', 
    redirectTo: 'list',
    pathMatch: 'full'
  },

  { path: 'list', 
    component: ListComponent
  },

  {
    path: 'add',
    component: AddComponent
   },
   {
    path: 'edit/:id',
    component: AddComponent
   },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
