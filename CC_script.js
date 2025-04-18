// Names: Weston Hanson and Dale Faubion
// Date: 11/13/19
// Description: Making functions to build a calculator



function start(){
    var addMoreCoffee = true
    var mochaGrande = 4.35;
    var mochaTall = 3.75;
    var mochaSmall = 3.65;
    var darkGrande = 2.25;
    var darkTall = 2.15;
    var darkSmall = 2.05;
    var hotChocolateGrande = 3.45;
    var hotChocolateTall =2.95;
    var hotChocolateSmall =2.85;
    var tax = .917;
//variables for mocha moneys
    var mochaGrandeRevenue = 0;
    var mochaGrandeProfit = 0;
    var mochaTallRevenue = 0;
    var mochaTallProfit = 0;
    var mochaSmallRevenue = 0;
    var mochaSmallProfit = 0;
    //variables for Dark roast moneys
    var darkGrandeRevenue = 0;
    var darkGrandeProfit = 0;
    var darkTallRevenue = 0;
    var darkTallProfit = 0;
    var darkSmallRevenue = 0;
    var darkSmallProfit = 0;
    //variables for hot chocolate moneys
    var hotGrandeRevenue = 0;
    var hotGrandeProfit = 0;
    var hotTallRevenue = 0;
    var hotTallProfit = 0;
    var hotSmallRevenue = 0;
    var hotSmallProfit = 0;

    while(addMoreCoffee == true){


        var askUser = prompt("What type of drink do you want to log? (answer with mocha, dark roast, or hot chocolate) "); //Weston Hanson

        if(askUser == "mocha"){ // Weston Hanson (the whole mocha if startment)

            var typeMocha = prompt("What type of mocha was bought? (Answer with grande, tall, or small) ");

            if(typeMocha == "grande"){
                var amountGrandeMochaBought = parseFloat ( prompt("How many Grande Mochas were bought?"));

                document.getElementById('grandeMochaAmount').innerHTML = amountGrandeMochaBought

                var mochaGrandeRevenue = amountGrandeMochaBought * mochaGrande;

                document.getElementById('grandeMochaRev').innerHTML = mochaGrandeRevenue


                console.log(amountGrandeMochaBought + " Grande Mochas were bought.");


                console.log( "Revenue for Grande Mochas: $" + amountGrandeMochaBought * mochaGrande);

                var mochaGrandeProfit = mochaGrandeRevenue * tax;

                console.log("Profit for Grande Mochas: $" + mochaGrandeProfit);

                document.getElementById('grandeMochaPro').innerHTML = mochaGrandeProfit

            }

            else if(typeMocha == "tall"){
                var amountTallMochaBought = parseFloat ( prompt("How many tall Mochas were bought?"));

                document.getElementById('tallMochaAmount').innerHTML = amountTallMochaBought

                var mochaTallRevenue = amountTallMochaBought * mochaTall;

                document.getElementById('tallMochaRev').innerHTML = mochaTallRevenue


                console.log(amountTallMochaBought + " Tall Mochas were bought.");


                console.log( "Revenue for Tall Mochas: $" + amountTallMochaBought * mochaTall);

                var mochaTallProfit = mochaTallRevenue * tax;

                console.log("Profit for Tall Mochas: $" + mochaTallProfit) ;

                document.getElementById('tallMochaPro').innerHTML = mochaTallProfit

            }

            else if(typeMocha == "small"){

                var amountSmallMochaBought = parseFloat ( prompt("How many small Mochas were bought?"));

                document.getElementById('smallMochaAmount').innerHTML = amountSmallMochaBought

                var mochaSmallRevenue = amountSmallMochaBought * mochaSmall;

                document.getElementById('smallMochaRev').innerHTML = mochaSmallRevenue

                console.log(amountSmallMochaBought + " Small Mochas were bought.");

                console.log( "Revenue for Small Mochas: $" + amountSmallMochaBought * mochaSmall);

                var mochaSmallProfit = mochaSmallRevenue * tax;

                console.log("Profit for Small Mochas: $" + mochaSmallProfit) ;

                document.getElementById('smallMochaPro').innerHTML = mochaSmallProfit
            }

            else{ //Weston Hanson
                window.alert("Please enter grande, tall, or small.")
            }

        }
        //if for roast and hot chocolate

        else if(askUser == "dark roast"){ // Weston Hanson

            var typeDark = prompt("What type of Dark Roast was bought? (Answer with grande, tall, or small) ");

            if(typeDark == "grande"){
                var amountGrandeDarkBought = parseFloat ( prompt("How many Grande Dark Roasts were bought?"));

                document.getElementById('grandeDarkAmount').innerHTML = amountGrandeDarkBought

                var darkGrandeRevenue = amountGrandeDarkBought * darkGrande;

                document.getElementById('grandeDarkRev').innerHTML = darkGrandeRevenue


                console.log(amountGrandeDarkBought + " Grande Dark Roasts were bought.");


                console.log( "Revenue for Grande Darks Roasts: $" + amountGrandeDarkBought * darkGrande);

                var darkGrandeProfit = darkGrandeRevenue * tax;

                console.log("Profit for Grande Darks Roasts: $" + darkGrandeProfit) ;

                document.getElementById('grandeDarkPro').innerHTML = darkGrandeProfit

            }


            else if(typeDark == "tall"){ //Weston Hanson
                var amountTallDarkBought = parseFloat( prompt("How many Tall Dark Roasts were bought? "));

                document.getElementById('tallDarkAmount').innerHTML = amountTallDarkBought

                var darkTallRevenue = amountTallDarkBought * darkTall;

                document.getElementById('tallDarkRev').innerHTML = darkTallRevenue

                console.log(amountTallDarkBought + " Tall Dark Roasts were bought");

                console.log( "Revenue for Tall Dark Roasts: $" + amountTallDarkBought * darkTall);



                console.log("Profit for Tall Dark Roasts: $" + ( darkTallRevenue * tax ) );

                var darkTallProfit = darkTallRevenue * tax;

                document.getElementById('tallDarkPro').innerHTML = darkTallProfit


            }

            else if(typeDark == "small"){ //Weston Hanson
                var amountSmallDarkBought = parseFloat( prompt("How many Small Dark Roasts were bought? "));

                document.getElementById('smallDarkAmount').innerHTML = amountSmallDarkBought

                var darkSmallRevenue = amountSmallDarkBought * darkSmall;

                document.getElementById('smallDarkRev').innerHTML = darkSmallRevenue

                console.log(amountSmallDarkBought + " Small Dark Roasts were bought");

                console.log( "Revenue for Small Dark Roasts: $" + amountSmallDarkBought * darkSmall);



                console.log("Profit for Small Dark Roasts: $" + ( darkSmallRevenue * tax ) );

                var darkSmallProfit = darkSmallRevenue * tax;

                document.getElementById('smallDarkPro').innerHTML = darkSmallProfit


            }

            else{ //Weston Hanson
                window.alert("Please enter grande, tall, or small.")
            }

        }

        else if(askUser == "hot chocolate"){ // Weston Hanson

            var typeHotChocolate = prompt("What type of Hot Chocolates was bought? (Answer with grande, tall, or small) ");

            if(typeHotChocolate == "grande"){
                var amountGrandeHotChocolateBought = parseFloat ( prompt("How many Grande Hot Chocolates were bought?"));

                document.getElementById('grandeHotAmount').innerHTML = amountGrandeHotChocolateBought

                var hotChocolateGrandeRevenue = amountGrandeHotChocolateBought * hotChocolateGrande;

                document.getElementById('grandeHotRev').innerHTML = hotChocolateGrandeRevenue

                console.log(amountGrandeHotChocolateBought + " Grande Hot Chocolates were bought.");

                console.log( "Revenue for Grande Hot Chocolates: $" + amountGrandeHotChocolateBought * hotChocolateGrande);


                console.log("Profit for Grande Hot Chocolates: $" +  ( hotChocolateGrandeRevenue * tax ) ) ;

                var hotChocolateGrandeProfit = hotChocolateGrandeRevenue * tax;

                document.getElementById('grandeHotPro').innerHTML = hotChocolateGrandeProfit

            }

            else if(typeHotChocolate == "tall"){
                var amountTallHotChocolateBought = parseFloat( prompt("How many Tall Hot Chocolates were bought? "));

                document.getElementById('tallHotAmount').innerHTML = amountTallHotChocolateBought

                var hotChocolateTallRevenue = amountTallHotChocolateBought * hotChocolateTall;

                document.getElementById('tallHotRev').innerHTML = hotChocolateTallRevenue

                console.log(amountTallHotChocolateBought + " Tall Hot Chocolates were bought");

                console.log( "Revenue for Tall Hot Chocolates: $" + amountTallHotChocolateBought * hotChocolateTall);



                console.log("Profit for Tall Hot Chocolates: $" + ( hotChocolateTallRevenue * tax ) );

                var hotChocolateTallProfit = hotChocolateTallRevenue * tax;

                document.getElementById('tallHotPro').innerHTML = hotChocolateTallProfit

            }

            else if(typeHotChocolate == "small"){
                var amountSmallHotChocolateBought = parseFloat( prompt("How many small Hot Chocolates were bought? "));

                document.getElementById('smallHotAmount').innerHTML = amountSmallHotChocolateBought

                var hotChocolateSmallRevenue = amountSmallHotChocolateBought * hotChocolateSmall;

                document.getElementById('smallHotRev').innerHTML = hotChocolateSmallRevenue

                console.log(amountSmallHotChocolateBought + " Small Hot Chocolates were bought");

                console.log( "Revenue for Small Hot Chocolates: $" + amountSmallHotChocolateBought * hotChocolateSmall);

                var hotChocolateProfit = hotChocolateSmallRevenue * tax;

                console.log("Profit for Small Hot Chocolates: $" + ( hotChocolateSmallRevenue * tax ) );

                document.getElementById('smallHotPro').innerHTML = hotChocolateProfit

            }

            else{ //Weston Hanson
                window.alert("Please enter grande, tall, or small.");
            }

        }

        else{ //Weston Hanson
            window.alert("Please enter mocha, dark roast, or hot chocolate.");
        }

        var addMoreCoffee = prompt("Do you want to log more coffee to your inventory? (Answer with yes or no)"); //Dale Faubion

        if(addMoreCoffee == "yes"){ //Dale Faubion
            var addMoreCoffee = true;
        }
        else { //Dale Faubion
            var sure = prompt("Are you sure you want to exit? (Answer with yes or no) ");
            if(sure == "yes"){
                var addMoreCoffee = false;
            }

            else {
                var addMoreCoffee = true;
            }
        }


    }
}