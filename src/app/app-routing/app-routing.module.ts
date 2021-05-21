import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SnakeComponent } from '../snake/snake.component';
import { CalciComponent } from '../calci/calci.component';
import { SudokuComponent } from '../sudoku/sudoku.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sudoku' },
  { path: 'sudoku', component: SudokuComponent },
  { path: 'calculator', component: CalciComponent },
  { path: 'snake-game', component: SnakeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
