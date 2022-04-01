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

// FusionCharts.options['license']({
//   key: 'ZbA1wikD2C6F6E3D3E2H3A4D8C6C5C-11coI3A1A7A2C7D7A5D5E4I2D1A4kC-13nE2B4G1G3C2A5A4C4E3G3D4D2E2H3C10D7nhyD3E2D2A3C11A8D6D2B4G3G2D3I3B3D5D1kzlG4A9wvpcD5B4yxoB2A5A7iwE3E1A2fyB-22A4B8E2B-11G2a==',
//   creditLabel: false,
// });

// x

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
