import { CommonUtils } from '../Data/CommonUtils';
declare var originalData: any;
declare var mapCode: any;
export class UiComponent {
    static GetAllCountries(): string[] {
        // tslint:disable-next-line:prefer-const
        let countries: string[];
        let countryLabel: string;
        // tslint:disable-next-line:prefer-for-of
        countries = [];
        countries.push('Countries(All)');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < originalData.length; i++) {
            countryLabel = CommonUtils.GetLabel(originalData[i].IssueCountry);
            if (countries.indexOf(countryLabel) < 0) {
                countries.push(countryLabel);
                console.log(originalData[i].IssueCountry + ' ' + countryLabel);
            }
        }
        return countries;
    }
    static GetAllClass(): string[] {
      // tslint:disable-next-line:prefer-const
      let assets: string[];
      assets = [];
      assets.push('Assets Class(All)');
        // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < originalData.length; i++) {
          if (assets.indexOf(originalData[i].AssetClass) < 0) {
            assets.push(originalData[i].AssetClass);
          }
      }
      return assets;
    }

    static GetAllGroup(): string[] {
        // tslint:disable-next-line:prefer-const
        let groups: string[];
        groups = [];
        groups.push('Rating Groups(All)');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < originalData.length; i++) {
            if (groups.indexOf(originalData[i].RatingGrp) < 0) {
                groups.push(originalData[i].RatingGrp);
            }
        }
      //  groups = groups.sort();
        return groups;
    }
}
