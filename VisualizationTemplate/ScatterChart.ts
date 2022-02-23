// @ts-ignore
import { FilterData } from '../Data/DataFilter';
import { CommonUtils } from '../Data/CommonUtils';

export class ScatterChartComponent {
    static chartObj: any;
    static chart: any = 'scatter';
    private static colorCode = ['#5d62b5', '#afafaf', '#f2726f', '#ffc533', '#62b58f', '#8786A4', '#67cdf2' , '#173CBA'];
    private static chartConfig = {
        xAxisName: 'Market Value',
        yAxisName: 'Book Value (In USD)',
        anchorSides: '0',
        numberPrefix: '$',
        decimals: '0',
        forceDecimals: '1',
        forceNumberScale: '1',
        numberScaleUnit: 'M',
        numberScaleValue: '1000000',
        yaxisvaluedecimals: '0',
        paletteColors: ScatterChartComponent.colorCode,
        // tslint:disable-next-line:max-line-length
        plottooltext: '<div>In Rating Group <b>$seriesName</b> Market Value is <b>$xdataValue</b> <br>and Book Value is <b>$ydataValue</b></div>',
        theme: 'fusion'
    };
    private static RatingGroupWiseMarketValVsBookValue(country: string, asset: string, group: string): {} {
        // tslint:disable-next-line:prefer-const
        let itemArray = {};
        // tslint:disable-next-line:prefer-const
        let data = FilterData.Filter(country, asset, group);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
           // tslint:disable-next-line:prefer-const
           let ratingGrp = data[i].RatingGrp;
           if (itemArray[ratingGrp] === undefined) {
                itemArray[ratingGrp] = {
                    MarketValue: CommonUtils.NumberFormat(data[i].MarketValue),
                    BookValue: data[i].BookValue,
                };
           } else {
                // tslint:disable-next-line:no-unused-expression
                itemArray[ratingGrp].MarketValue += parseFloat(CommonUtils.NumberFormat(data[i].MarketValue));
                // tslint:disable-next-line:no-unused-expression
                itemArray[ratingGrp].BookValue += data[i].BookValue;
           }
            // itemArray.push(DataObj["RatingGrp"],(parseInt(DataObj["BookValue"]) + parseInt(DataObj["MarketValue"])));
        }
        return itemArray;
    }
    private static RatingGroupWiseMarketValVsRevenueVsBookValue(country: string, asset: string, group: string): {} {
        // tslint:disable-next-line:prefer-const
        let itemArray = {};
        // tslint:disable-next-line:prefer-const
        let data = FilterData.Filter(country, asset, group);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
           // tslint:disable-next-line:prefer-const
           let ratingGrp = data[i].RatingGrp;
           if (itemArray[ratingGrp] === undefined) {
                itemArray[ratingGrp] = {
                    MarketValue: CommonUtils.NumberFormat(data[i].MarketValue),
                    Profit: data[i].UnrealizedGainLoss,
                    BookValue: data[i].BookValue
                };
           } else {
                // tslint:disable-next-line:no-unused-expression
                itemArray[ratingGrp].MarketValue += parseFloat(CommonUtils.NumberFormat(data[i].MarketValue));
                // tslint:disable-next-line:no-unused-expression
                itemArray[ratingGrp].Profit += data[i].UnrealizedGainLoss;
                itemArray[ratingGrp].BookValue += data[i].BookValue;
           }
            // itemArray.push(DataObj["RatingGrp"],(parseInt(DataObj["BookValue"]) + parseInt(DataObj["MarketValue"])));
        }
        return itemArray;
    }
    private static GetBubbleData(country: string, asset: string, group: string): any {
        // tslint:disable-next-line:prefer-const
        let rawData = this.RatingGroupWiseMarketValVsRevenueVsBookValue(country, asset, group);
        // tslint:disable-next-line:prefer-const
        let dataObj = [];
        // tslint:disable-next-line:prefer-const
        let dataset = [];
        // tslint:disable-next-line:forin
        for (const key in rawData) {
            dataObj = [];
            if (rawData.hasOwnProperty(key)) {
                dataObj.push({
                    x: rawData[key].MarketValue,
                    y: rawData[key].BookValue ,
                    z: rawData[key].Profit,
                    color: ScatterChartComponent.colorCode[dataset.length]
                });
                dataset.push({
                    seriesname: key,
                    showregressionline: '1',
                    showverticalline: '1',
                    data: dataObj
                });
            }
        }
        // tslint:disable-next-line:prefer-const
        let catObj = [];
        for (const key in rawData) {
            if (rawData.hasOwnProperty(key)) {
                catObj.push({
                    x: rawData[key].MarketValue,
                    label : (rawData[key].MarketValue) + '$',
                    showverticalline: '0'
                });
            }
        }
        let tupple = {};
        tupple = {
            category: catObj,
            datasetObj: dataset
        };
        return tupple;
    }
    private static GetScatterData(country: string, asset: string, group: string): any {
        // tslint:disable-next-line:prefer-const
        let rawData = this.RatingGroupWiseMarketValVsBookValue(country, asset, group);
        // tslint:disable-next-line:prefer-const
        let dataObj = [];
        // tslint:disable-next-line:prefer-const
        let dataset = [];
        // tslint:disable-next-line:forin
        for (const key in rawData) {
            dataObj = [];
            if (rawData.hasOwnProperty(key)) {
                dataObj.push({
                    x: rawData[key].MarketValue,
                    y: rawData[key].BookValue
                });
                dataset.push({
                    seriesname: key,
                    showregressionline: '1',
                    data: dataObj,
                    anchorbgcolor: ScatterChartComponent.colorCode[dataset.length]
                });
            }
        }
        // tslint:disable-next-line:prefer-const
        let catObj = [];
        for (const key in rawData) {
            if (rawData.hasOwnProperty(key)) {
                catObj.push({
                    x: rawData[key].MarketValue ,
                    label : (rawData[key].MarketValue ) + '$',
                    showverticalline: '0'
                });
            }
        }
        let tupple = {};
        tupple = {
            category: catObj,
            datasetObj: dataset
        };
        return tupple;
    }
    static ChartJson(country: string, asset: string, group: string): any {
        if (this.chart === 'bubble') {
           return ScatterChartComponent.BubbleJson(country, asset, group);
        } else {
          return ScatterChartComponent.ScatterJson(country, asset, group);
        }
    }
    private static ScatterJson(country: string, asset: string, group: string): any {
        let chartConfigObj = {};
        // tslint:disable-next-line:prefer-const
        let dataObj = ScatterChartComponent.GetScatterData(country, asset, group);

       // ScatterChartComponent.chartConfig.yAxisName = 'Book Value (in USD)';
        // tslint:disable-next-line:max-line-length
        ScatterChartComponent.chartConfig.plottooltext = '<div>In Rating Group <b>$seriesName</b> Market Value is <b>$xdataValue</b> <br>and Book Value is <b>$ydataValue</b></div>',
        chartConfigObj = {
            chart : ScatterChartComponent.chartConfig,
            categories: {category: dataObj.category},
            dataset : dataObj.datasetObj
        };
        return chartConfigObj;
    }
    private static BubbleJson(country: string, asset: string, group: string): any {
        let chartConfigObj = {};
        // tslint:disable-next-line:prefer-const
        let dataObj = ScatterChartComponent.GetBubbleData(country, asset, group);
        // ScatterChartComponent.chartConfig.yAxisName = 'Book Value';
        // tslint:disable-next-line:max-line-length
        ScatterChartComponent.chartConfig.plottooltext = '<div>In Rating Group <b>$seriesName</b> Market Value is <b>$xdataValue</b> <br>Book Value is <b>$ydataValue</b> <br>and Profit/Loss is <b>$zdataValue</b></div>',
        chartConfigObj = {
            chart : ScatterChartComponent.chartConfig,
            categories: {category: dataObj.category},
            dataset : dataObj.datasetObj
        };
        return chartConfigObj;
    }
    static ChangeType(chart, country, asset, group): any {
        this.chart = chart;
        this.chartObj.chartType(chart);
        if (chart === 'bubble') {
           return ScatterChartComponent.BubbleJson(country, asset, group);
        } else {
           return ScatterChartComponent.ScatterJson(country, asset, group);
        }
    }
    static Initialized($event) {
        this.chartObj = $event.chart;
    }
}
