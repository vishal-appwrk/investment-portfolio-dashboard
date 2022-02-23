// @ts-ignore
import { FilterData } from '../Data/DataFilter';
import { CommonUtils } from '../Data/CommonUtils';

export class PieComponent {
    static chartObj: any;
    static chart: any = 'pie2d';
    private static chartConfig  = {
        numberPrefix: '$',
        decimals: '0',
        forceDecimals: '1',
        forceNumberScale: '1',
        numberScaleUnit: 'M',
        numberScaleValue: '1000000',
        yaxisvaluedecimals: '0',
        theme: 'fusion'
    };
    private static GenerateAssetClassWiseInvestment(country: string, asset: string, group: string): {} {
        // tslint:disable-next-line:prefer-const
        let itemArray = {};
        // tslint:disable-next-line:prefer-const
        let data = FilterData.Filter(country, asset, group);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
            // tslint:disable-next-line:prefer-const
            let assetClass = data[i].AssetClass;
            if (itemArray[assetClass] === undefined) {
                // tslint:disable-next-line:max-line-length
                itemArray[assetClass] = data[i].BookValue + CommonUtils.NumberFormat(data[i].MarketValue);
            } else {
                // tslint:disable-next-line:max-line-length
                itemArray[assetClass] += data[i].BookValue + CommonUtils.NumberFormat(data[i].MarketValue);
            }
        // itemArray.push(DataObj['RatingGrp'],(parseInt(DataObj['BookValue']) + parseInt(DataObj['MarketValue'])));
        }
        return itemArray;
    }
    private static GeneratePieData(country: string, asset: string, group: string): any {
        // tslint:disable-next-line:prefer-const
        let rawData = this.GenerateAssetClassWiseInvestment(country, asset, group);
        // tslint:disable-next-line:prefer-const
        let dataObj = [];
        for (const key in rawData) {
            if (rawData.hasOwnProperty(key)) {
                dataObj.push({
                    label : key,
                    tooltext: '<div>In Asset Class <b>$Label</b>{br}Total Investment is <b>$datavalue</b></div>',
                    value : rawData[key]
                });
            }
        }
        return dataObj;
    }

    static ChartJson(country: string, asset: string, group: string): any {
        let chartObj = {};
        chartObj = {
            chart : PieComponent.chartConfig,
            data : PieComponent.GeneratePieData(country, asset, group)
        };
        return chartObj;
    }
    static ChangeType(chart) {
        this.chart = chart;
        this.chartObj.chartType(chart); // Changing chart type using chart instance
    }
    static Initialized($event) {
        this.chartObj = $event.chart;
    }



}
