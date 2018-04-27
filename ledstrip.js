#!/usr/bin/env node

//console.log("\x1b[0m");

var debug = process.argv[2]

var hue = require("node-hue-api");
var HueApi = require("node-hue-api").HueApi;
var hostname = "192.168.0.101",
username = "SdIlXGmbkKDtkdIQGNudKHYZ8LGmouMFi0v5AO9t",
api = new HueApi(hostname, username);

var exec = require('child_process').exec;

// Variables for Colored messages
const colors = {
	//General
    Reset: "\x1b[0m", Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
	
	//Font Color
    Black: "\x1b[30m",   	fgBlack: "\x1b[30m",		fgDarkGray: "\x1b[39m",
    Red: "\x1b[31m",     	fgRed: "\x1b[31m",          fgLightRed: "\x1b[91m",
    Green: "\x1b[32m",   	fgGreen: "\x1b[32m",        fgLightGreen: "\x1b[92m",
    Yellow: "\x1b[33m",  	fgYellow: "\x1b[33m",       fgLightYellow: "\x1b[93m",
    Blue: "\x1b[34m",    	fgBlue: "\x1b[34m",         fgLightBlue: "\x1b[94m",
    Magenta: "\x1b[35m", 	fgMagenta: "\x1b[35m",      fgLightMagenta: "\x1b[95m",
    Cyan: "\x1b[36m",    	fgCyan: "\x1b[36m",         fgLightCyan: "\x1b[96m",
    LightGray: "\x1b[37m",	fgLightGray: "\x1b[37m",    fgWhite: "\x1b[97m",
    Crimson: "\x1b[38m", 	fgCrimson: "\x1b[38m",
							fgDefault: "\x1b[39m",
					
	//Background Color
    bgBlack: "\x1b[40m",	bgDarkGray: "\x1b[100m",
    bgRed: "\x1b[41m",      bgLightRed: "\x1b[101m",
    bgGreen: "\x1b[42m",    bgLightGreen: "\x1b[102m",
    bgYellow: "\x1b[43m",   bgLightYellow: "\x1b[103m",
    bgBlue: "\x1b[44m",     bgLightBlue: "\x1b[104m",
    bgMagenta: "\x1b[45m",  bgLightMagenta: "\x1b[105m",
    bgCyan: "\x1b[46m",     bgLightCyan: "\x1b[106m",
    bgWhite: "\x1b[47m",
    bgCrimson: "\x1b[48m",
	bgDefault: "\x1b[49m",

};

const colorName = [colors.Red, colors.Green, colors.Blue];

var cLogSTDout = function(msg) { process.stdout.write(msg); };

function cLogSTDColor(color = colors.Reset, msg) {
    cLogSTDout(color + msg + colors.Reset);
};

var iCounter = 0;
var iTickRateDefault = 150;
var iTickrate = iTickRateDefault;
const iTickRateMin = 100;
const iTickRateMax = 60000;

var stepNumber = 0;

// LIGHT SETTINGS (General)

       

// LIGHT SETTINGS (Currrent)			// LIGHT SETTINGS (New)					// LIGHT SETTINGS (Old)
var aRgbCur = [255, 255, 255];			var aRgbNew = [255, 255, 255];			var aRgbOld = [0, 0, 0];
var iBriCur = 0;						var iBriNew = 0;						
var bStatusCur = false;					var bStatusNew = false;					
var iTransitionTimeCur = 4;				var iTransitionTimeNew = 4;				
var iHueCur = 0;						var iHueNew = 0;						
var iSatCur = 0;						var iSatNew = 0;						
var sEffectCur = "";					var sEffectNew = "";					
var aXyCur = [0, 0];					var aXyNew = [0.5, 0.5];				
var iCtCur = 0;							var iCtNew = 0;							
var sAlertCur = "";						var sAlertNew = "";						
var sColorModeCur = "";					var sColorModeNew = "";					
var bReachableCur = true;				var bReachableNew = true;				


var myInit = function() {
    
	setTimeout(myInit, iTickrate);
	
	iCounter++;
	
	//statusLightGetRGB();
	
	statusLightGetXy();
	statusLightGetBri();
	xyBriToRgb();
	
	if ( aRgbCur[0] !== aRgbNew[0] || aRgbCur[1] !== aRgbNew[1] || aRgbCur[2] !== aRgbNew[2] ){
		
		LightTransitionDifferenceFade();

	}
	
	if ( ( iCounter % 100 ) == 0 ){
		if ( iTickRateMin < iTickRateDefault ){
			iTickRateDefault--;
		}
	}
};
setTimeout(myInit, iTickrate);	//myInit();





/*
() => {  }

function tester(input){
	alert(input);
}
*/


// Number remainder and exponential
//console.log(13 % 3); // 11 % 9
//// expected output: 2



function tickrateIncrease(iValue = 1){
	while ( iValue != 0 ){
		if ( iTickrate < iTickRateMax ){
			iTickrate++;
		}
		iValue--;		 
	}
}

