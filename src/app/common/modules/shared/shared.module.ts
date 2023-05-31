import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../material/material.module';

const sharedModules = [
  HttpClientModule,
  MaterialModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    sharedModules
  ],
  exports: [...sharedModules]
})
export class SharedModule { }
