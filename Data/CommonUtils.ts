declare var mapCode: any;
export class CommonUtils {
    private static ConvertToMillion(value: number): number {
        if (Math.abs(value) < 10) {
            return value / 1000000;
        } else if (Math.abs(value) < 100) {
            return value / 100000;
        } else if ( Math.abs(value) < 1000) {
            return value / 10000;
        } else if ( Math.abs(value) < 10000) {
            return value / 1000;
        } else if (Math.abs(value) < 100000) {
            return value / 100;
        } else if (Math.abs(value) < 1000000) {
            return value / 10;
        } else {
            return value;
        }

    }
    private static ConvertFromMillion(value: number): number {
        if (value < 10) {
            return value *   1000000;
        } else if (Math.abs(value) < 100) {
            return value * 100000;
        } else if ( Math.abs(value) < 1000) {
            return value * 10000;
        } else if ( Math.abs(value) < 10000) {
            return value * 1000;
        } else if (Math.abs(value) < 100000) {
            return value * 100;
        } else if (Math.abs(value) < 1000000) {
            return value * 10;
        } else {
            return value;
        }
    }
    static NumberFormat(value: string): any {
        value = value.toString().replace(new RegExp(',', 'g'), '');
        return (+value);

    }
    static GetYearComponent(dateString): number {
        // tslint:disable-next-line:prefer-const
        let year = dateString.split('/');
        return year[year.length - 1];
    }
    static GetID(value: string): number {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < mapCode.length; i++) {
            if (mapCode[i].Shortlabel === value || mapCode[i].Label === value) {
                 return mapCode[i].ID;
            }
        }
     }
     static GetLabel(value: string): string {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < mapCode.length; i++) {
            if (mapCode[i].Shortlabel === value || mapCode[i].ID === value) {
                 return mapCode[i].Label;
            }
        }
     }
     static GetCode(value: string): string {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < mapCode.length; i++) {
            if (mapCode[i].Label === value || mapCode[i].ID === value) {
                 return mapCode[i].Shortlabel;
            }
        }
     }
}
