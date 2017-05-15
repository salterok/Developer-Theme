/*
 * @Author: salterok 
 * @Date: 2017-05-15 14:58:54 
 * @Last Modified by: salterok
 * @Last Modified time: 2017-05-15 15:04:34
 */

import "./assets/less/styles.less";
import { ProfileData } from "./ProfileData";
const data = require("data.json");

const content = require("./content.ejs");

document.body.innerHTML = content({
    data: new ProfileData(data)
});
