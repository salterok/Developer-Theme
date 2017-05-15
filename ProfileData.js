/*
 * @Author: salterok 
 * @Date: 2017-05-15 14:58:47 
 * @Last Modified by: salterok
 * @Last Modified time: 2017-05-15 16:55:11
 */

import * as _ from "lodash" ;

export class ProfileData {
    constructor(data) {
        this.profile = {
            get fullName() { 
                return this.firstName + " " + this.lastName 
            },
            get location() {
                return this.address.city + ", " + this.address.countryCode;
            }
        };

        this.about = {
            get html() {
                return this.lines.map(l => "<p>" + l + "</p>").join("");
            }
        };

        _.merge(this, data);
    }

}