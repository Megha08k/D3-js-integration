import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './common/modules/shared/shared.module';

//Components 
import { AppComponent } from './app.component';
import { BarChartComponent } from './common/components/bar-chart/bar-chart.component';
import { ButtonComponent } from './common/components/button/button.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { HeaderComponent } from './common/components/header/header.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { TooltipComponent } from './common/components/tooltip/tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    DashboardComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