function tickrateDecrease(iValue = 1000){
	while ( iValue != 0 ){
		if ( iTickrate > iTickRateMin ){
			iTickrate--;
		}
		iValue--;
	}
}

function statusLightGetXy(iLightNumber = 1){

	//process.stdout.write(".");

    var myCallback = function(data) {}; //With callback
    var fetchStatusLightGetXy = function(iLightNumber,callback) {
        api.lightStatus(iLightNumber, function(err, result) {
            if (err) {
				
				process.stdout.write(" errorXY ")
				tickrateIncrease(100);
				iTickRateDefault++;
				throw err;
			}
			for (i = 0; i < 2; i++){

				if( aXyCur[i] != result.state.xy[i]){
					aXyNew[i] = result.state.xy[i]
					iTickrate = iTickRateDefault;
				} else {
					tickrateIncrease();
				}
			}
				
			//	if( aXyCur[0] != result.state.xy[0]){
			//		aXyNew[0] = result.state.xy[0]
			//		iTickrate = iTickRateDefault;
			//	} else {
			//		tickrateIncrease();
			//	}
			//	
			//	if( aXyCur[1] != result.state.xy[1]){
			//		aXyNew[1] = result.state.xy[1]
			//		iTickrate = iTickRateDefault;
			//	} else {
			//		tickrateIncrease();
			//	}
			
        });
    };
    fetchStatusLightGetXy(iLightNumber, myCallback);
}


function statusLightGetBri(iLightNumber = 1){

	//process.stdout.write(".");
			
    var myCallback = function(data) {}; //With callback
    var fetchStatusLightGetBri = function(iLightNumber,callback) {
        api.lightStatus(iLightNumber, function(err, result) {
            if (err) {
				
				process.stdout.write(" errorBRI ")
				tickrateIncrease(100);
				iTickRateDefault++;
				throw err;
			}

			if( iBriCur != result.state.bri){
				iBriNew = result.state.bri;
				iTickrate = iTickRateDefault;
			} else {
				tickrateIncrease();
			}

        });
    };
    fetchStatusLightGetBri(iLightNumber, myCallback);
}


function statusLightGetRGB(iLightNumber = 1){

	//process.stdout.write(".");
			
    var myCallback = function(data) {}; //With callback
    var fetchStatusLightGetRGB = function(iLightNumber,callback) {
        api.lightStatusWithRGB(iLightNumber, function(err, result) {
	
            if (err) {
				
				process.stdout.write(" errorRGB ")
				tickrateIncrease(100);
				iTickRateDefault++;
				throw err;
			}

			for (rgb = 0; rgb < 3; rgb++){

				if( aRgbNew[rgb] !== result.state.rgb[rgb] && aRgbNew.length === result.state.rgb.length ){
					aRgbNew[rgb] = result.state.rgb[rgb];
					iTickrate = iTickRateDefault;
				} else {
					tickrateIncrease();
				}
				
				if ( aRgbNew[rgb] < 48 ){
					aRgbNew[rgb] = 0;
				}
			}
			
			// Alles behalve 0, boven 200 ophogen to 254
			//aRgbNew[0] aRgbNew[1] aRgbNew[2]
			
        });
    };
    fetchStatusLightGetRGB(iLightNumber, myCallback);
}

function xyBriToRgb(x = aXyNew[0], y = aXyNew[1], bri = iBriNew){
	
	//process.stdout.write(".");
	
	var z = 1.0 - x - y;
	var Y = bri / 255.0; // Brightness of lamp
	var X = (Y / y) * x;
	var Z = (Y / y) * z;
	r = X * 1.612 - Y * 0.203 - Z * 0.302;
	g = -X * 0.509 + Y * 1.412 + Z * 0.066;
	b = X * 0.026 - Y * 0.072 + Z * 0.962;
	r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
	g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
	b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
	var maxValue = Math.max(r,g,b);
	r /= maxValue;
	g /= maxValue;
	b /= maxValue;
	r = r * 255;   if (r < 0) { r = 255 };
	g = g * 255;   if (g < 0) { g = 255 };
	b = b * 255;   if (b < 0) { b = 255 };

	while ( r < bri && b < bri && g < bri ){
		
		if ( r < bri ){
			r++;
		}
		
		if ( g < bri ){
			g++;
		}
		
		if ( b < bri ){
			b++;
		}
	}
	
	//	if ( r < 100 ){
	//		r = 0;
	//	}
    //	
	//	if ( g < 100 ){
	//		g = 0;
	//	}
    //	
	//	if ( b < 100 ){
	//		b = 0;
	//	}	
    //	
	//	if ( b < 250 ){
	//		if ( g > 253 ){
	//			r /= 4;
	//		}	
	//	}
    //	
	//	if ( r > 250 && g >  ){
	//		if ( g > 253 ){
	//			r /= 4;
	//		}	
	//	}	
	
	aRgbNew[0] = r;
	aRgbNew[1] = g;
	aRgbNew[2] = b;
}

