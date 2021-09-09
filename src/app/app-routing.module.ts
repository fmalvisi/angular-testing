import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/core/components/home/home.component';
import { ColorListResolver } from './modules/core/resolvers/color-list.resolver';
import { AddOrEditComponent } from './modules/features/add-or-edit/components/add-or-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
      resolve: {
        colorList: ColorListResolver
      }
  },
  {
    path: 'color/:colorId',
    component: AddOrEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
