/* Magic Mirror
 * Module: MMM-NPMW
 * npm package weather-js. Uses weather.service.msn.com
 * By Mykle1
 * MIT Licensed
 */

const NodeHelper = require('node_helper');
const request = require('request');
var weather = require('weather-js');

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },
    
 
    // Options:
    // search:     location name or zipcode
    // degreeType: F or C
    
    getNPMW: function(url) {
        
        var self = this;
 
        weather.find({search: this.config.cityStateOrZip, degreeType: this.config.tempUnits}, function(err, result) {
      if(err) console.log(err);
 
//        console.log(JSON.stringify(result, null, 2));
          self.sendSocketNotification("NPMW_RESULT", result);  
    });

},
    

    socketNotificationReceived: function(notification, payload) {
        if(notification === 'CONFIG'){
          this.config = payload;
      } else if (notification === 'GET_NPMW') {
            this.getNPMW(payload);
        }
    },
});
