import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

const materialList = [
  CommonModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule
]

@NgModule({
  imports: [...materialList],
  exports: [...materialList]
})
export class MaterialModule { }