function LightTransitionDifferenceFade(){
	const stepValue = [7, 3, 1];
	var aDifference = [0, 0, 0]
	var stepError = [false, false, false];
	
	stepNumber = 0;

	while ( stepNumber < stepValue.length ){
		for (rgb = 0; rgb < 3; rgb++){
			
			if ( aRgbCur[rgb] > aRgbNew[rgb] ){
				aDifference[rgb] = aRgbCur[rgb] - aRgbNew[rgb];
			} else {
				aDifference[rgb] = aRgbNew[rgb] - aRgbCur[rgb];
			}
			
			if ( aDifference[rgb] >= stepValue[stepNumber] ){

				stepError[rgb] = false;
				LightTransitionDifferenceSwitch(rgb,stepValue[stepNumber])
			} else {
				stepError[rgb] = true;
			}
			
			if ( aDifference[rgb] < stepValue[stepNumber] || aRgbCur[rgb] == aRgbNew[rgb]){
				stepError[rgb] = true;
			}
			
			if ( stepError[0] == true ){
				if ( stepError[1] == true ){
					if ( stepError[2] == true ){
						stepNumber++;
						stepError = [false, false, false];
					}
				}
			}
		}
	}
	cLogSTDout( aRgbCur + " Done! Tickrate:" + iTickRateDefault + "/" + ( iTickrate - iTickRateDefault ) + "/" + iTickrate + "ms " + '\n' );
	
	bRgbDiffStatus = false;
}

function LightTransitionDifferenceSwitch(rgb,iLightTransitionStep = 1){
	if( aRgbCur[rgb] > aRgbNew[rgb] ){
		cLogSTDColor( colorName[rgb], "-" );
		LightTransitionDown(rgb, iLightTransitionStep);
	} else if ( aRgbCur[rgb] < aRgbNew[rgb] ){
		cLogSTDColor( colorName[rgb], "+" );
		LightTransitionUp(rgb, iLightTransitionStep);
	}
}

function LightTransitionDown(rgb,iLightTransitionStep = 1){
	aRgbCur[rgb] -= iLightTransitionStep;
	lightTransitionExec(rgb,iLightTransitionStep);
}

function LightTransitionUp(rgb,iLightTransitionStep = 1){
	aRgbCur[rgb] += iLightTransitionStep;
	lightTransitionExec(rgb, iLightTransitionStep);
}

function lightTransitionExec(rgb,iLightTransitionStep = 1){
    const GPIOPos = [17, 22, 25];
	exec("/usr/local/bin/pigs p " + GPIOPos[rgb] + " " + aRgbCur[rgb]);		
	aRgbOld[rgb] = aRgbCur[rgb];
}


//	####  ## ####### ###### ######
//	## ## ## ##   ##   ##   ##
//	##  #### ##   ##   ##   ##
//	##    ## ##   ##   ##   ##
//	##    ## ##   ##   ##   ####
//	##    ## ##   ##   ##   ##
//	##    ## ##   ##   ##   ##
//	##    ## ##   ##   ##   ##
//	##    ## #######   ##   ######


function initVarRgb( i = 0 ){
    for ( ; i < aRgbCur.length; i++ ){ 
        aRgbCur[i] = aRgbNew[i];
    }
}

function initVarXy( i = 0 ){
    for ( ; i < aRgbCur.length; i++ ){ 
        aXyCur[i] = aXyNew[i];
    }
}

function initVarBri( i = 0 ){
    for ( ; i < aRgbCur.length; i++ ){ 
        iBriCur[i] = iBriNew[i];
    }
}

//apiLightStatus(iLightNumber,"hue");
function apiLightStatus(iLightNumber,sItemName){

	function apiLightStatusTestCall(iLightNumber){
		api = new HueApi(ipHost, username); 
			
		if (sItemName == "rgb") {
			api.lightStatusWithRGB(iLightNumber).then(displayResult).fail(displayError).done();
		} else {
			api.lightStatus(iLightNumber).then(displayResult).fail(displayError).done();
		}
	};

	function displayError(err) { 
	//console.error(err); 
	};
	
	function displayResult(result) { 
		
		switch(sItemName) {
			case "rgb": console.log("rgb:" + result.state.rgb); break;
			case "bri": console.log( sItemName + ":" + result.state.bri); break; 
			case "hue": console.log( sItemName + ":" + result.state.hue); break;
			case "sat": console.log( sItemName + ":" + result.state.sat); break;
			case "effect": console.log( sItemName + ":" + result.state.effect); break;
			case "xy": console.log( sItemName + ":" + result.state.xy); break;
			case "ct": console.log( sItemName + ":" + result.state.ct); break;
			case "alert": console.log( sItemName + ":" + result.state.alert); break;
			case "colormode": console.log( sItemName + ":" + result.state.colormode); break;
			case "reachable": console.log( sItemName + ":" + result.state.reachable); break;
			default: console.log(result); break;
		}
	}

	apiLightStatusTestCall(iLightNumber);
};













