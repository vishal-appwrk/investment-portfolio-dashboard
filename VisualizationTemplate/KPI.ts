import { CommonUtils } from '../Data/CommonUtils';
import { FilterData } from '../Data/DataFilter';
declare var originalData: any;
export class KpiComponent {
    private static investedAmount: number;
    static TotalInvestment(country: string, asset: string, group: string): string {
        // tslint:disable-next-line:prefer-for-of
        let investment: number;
        investment = 0;
        // tslint:disable-next-line:prefer-const
        let data = FilterData.Filter(country, asset, group);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
            investment += data[i].BookValue + CommonUtils.NumberFormat(data[i].MarketValue);

        }
        investment = investment / 1000000;
        if (investment > 100) {
            investment = +(investment.toFixed(0));

        } else {
            investment = +(investment.toFixed(2));
        }
        KpiComponent.investedAmount = +investment;
        return '$' + investment.toLocaleString() + 'M';
    }
    static NumberOfInvestment(country: string, asset: string, group: string): number {
        // tslint:disable-next-line:prefer-const
        let data = FilterData.Filter(country, asset, group);
        return data.length;
    }
    static RateOfReturn(country: string, asset: string, group: string): string {
        const data = FilterData.Filter(country, asset, group);
        // tslint:disable-next-line:prefer-const
      //  let totalInvestment = KpiComponent.TotalInvestment(country, asset, group);
        if (KpiComponent.investedAmount === 0) {
            return 0 + '%';
        }
        let totalProfit: number;
        totalProfit = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0 ; i < data.length; i++) {
            totalProfit += data[i].UnrealizedGainLoss;
        }
        totalProfit = totalProfit / 10000;
      //  let investment = CommonUtils.NumberFormat(totalInvestment);
        // tslint:disable-next-line:prefer-const
        let rateOfReturn = (totalProfit  / (KpiComponent.investedAmount ) * 100).toFixed(2);
        return  rateOfReturn + '%';
    }
}
