// Here is my JavaScript for my webpage!


//My variables for JavaScript

var totalApps = 0;
var totalWatts = 0;

//Solar panel variables
var solarHours = 5.5;
var solarWatts = 0;
var solarPanels = 1;
var wattsPro = 240;

//Battery variables
var batteries = 1;
var batWatts = 0;
var wattsStore = 1000;


//These functions add to watts needed and total appliances logged
//Adds coffe maker and watts for it. *May vary with model
function addCoffee() {
    totalWatts = totalWatts + 900;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;

}
//Adds washing machine and watts for it. *May vary with model
function addWash() {
    totalWatts = totalWatts + 800;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
//Adds dryer and watts for it. *May vary with model
function addDry() {
    totalWatts = totalWatts + 3000;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
//Adds Microwave and watts for it. *May vary with model
function addMicro() {
    totalWatts = totalWatts + 1200;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
//Adds light bulbs and watts for them. *Based on 45 Watt bulbs ran for 4 hours a day
function addBulbs() {
    totalWatts = totalWatts + 5000;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
//Adds Water Heater and watts for it. *Based on 45 gallon heater ran for 3 hours a day
function addWHeater() {
    totalWatts = totalWatts + 4000;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addFridge() {
    totalWatts = totalWatts + 1500;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addBTU() {
    totalWatts = totalWatts + 1400;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addCFan() {
    totalWatts = totalWatts + 15;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addHairDry() {
    totalWatts = totalWatts + 1500;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addLaptop() {
    totalWatts = totalWatts + 50;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addFreezer() {
    totalWatts = totalWatts + 35;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addTV() {
    totalWatts = totalWatts + 31;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addToaster() {
    totalWatts = totalWatts + 1200;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function add5hpPump() {
    totalWatts = totalWatts + 900;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addXBOX() {
    totalWatts = totalWatts + 180;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addPS4() {
    totalWatts = totalWatts + 150;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function add1hpPump() {
    totalWatts = totalWatts + 2000;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addDVDPlayer() {
    totalWatts = totalWatts + 15;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addRVWater() {
    totalWatts = totalWatts + 50;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addDeskPC() {
    totalWatts = totalWatts + 200;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addDishwasher() {
    totalWatts = totalWatts + 1800;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addRVFurnaceFan() {
    totalWatts = totalWatts + 100;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}
function addIron() {
    totalWatts = totalWatts + 900;
    document.getElementById('totalWatts').innerHTML = totalWatts;
    console.log(totalWatts);
    totalApps = totalApps + 1;
    document.getElementById('totalApps').innerHTML = totalApps;
}


//This function recommends how many solar panels the user will need
//I had some trouble trying to figure out how to make it work
function solarRec() {

    solarWatts = (solarHours * wattsPro) * solarPanels;
    while(totalWatts >= solarWatts){
        solarPanels = solarPanels + 1;
        solarWatts = (solarHours * wattsPro) * solarPanels;
    }

    document.getElementById('solarWattsDay').innerHTML = solarWatts;
    document.getElementById('solarPanels').innerHTML = solarPanels;
}
//Basically the same as the recommend Solar function but for batteries instead.
function batteryRec(){

    batWatts = batteries * wattsStore;

    while(solarWatts >= batWatts){
        batteries = batteries + 1;
        batWatts = batteries * wattsStore;
        console.log(batWatts, batteries, wattsStore);
    }



    wattsStore = wattsStore * batteries;

    document.getElementById('batteries').innerHTML = batteries;
    document.getElementById('wattsStore').innerHTML = wattsStore;
}
