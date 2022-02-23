// @ts-ignore
import { FilterData } from '../Data/DataFilter';
import { CommonUtils } from '../Data/CommonUtils';
export class LineComponent {
    static chartObj: any;
    static chart: any = 'line';
    private static chartConfig  = {
        numberPrefix: '$',
        decimals: '0',
        forceDecimals: '1',
        forceNumberScale: '1',
        numberScaleUnit: 'M',
        numberScaleValue: '1000000',
        yaxisvaluedecimals: '0',
        plottooltext: '<div>Total Invested Amount in the Year <b>$Label</b> is <b>$datavalue</b></div>',
        theme: 'fusion'
    };
    private static GenerateYearlyInvestment(country: string, asset: string, group: string): {} {
        // tslint:disable-next-line:prefer-const
        let itemArray = {};
        // tslint:disable-next-line:prefer-const
        let data = FilterData.Filter(country, asset, group);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
            // tslint:disable-next-line:prefer-const
            let year = CommonUtils.GetYearComponent(data[i].UpdatedIssueDate).toString().trim();
            if (itemArray[year] === undefined) {
                // tslint:disable-next-line:max-line-length
                itemArray[year] = data[i].BookValue + CommonUtils.NumberFormat(data[i].MarketValue);
            } else {
                // tslint:disable-next-line:max-line-length
                itemArray[year] += data[i].BookValue + CommonUtils.NumberFormat(data[i].MarketValue);
            }
        }
        return itemArray;
    }
    private static GenerateLineData(country: string, asset: string, group: string): any {
        // tslint:disable-next-line:prefer-const
        let rawData = this.GenerateYearlyInvestment(country, asset, group);
        // tslint:disable-next-line:prefer-const
        let dataObj = [];
        for (const key in rawData) {
            if (rawData.hasOwnProperty(key)) {
                dataObj.push({
                    label : key,
                    value : rawData[key]
                });
            }
        }
        return dataObj;
    }

    static ChartJson(country: string, asset: string, group: string): any {
        let chartObj = {};
        chartObj = {
            chart : LineComponent.chartConfig,
            data : LineComponent.GenerateLineData(country, asset, group)
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
