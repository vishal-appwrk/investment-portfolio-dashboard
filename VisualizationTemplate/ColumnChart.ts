// @ts-ignore
import { FilterData } from '../Data/DataFilter';
import { CommonUtils } from '../Data/CommonUtils';
export class ColumnComponent {
    static chartObj: any;
    static chart: any = 'column2d';
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
    private static GenerateRatingGroupWiseInvestment(country: string, asset: string, group: string): {} {
        // tslint:disable-next-line:prefer-const
        let itemArray = {};
        // tslint:disable-next-line:prefer-const
        let data = FilterData.Filter(country, asset, group);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
            // tslint:disable-next-line:prefer-const
            let grp = data[i].RatingGrp;
            if (itemArray[grp] === undefined) {
                    // tslint:disable-next-line:max-line-length
                    itemArray[grp] = data[i].BookValue + CommonUtils.NumberFormat(data[i].MarketValue);
            } else {
                // tslint:disable-next-line:max-line-length
                itemArray[grp] += data[i].BookValue + CommonUtils.NumberFormat(data[i].MarketValue);
            }
        }
        return itemArray;
    }
    private static GenerateColumnData(country: string, asset: string, group: string): any {
        // tslint:disable-next-line:prefer-const
        let rawData = this.GenerateRatingGroupWiseInvestment(country, asset, group);
        // tslint:disable-next-line:prefer-const
        let dataObj = [];
        for (const key in rawData) {
            if (rawData.hasOwnProperty(key)) {
                dataObj.push({
                    label : key,
                    value : rawData[key],
                    toolText : '<div>Total Invested Amount in Rating Group <b>$Label</b> is <b>$datavalue</b></div>',
                });
            }
        }
        return dataObj;
    }

    static ChartJson(country: string, asset: string, group: string): any {
        let chartObj = {};
        chartObj = {
            chart : ColumnComponent.chartConfig,
            data : ColumnComponent.GenerateColumnData(country, asset, group)
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
