import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataStoreComponent } from './app.component';
import { FusionChartsModule } from 'angular-fusioncharts';

import * as FusionCharts from 'fusioncharts';

import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionMaps from 'fusioncharts/fusioncharts.maps';
import * as World from 'fusioncharts/maps/fusioncharts.world';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import * as Countries from 'fusionmaps/maps/fusioncharts.worldwithcountries';
import {HttpClientModule} from '@angular/common/http';
import { FusionGridModule } from 'angular-fusiongrid';

//@ts-ignore
import FusionGrid from 'fusiongrid';
import 'fusiongrid/dist/fusiongrid.css';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme, World, FusionMaps, Countries);
FusionGridModule.setFGRoot(FusionGrid);

@NgModule({
  declarations: [
    DataStoreComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FusionChartsModule,
    FusionGridModule
  ],
  providers: [],
  bootstrap: [DataStoreComponent]
})
export class AppModule { }
