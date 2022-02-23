// @ts-ignore
import { FilterData } from '../Data/DataFilter';
import { CommonUtils } from '../Data/CommonUtils';

export class WorldMapComponent {
    private static chartConfig  = {
        showLegend: false,
        theme: 'fusion',
        tooltipbgcolor: '#FFFFFF',
        tooltipbordercolor: '#CCCCCC',
        showentitytooltip: '0',
        showentityhovereffect: '0',
        showlabels: '0',
        nullEntityAlpha: '75',
        fillAlpha: '100',
        showToolTip: false,
        entityfillhovercolor: '#FFF9C4',
        nullentitycolor: '#EAEAF5',
        numberPrefix: '$',
        decimals: '0',
        forceDecimals: '1',
        forceNumberScale: '1',
        numberScaleUnit: 'M',
        numberScaleValue: '1000000'
    };
    private static colorConfig = {
        gradient: '0',
        color: [
            {
                minvalue: '0',
                // maxvalue: '100000',
                code: '#5d62b5'// 5d62b5
            }
           /* {
                minvalue: '100000',
                code: '#5d62b5'// BBDEFB
            } */
        ]
    };
    private static GenerateAssetClassWiseInvestment(country: string, asset: string, group: string): {} {
        // tslint:disable-next-line:prefer-const
        let itemArray = {};
        // tslint:disable-next-line:prefer-const
        let data = FilterData.Filter(country, asset, group);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
            // tslint:disable-next-line:prefer-const
            let cntry = CommonUtils.GetID(data[i].IssueCountry);
            if (itemArray[cntry] === undefined) {
                // tslint:disable-next-line:max-line-length
                itemArray[cntry] = data[i].BookValue + CommonUtils.NumberFormat(data[i].MarketValue);
            } else {
                // tslint:disable-next-line:max-line-length
                itemArray[cntry] += data[i].BookValue + CommonUtils.NumberFormat(data[i].MarketValue);
            }
        }
        return itemArray;
    }
    private static GenerateWorldMapData(country: string, asset: string, group: string): any {
        // tslint:disable-next-line:prefer-const
        let rawData = this.GenerateAssetClassWiseInvestment(country, asset, group);
        // tslint:disable-next-line:prefer-const
        let dataObj = [];
        for (const key in rawData) {
            if (rawData.hasOwnProperty(key)) {
                dataObj.push({
                    id : key,
                    value : rawData[key],
                    showToolTip: true,
                    tooltext: '<div>Total Investment in <b>$lName</b> is <b>$dataValue</b></div>',
                });
            }
        }
        return dataObj;
    }

    static ChartJson(country: string, asset: string, group: string): any {
        let chartObj = {};
        chartObj = {
            chart : WorldMapComponent.chartConfig,
            colorrange: WorldMapComponent.colorConfig,
            data : WorldMapComponent.GenerateWorldMapData(country, asset, group)
        };
        return chartObj;
    }



}
