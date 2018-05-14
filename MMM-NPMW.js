/* Magic Mirror
 * Module: MMM-NPMW
 * NPM Weather using npm package weather.js
 * By Mykle1
 * MIT Licensed
 */
Module.register("MMM-NPMW", {

    // Module config defaults.
    defaults: {
		tempUnits: "C",		                      // C and km or F and miles 
        useHeader: false,                         // true if you want a header      
        header: "NPM-Weather",          // Any text you want. useHeader must be true
        maxWidth: "300px",
        animationSpeed: 3000,
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 5 * 60 * 1000,

    },

    getStyles: function() {
        return ["MMM-NPMW.css"];
    },


    start: function() {
        Log.info("Starting module: " + this.name);


        //  Set locale.
        this.NPMW = {};
        this.scheduleUpdate();
    },

    getDom: function() {
		

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = "Predicting weather";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "light");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }
        
        var NPMW = this.NPMW;
        
		// summary of weather at this moment
        var summary = document.createElement("div");
        summary.classList.add("small", "bright", "summary");
	    summary.innerHTML =
                '<marquee behavior="scroll" direction="left" scrollamount="3">'
                + NPMW[0].current.skytext + " right now"
                + " and " + NPMW[0].current.temperature 
                + "°F at " + moment().local().format("h:mm A") + " . &nbsp "
                + " Feels like " +  NPMW[0].current.feelslike  + "°F. &nbsp "
                + " " + NPMW[0].current.humidity + "% humidity. &nbsp "
                + " " + NPMW[0].current.winddisplay + " wind. &nbsp"
            
            
                + " " + NPMW[0].forecast[2].day + " ~ " + NPMW[0].forecast[2].skytextday + ", &nbsp "
                + " " + NPMW[0].forecast[2].high + "/" + NPMW[0].forecast[2].low
                + " " + "with a " + NPMW[0].forecast[2].precip + "% chance of precip. &nbsp "
                
                + " " + NPMW[0].forecast[3].day + " ~ " + NPMW[0].forecast[3].skytextday + ", &nbsp "
                + " " + NPMW[0].forecast[3].high + "/" + NPMW[0].forecast[3].low
                + " " + "with a " + NPMW[0].forecast[3].precip + "% chance of precip. &nbsp "
                
                + " " + NPMW[0].forecast[4].day + " ~ " + NPMW[0].forecast[4].skytextday + ", &nbsp "
                + " " + NPMW[0].forecast[4].high + "/" + NPMW[0].forecast[4].low
                + " " + "with a " + NPMW[0].forecast[4].precip + "% chance of precip. &nbsp "
                
                +'</marquee>';
            
			wrapper.appendChild(summary);

        return wrapper;
		
    },
	

    processNPMW: function(data) {
        this.NPMW = data;
        console.log(this.NPMW);
        this.loaded = true;
    },
    

    scheduleUpdate: function() {
        setInterval(() => {
            this.getNPMW();
        }, this.config.updateInterval);
        this.getNPMW(this.config.initialLoadDelay);
    },

    getNPMW: function() {
        this.sendSocketNotification('GET_NPMW', this.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "NPMW_RESULT") {
            this.processNPMW(payload);

            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});