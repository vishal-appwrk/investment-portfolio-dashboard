import { CommonUtils } from './CommonUtils';

declare var originalData: any;
export class FilterData {
    static Filter(country: string, asset: string, group: string): any {
        if (country === 'Countries(All)') {
            country = '';
        }
        if (asset === 'Assets Class(All)') {
            asset = '';
        }
        if (group === 'Rating Groups(All)') {
            group = '';
        }
        // tslint:disable-next-line:prefer-const
        let filteredData = [];
        country = CommonUtils.GetCode(country);
        // tslint:disable-next-line:prefer-for-of
        for ( let i = 0; i < originalData.length; i++) {
            // tslint:disable-next-line:max-line-length
            if ((originalData[i].AssetClass === asset || asset === '' || typeof(asset) === 'undefined') && (originalData[i].RatingGrp === group || group === '' || typeof(group) === 'undefined') && (originalData[i].IssueCountry === country || country === '' || typeof(country) === 'undefined') && CommonUtils.GetYearComponent(originalData[i].UpdatedIssueDate).toString().trim() !== '2016') {
                filteredData.push(originalData[i]);
            }
        }
        return filteredData;

    }

}
