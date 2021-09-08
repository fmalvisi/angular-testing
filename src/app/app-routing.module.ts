import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/core/components/home/home.component';
import { ColorListResolver } from './modules/core/resolvers/color-list.resolver';

const routes: Routes = [
  {
  path: 'colors',
  component: HomeComponent,
  pathMatch: 'full',
    resolve: {
      colorList: ColorListResolver
    }
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
