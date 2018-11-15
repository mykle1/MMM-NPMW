## MMM-NPMW

**Weather using NPM package weather**

I just didn't feel like making WWI display both ways.
So this is designed for top or bottom bar position.

## Why would you use this module?

* You don't need an API key
* You like the stupid ticker style scrolling
* You hate icons.
* I begged you. **:^)**

## Examples

No picture. Just imagine a thin line of text in your top or bottom bar.

Or better yet, take a minute and install it. :-)

## Installation and requirements

* `git clone https://github.com/mykle1/MMM-NPMW` into the `~/MagicMirror/modules` directory.

* `cd MMM-NPMW` and run `npm install`

* No dependencies needed! No kidding!


## Config.js entry and options

    {
      module: "MMM-NPMW",
  		position: "top_bar",	// This can be any of the regions.
      config: {
          tempUnits: "F",		                      // C and km or F and miles
          cityStateOrZip: "10001",
          useHeader: false,                         // true if you want a header
          header: "NPM-Weather",          // Any text you want. useHeader must be true
          maxWidth: "100%",
          animationSpeed: 3000,
          initialLoadDelay: 4250,
          retryDelay: 2500,
          updateInterval: 60 * 1000,
		}
	},
