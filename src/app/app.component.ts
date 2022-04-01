
import { Component, AfterViewInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Renderer } from '@angular/core';
import { environment } from '../environments/environment';
import * as FusionCharts from 'fusioncharts';

import { PieComponent } from '../../VisualizationTemplate/PieChart';
import { LineComponent } from '../../VisualizationTemplate/LineChart';
import { ColumnComponent } from '../../VisualizationTemplate/ColumnChart';
import { WorldMapComponent } from '../../VisualizationTemplate/WorldMap';
import { ScatterChartComponent } from '../../VisualizationTemplate/ScatterChart';
import { UiComponent } from '../../VisualizationTemplate/UiComponent';
import { KpiComponent } from '../../VisualizationTemplate/KPI';
import { HttpClient } from '@angular/common/http';
import { CommonUtils } from '../../Data/CommonUtils';

import FusionGrid from "fusiongrid"; 
import 'fusiongrid/dist/fusiongrid.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class DataStoreComponent {
  title = 'INVESTMENT PORTFOLIO';
  lineChartHeader = 'Yearly Total Investment';
  pieChartHeader = 'Total Investment by Asstets Class';
  columnChartHeader = 'Total Investment by Rating Group';
  scatterChartHeader = 'Market Value Vs Book Value by Rating Group';
  mapHeader = 'Total Investment by Country';
  rorClass: string;
  totalInvestMent: string;
  investmentCount: number;
  rateOfReturn: string;
  countries: string[];
  allRatinggroups: string[];
  allAssetclass: string[];
  linechartdata = {};
  columnchartdata = {};
  piechartdata = {};
  scatterchartdata = {};
  worldmapdata = {};
  selectedCountry: string;
  selectedClass: string;
  selectedRatingGroup: string;
  baseUrl = environment.baseUrl;

    schema = [
    {
        name: 'AssetClass',
        
    }, {
        name: 'IssueCountry'
    },
    {
        name: 'IssueDate'
    },
    {
        name: 'Issuer'
    },
    {
        name: 'RatingGrp'
    },
    {
        name: 'UpdatedIssueDate'
    },
    {
        name: 'BookValue'
    },
    {
        name: 'MarketValue'
    },
    {
        name: 'UnrealizedGainLoss'
    }
  ];

  data = [
    [
      "CMO",
       "US",
      "1/1/2001",
      "& ANNUITY LIFE",
      "AAA",
       "1/1/2010",
       186432,
       "3,000,000",
       -6378.414286
    ],
    [
      "CMO",
       "US",
      "1/1/2001",
      "WIEDERAUFBAU FUER",
      "AAA",
       "1/1/2010",
       725591,
       "10,000,000",
       -10706.24143
    ],
    [
      "CORPORATES",
       "CA",
      "1/1/2001",
      "LLC FUNDING",
      "A",
       "1/1/2010",
       2878202,
       "24,000,000",
       -185291.7122
    ],
    [
      "CORPORATES",
       "UK",
      "1/1/2001",
      "CORP WHOLESALE",
      "A",
       "1/1/2010",
       2992264,
       "47,000,000",
       -61294.35625
    ],
    [
      "CORPORATES",
       "UK",
      "1/1/2001",
      "GSC3 TRUST",
      "A",
       "1/1/2010",
       2567154,
       "25,000,000",
       -67307.487
    ],
    [
      "CORPORATES",
       "KY",
      "1/1/2001",
      "MTG BCKD SECS 2005 FARGO",
      "A",
       "1/1/2010",
       865133,
       "37,000,000",
       -35456.52244
    ],
    [
      "CORPORATES",
       "US",
      "1/1/2001",
      "INC",
      "A",
       "1/1/2010",
       1128342,
       "1,000,000",
       2191.12
    ],
    [
      "CORPORATES",
       "US",
      "1/1/2001",
      "ASA INTERNATIONAL",
      "A",
       "1/1/2010",
       769318,
       "57,000,000",
       21574.09847
    ],
    [
      "CORPORATES",
       "US",
      "1/1/2001",
      "CAPITAL X FARGO",
      "A",
       "1/1/2010",
       438142,
       "26,000,000",
       -24720.84726
    ],
    [
      "CORPORATES",
       "US",
      "1/1/2001",
      "CASUALTY PPTY",
      "A",
       "1/1/2010",
       743091,
       "109,000,000",
       -14701.89591
    ],
    [
      "CORPORATES",
       "US",
      "1/1/2001",
      "CO EXPRESS",
      "A",
       "1/1/2010",
       517574,
       "33,000,000",
       13435.50651
    ],
    [
      "CORPORATES",
       "US",
      "1/1/2001",
      "COLOMBIA OF",
      "A",
       "1/1/2010",
       1676964,
       "7,000,000",
       53660.9725
    ]
  ];

 
  dataTable: any;

    gridConfig: any = {
      defaultColumnOptions: {
        searchable: true,
        sortable: true,
        filter: {
        enable: true,
        type: "conditional"
        }
      },
      rowOptions: {
        selection: {
        rowSelection: "multiple",
        enableSelectionCheckbox: true,
        }
      },
      pagination: {
        enable: true,
        showJumpToFirstPageButton: false,
        showJumpToLastPageButton: true,
        pageSize: {
        default: 10,
        options: true
        },
        showPages: {
        enable: true,
        showTotal: true,
        userInput: true
        }
      },
      columns: [
        {
          headerName: "Event",
          children: [
            {
              field: "AssetClass"
            },
            {
              field: "IssueCountry"
            }
          ]
        },
        {
          headerName: "Teams",
          children: [
            {
              field: "IssueDate"
            },
            {
              field: "Issuer"
            }
          ]
        },
        {
          headerName: "Classified",
          children: [
            {
              field: "RatingGrp"
            },
            {
              field: "UpdatedIssueDate"
            },
            {
              field: "BookValue"
            },
            {
              field: "MarketValue"
            },
            {
              field: "UnrealizedGainLoss"
            }
          ]
        }
      ]
    }

  constructor(private httpClient: HttpClient, private renderer: Renderer) {
    this.selectedCountry = 'Countries(All)';
    this.selectedClass = 'Assets Class(All)';
    this.selectedRatingGroup = 'Rating Groups(All)';
    this.totalInvestMent = KpiComponent.TotalInvestment('', '', '');
    this.rateOfReturn = KpiComponent.RateOfReturn('', '', '');
    if (CommonUtils.NumberFormat(this.rateOfReturn) === 0) {
      // this.rorClass = 'fc-kpi-arrow-contaier fas fa-long-arrow-alt-neutral';
      this.rateOfReturn = this.rateOfReturn.replace('-', '');
      this.rateOfReturn = this.rateOfReturn.replace('+', '');
    }/* else if (this.rateOfReturn.substring(0, 1) === '-') {
      this.rorClass = 'fc-kpi-arrow-contaier fas fa-long-arrow-alt-down';
      this.rateOfReturn = this.rateOfReturn.replace('-', '');
    } else {
      this.rorClass = 'fc-kpi-arrow-contaier fas fa-long-arrow-alt-up';
    } */
    this.investmentCount = KpiComponent.NumberOfInvestment('', '', '');
    this.countries = UiComponent.GetAllCountries();
    this.allRatinggroups = UiComponent.GetAllGroup();
    this.allAssetclass = UiComponent.GetAllClass();
    this.piechartdata = PieComponent.ChartJson('', '', '');
    this.linechartdata = LineComponent.ChartJson('', '', '');
    this.columnchartdata = ColumnComponent.ChartJson('', '', '');
    this.scatterchartdata = ScatterChartComponent.ChartJson('', '', '');
    this.worldmapdata = WorldMapComponent.ChartJson('', '', '');

    const dataStore = new FusionGrid.DataStore();
    this.dataTable = dataStore.createDataTable(this.data, this.schema, {
      enableIndex: false
    });
  }

  rendered($event: any) {
    console.log('here', $event);
  }


  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.InitializeSelectedClass();
  }
  onApplyFilter(): void {
    this.totalInvestMent = KpiComponent.TotalInvestment(this.selectedCountry, this.selectedClass, this.selectedRatingGroup);
    this.investmentCount = KpiComponent.NumberOfInvestment(this.selectedCountry, this.selectedClass, this.selectedRatingGroup);
    this.rateOfReturn = KpiComponent.RateOfReturn(this.selectedCountry, this.selectedClass, this.selectedRatingGroup);
    this.piechartdata = PieComponent.ChartJson(this.selectedCountry, this.selectedClass, this.selectedRatingGroup);
    this.linechartdata = LineComponent.ChartJson(this.selectedCountry, this.selectedClass, this.selectedRatingGroup);
    this.columnchartdata = ColumnComponent.ChartJson(this.selectedCountry, this.selectedClass, this.selectedRatingGroup);
    this.worldmapdata = WorldMapComponent.ChartJson(this.selectedCountry, this.selectedClass, this.selectedRatingGroup);
    this.scatterchartdata = ScatterChartComponent.ChartJson(this.selectedCountry, this.selectedClass, this.selectedRatingGroup);
    if (CommonUtils.NumberFormat(this.rateOfReturn) === 0) {
      // this.rorClass = 'fc-kpi-arrow-contaier fas fa-long-arrow-alt-neutral';
      this.rateOfReturn = this.rateOfReturn.replace('-', '');
      this.rateOfReturn = this.rateOfReturn.replace('+', '');
    }/* else if (this.rateOfReturn.substring(0, 1) === '-') {
      this.rorClass = 'fc-kpi-arrow-contaier fas fa-long-arrow-alt-down';
      this.rateOfReturn = this.rateOfReturn.replace('-', '');
    } else {
      this.rorClass = 'fc-kpi-arrow-contaier fas fa-long-arrow-alt-up';
    } */
  }
  onResetFilter(): void {
    this.totalInvestMent = KpiComponent.TotalInvestment('', '', '');
    this.investmentCount = KpiComponent.NumberOfInvestment('', '', '');
    this.rateOfReturn = KpiComponent.RateOfReturn('', '', '');
    this.piechartdata = PieComponent.ChartJson('', '', '');
    this.linechartdata = LineComponent.ChartJson('', '', '');
    this.columnchartdata = ColumnComponent.ChartJson('', '', '');
    this.worldmapdata = WorldMapComponent.ChartJson('', '', '');
    this.scatterchartdata = ScatterChartComponent.ChartJson('', '', '');
    this.selectedCountry = 'Countries(All)';
    this.selectedClass = 'Assets Class(All)';
    this.selectedRatingGroup = 'Rating Groups(All)';
    if (CommonUtils.NumberFormat(this.rateOfReturn) === 0) {
      // this.rorClass = 'fc-kpi-arrow-contaier fas fa-long-arrow-alt-neutral';
      this.rateOfReturn = this.rateOfReturn.replace('-', '');
      this.rateOfReturn = this.rateOfReturn.replace('+', '');
    }/* else if (this.rateOfReturn.substring(0, 1) === '-') {
      this.rorClass = 'fc-kpi-arrow-contaier fas fa-long-arrow-alt-down';
      this.rateOfReturn = this.rateOfReturn.replace('-', '');
    } else {
      this.rorClass = 'fc-kpi-arrow-contaier fas fa-long-arrow-alt-up';
    } */
  }
  PieChange(chart) {
    if (chart === 'pie2d') {
      const ctlid = 'toggle-pie';
      const addClass = 'fc-pie-selected-icon';
      const removeClass = 'fc-pie-icon';
      const addClassToggle = 'fc-column-icon';
      const removeClassToggle = 'fc-column-selected-icon';

      this.AddSelectedClass(ctlid, event.target, addClass, removeClass, addClassToggle, removeClassToggle);
    } else {
      const ctlid = 'pie';
      const addClass = 'fc-column-selected-icon';
      const removeClass = 'fc-column-icon';
      const addClassToggle = 'fc-pie-icon';
      const removeClassToggle = 'fc-pie-selected-icon';

      this.AddSelectedClass(ctlid, event.target, addClass, removeClass, addClassToggle, removeClassToggle);

    }
    PieComponent.ChangeType(chart);
  }
  PieInitialized($event) {
    PieComponent.Initialized($event);
  }
  InitializeSelectedClass() {
    const controls: string[] = ['line', 'column', 'pie', 'scatter'];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < controls.length; i++) {
      const ctl = document.getElementById(controls[i]);
      this.renderer.setElementClass(ctl, 'fc-' + controls[i] + '-selected-icon', true);
    }
  }
  AddSelectedClass(ctrl, target, addClass, removeClass, addClassToToggle, removeClassToToggle) {
    const ctl = document.getElementById(ctrl);
    this.renderer.setElementClass(event.target, addClass, true);
    this.renderer.setElementClass(event.target, removeClass, false);
    this.renderer.setElementClass(ctl, addClassToToggle, true);
    this.renderer.setElementClass(ctl, removeClassToToggle, false);
  }
  LineChange(chart) {
    if (chart === 'line') {
      const ctlid = 'toggle-line';
      const addClass = 'fc-line-selected-icon';
      const removeClass = 'fc-line-icon';
      const addClassToggle = 'fc-column-icon';
      const removeClassToggle = 'fc-column-selected-icon';

      this.AddSelectedClass(ctlid, event.target, addClass, removeClass, addClassToggle, removeClassToggle);
    } else {
      const ctlid = 'line';
      const addClass = 'fc-column-selected-icon';
      const removeClass = 'fc-column-icon';
      const addClassToggle = 'fc-line-icon';
      const removeClassToggle = 'fc-line-selected-icon';

      this.AddSelectedClass(ctlid, event.target, addClass, removeClass, addClassToggle, removeClassToggle);

    }
    LineComponent.ChangeType(chart);
  }
  LineInitialized($event) {
    LineComponent.Initialized($event);
  }

  ColumnChange(chart) {
    if (chart === 'column2d') {
      const ctlid = 'toggle-column';
      const addClass = 'fc-column-selected-icon';
      const removeClass = 'fc-column-icon';
      const addClassToggle = 'fc-pie-icon';
      const removeClassToggle = 'fc-pie-selected-icon';

      this.AddSelectedClass(ctlid, event.target, addClass, removeClass, addClassToggle, removeClassToggle);
    } else {
      const ctlid = 'column';
      const addClass = 'fc-pie-selected-icon';
      const removeClass = 'fc-pie-icon';
      const addClassToggle = 'fc-column-icon';
      const removeClassToggle = 'fc-column-selected-icon';

      this.AddSelectedClass(ctlid, event.target, addClass, removeClass, addClassToggle, removeClassToggle);

    }
    ColumnComponent.ChangeType(chart);
  }
  ColumnInitialized($event) {
    ColumnComponent.Initialized($event);
  }

  ScatterChange(chart) {
    if (chart === 'scatter') {
      this.scatterChartHeader = 'Market Value Vs Book Value by Rating Group';
      const ctlid = 'bubble';
      const addClass = 'fc-scatter-selected-icon';
      const removeClass = 'fc-scatter-icon';
      const addClassToggle = 'fc-bubble-icon';
      const removeClassToggle = 'fc-bubble-selected-icon';

      this.AddSelectedClass(ctlid, event.target, addClass, removeClass, addClassToggle, removeClassToggle);
    } else {
      this.scatterChartHeader = 'Market Value,Book Value and Revenue by Rating Group';
      const ctlid = 'scatter';
      const addClass = 'fc-bubble-selected-icon';
      const removeClass = 'fc-bubble-icon';
      const addClassToggle = 'fc-scatter-icon';
      const removeClassToggle = 'fc-scatter-selected-icon';

      this.AddSelectedClass(ctlid, event.target, addClass, removeClass, addClassToggle, removeClassToggle);

    }
    this.scatterchartdata = ScatterChartComponent.ChangeType(chart, this.selectedCountry, this.selectedClass, this.selectedRatingGroup);
  }
  ScatterInitialized($event) {
    ScatterChartComponent.Initialized($event);
  }

}




