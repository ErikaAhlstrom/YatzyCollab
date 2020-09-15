document.addEventListener("DOMContentLoaded", function(e){

    
    
    
    ////part one
    
    //// Skapar en HTML Collection -> Array av td 1-6 för Player 1
    let p1_block1_arr = Array.from(document.getElementById("block1").getElementsByClassName("player1"));
    // let p1_block1_arr_int = p1_block1_arr.map((element, index, array) => { return parseInt(element.value)});
    let p1_sum = document.getElementById("player1_sum");
    let p1_bonus = document.getElementById("player1_bonus");

    ////part two
    
    //// Skapar en HTML Collection -> Array av td block2 för Player 1
    let p1_block2_arr = Array.from(document.getElementById("block2").getElementsByClassName("player1"));
    //let p1_block2_arr_int = p1_block2_arr.map((element, index, array) => { return parseInt(element.value)});
    let p1_yatzy = document.getElementById("p1_yatzy");
    let p1_total = document.getElementById("p1_total");




    /*  p1.addEventListener("change", function(e) {
        p1= p1.value;
    })
    let number_array=[];
    roll_dice.addEventListener("click",rollDice);
//slumpar värdet
    function rollDice(){
        for(let i=1;i<=5;i++){
            if (document.getElementById("dice_"+i).checked){
            } else {
                let slump = Math.floor(Math.random()*6+1);
                document.getElementById("image_"+i).src=("dice_img_"+slump+".png")
                number_array[(i-1)]=slump;
            }
        }
        console.log (number_array);
    } */
   



    let keep_click_arr = [false, false, false, false, false];
    ////tärnings-buttons att trycka på för att spara 
    for (let i = 0; i < 5; i++) {
        document.getElementById("toggle_" + (i + 1)).addEventListener("click", function(event){
            event.preventDefault();
            toggleKeepers(i);
            //? let button = i + 1;
            //? console.log("toggled: " + button);
            //? console.log(keep_click_arr);
        });
    }



  
    let sum = 0;

    //sum +=Number(p1_ones.value); //verkade inte behövas?/M ////Amanda: Omvandlar p1_ones.value till number och adderar till summan
    //// La in Amandas i en loop istället, kallar fortf på Erikas addToSum vid varje td "change"
    //// Varje td score får varsin eventlistener: /M
    for (let td_score of p1_block1_arr) {
        td_score.addEventListener("change", function(event){    //// ändra till click?
            //console.log(td_score);
            p1_sum.innerHTML = addToSum(td_score.value);
            if (sum >= 63) {
                p1_bonus.innerHTML = 50;   //// räkna ut bonus när alla övre td är ifyllda ist?
            } 
            else {
                p1_bonus.innerHTML = 0;
            }
        });
    }

    

    
    
    let roll_dice = document.getElementById("roll_dice");
    let dice_shown_img_arr = new Array(5);
    //// 5 träningar som syns i browsern     (vilket img-element skickar vi ut bilden till)
    for (let i = 0; i < 5; i++) {
        dice_shown_img_arr[i] = document.getElementById("dice_cell_" + ( i + 1 ));
    }

    var dice_values_array = new Array(5);
    //// alla tärningarna har noll från början, ingen tärning har kastats
    for (let i = 0; i < dice_values_array.length; i++) {
        dice_values_array[i] = 0;
    }

    var throws_left = 3;

    //// tärningsbilder sparade i array
    var dice_png_array = new Array(7);   
    for (let i = 0; i < 7; i++) {
        dice_png_array[i] = "resources/images/dice/dice-" + i + ".png";
    }
    
    
    
    //TODO:      ALLMÄN TO-DO LIST                                                         
    //TODO:  ( ) göra td_score klickbara                                                   
    //TODO:  ( ) när man klickar en td_score cell:                                         
    //TODO:  ( )      datan "fixeras" där så något sätt                                    
    //TODO:  ( )      omgången avslutas (tex: throws_left = 0 eller rent av throws_left 3) 
    //TODO:  ( )                         eller nåt mer exotiskt typ sätta igång nästa runda? kanske sen.... X´D 
    //TODO:  ( )      snygga till css knappar osv.. borde synas på dem vilka som är "valda" också               
    //TODO:  ( )      fyll på...                                                           
    //TODO:  ( ) när alla td_scores i övre blocket har "valts" av spelaren räknas bonusen ut och visas
    //TODO:  ( ) när tärningar kastas visas alla möjliga poäng även i övre blocket
    //TODO:  (/) skriv ut summan under övre blocket alltefter deras td score "valts"
    //TODO:  ( ) Styling: Highlighta alla valda/upptagna td:s.
    //TODO:  ( ) Styling: Highlighta alla möjliga td:s att välja på som har poäng.







    
    //! ROLL DICE   
    //* detta händer när man trycker på knappen vid tärningarna
    roll_dice.addEventListener("click", function(event) {
        let random_throw = randomDiceArray();
        console.log("Fem slumpade tärningar: " + random_throw); // Tärningarna som slumpades fram


        let checkBoxArray = Array.from(document.getElementById("keep_value").getElementsByTagName("input"));
        /*let checkBoxArray = Array.from(checkBoxCollection);
        let checkBoxChecked = checkBoxArray.filter((object, index, array) => {
            return this.checked === true;
        }); */ //Behövs typ inte tror jag men det verkar funka
        

        //// & om man har inte slagit tre gånger redan
        if (throws_left > 0) {
            for (let i = 0; i < 5; i++) {

                ////om tärning index [i] inte ska sparas:
                if (!checkBoxArray[i].checked) {   //// Alt till att klicka på själva tärningen
                //if (!keep_click_arr[i]) {   //// (keep_click_arr[i] === false) båda funkar nu
                    dice_shown_img_arr[i].src = dice_png_array[random_throw[i]];  //// byter bild motsvarande randomized tärningskast-array
                    dice_values_array[i] = random_throw[i];
                }   
            }

            //TODO:  Skicka till funktion(er) som räknar ut möjliga td_scores       
            //TODO:  - där OM möjligt score lägg in som värde på td-score           
            //TODO:    ________________________________________                     
            //TODO:                                                                 
            //TODO:    ( ) Pair                                                     
            //TODO:    ( ) Two pairs                                                
            //TODO:    (x) Four of a kind                                           
            //TODO:    (x) Three of a kind                                          
            //TODO:    (x) sm_straight                                              
            //TODO:    (x) lg_straight                                              
            //TODO:    (x) Full house                                               
            //TODO:    (x) chance                                                   
            //TODO:    (x) yatzy                                                    
            //TODO:                                                                 
            
            p1_block1_arr[0].value = blockOnePossibles(dice_values_array, 1);
            p1_block1_arr[1].value = blockOnePossibles(dice_values_array, 2);
            p1_block1_arr[2].value = blockOnePossibles(dice_values_array, 3);
            p1_block1_arr[3].value = blockOnePossibles(dice_values_array, 4);
            p1_block1_arr[4].value = blockOnePossibles(dice_values_array, 5);
            p1_block1_arr[5].value = blockOnePossibles(dice_values_array, 6);

            ////p1_block2_arr[0].value = calcPair(dice_values_array);   // ej gjord
            ////p1_block2_arr[1].value = calcTwoPairs(dice_values_array);  // ej gjord
            p1_block2_arr[2].value = calcThreeKind(dice_values_array); //// Möjligt tretal detta kast? skickar värde
            p1_block2_arr[3].value = calcFourKind(dice_values_array); //// Möjligt fyrtal detta kast? skickar värde
            p1_block2_arr[4].value = calcSmStraight(dice_values_array); //// Möjlig small straight detta kast? skickar värde
            p1_block2_arr[5].value = calcLgStraight(dice_values_array); //// Möjlig large straight detta kast? skickar värde
            p1_block2_arr[6].value = calcFullHouse(dice_values_array);   //// Möjlig kåk detta kast? skickar värde
            p1_block2_arr[7].value = calcChance(dice_values_array); //// Möjlig Chance detta kast? skickar värde
            p1_block2_arr[8].value = calcYatzy(dice_values_array); //// Möjlig yatzy detta kast? skickar värde

            //*     p1_block2_arr MAP:   
            //*     0: Pair              
            //*     1: Two Pairs         
            //*     2: Three of a kind   
            //*     3: Four of a kind    
            //*     4: Small Straight    
            //*     5: Large Straight    
            //*     6: House             
            //*     7: Chance            
            //*     8: Yatzy             
        }



        console.log("Nya tärningskastet med sparade tärningar: " + dice_values_array);
        // throws_left --;  ////pausad tills vidare, slå på sen
    });


    //! TOGGLE KEEP DICE FUNCTION
    function toggleKeepers(i) {
        if (keep_click_arr[i] === true) {
            keep_click_arr[i] = false;
        } else {
            keep_click_arr[i] = true;
        }
    }

    //? RESET TÄRNINGAR till spara ej ==== använd efter en omgång är slut eller början på ny omgång?
    function resetKeepers() {
        for (let i = 0; i < keep_click_arr.length; i++) { 
            keep_click_arr[i] = false;
        }
    }


    //* GAME SCORE FUNCTIONS
    //=====================//

    function blockOnePossibles(dice_arr, dice) {
        if (dice_arr.includes(dice)) {
            let filtered = dice_arr.filter((num, index, arr) => {
                return num === dice;
            })
            let sum = filtered.reduce((accumulator, currentval) => accumulator + currentval);

            return sum;
        } else {
            return 0;
        }
    } 

    //! THREE OF A KIND FUNCTION
    function calcThreeKind(numbers_array) {
        let arr = countDice(numbers_array); //// skicka vidare till countDice funktionen
        let three_kind = 0;
    
        if (arr.indexOf(3) > 0) {
            three_kind = arr.indexOf(3); //// returnar index av ev värde 3 i arrayen
            return (three_kind*3);
        }
        else{
            return 0;
        }
    }

    //! FOUR OF A KIND FUNCTION
    function calcFourKind(numbers_array) {
        let arr = countDice(numbers_array); //// skicka vidare till countDice funktionen
        let four_kind = 0;
    
        if (arr.indexOf(4) > 0) {
            four_kind = arr.indexOf(4); //// returnar index av ev värde 4 i arrayen
            return (four_kind*4);
        }
        else{
            return 0;
        }
    }

    //!  FULL HOUSE FUNCTION
    function calcFullHouse(numbers_array) {
        let arr = countDice(numbers_array); //// skicka vidare till countDice funktionen
        let pair = 0;
        let three_kind = 0;
        let full_house_score = 0;
    
        if (arr.indexOf(2) > 0) {
            pair = arr.indexOf(2); //// .indexOf letar efter värdet 2, returnar indexet
        }
        if (arr.indexOf(3) > 0) {
            three_kind = arr.indexOf(3); //// returnar index av ev värde 3 i arrayen
        }
    
        if (pair > 0 && three_kind > 0) { //// om det är en kåk, spara totala summan
            full_house_score = (pair * 2) + (three_kind * 3);
        }
    
        return full_house_score;    //// returnar värde 0 om ej kåk, eller summan av kåken
    }
    //! SMALL STRAIGHT FUNCTION
    function calcSmStraight(numbers_array) {
        console.log("nu testar vi straight");
        let is_sm_straight = 0;

        let arr = countDice(numbers_array); //// skicka vidare till countDice funktionen
        for (let i = 1; i < 6; i++) {       //// kolla om index 1 - 5 innehåller värdet 1
            if (arr[i] == 1) {
                is_sm_straight ++;
            }
        }
        if (is_sm_straight === 5) { 
            return 15;          //// om det är en liten straight, return totala summan (alltid 15)
        } else {
            return 0;
        }
    }
    //! LARGE STRAIGHT FUNCTION
    function calcLgStraight(numbers_array) {
        console.log("nu testar vi Large straight");
        let is_lg_straight = 0;

        let arr = countDice(numbers_array); //// skicka vidare till countDice funktionen
        for (let i = 2; i < 7; i++) {       //// kolla om index 1 - 5 innehåller värdet 1
            if (arr[i] == 1) {
                is_lg_straight ++;
            }
        }
        if (is_lg_straight === 5) { 
            return 20;          //// om det är en liten straight, return totala summan (alltid 15)
        } else {
            return 0;
        }
    }
    //!  YATZY FUNCTION
    function calcYatzy(numbers_array) {
        console.log("nu testar vi Yatzy");
        let arr = countDice(numbers_array);
        if (arr.includes(5)) {
            return 50;
        }

        else {
            return 0;
        }

    }
    //! CHANCE FUNCTION

    function calcChance(numbers_array) {
        console.log("nu testar vi Chance");
        let chanceSum = 0;
        
        for (i of numbers_array) {
            chanceSum+=i;
        }

        return chanceSum;
    }

    
    
    
}); 
//* end of DOMContentLoaded                                                                                 





//! RANDOM DICE FUNCTION
//// returnar fem random tärningsvärden i array
function randomDiceArray() {
    var dice_array = new Array(5);
    for (let i = 0; i < dice_array.length; i++) {
        //// runda ner till max 5 (+1 så ingen blir noll)
        dice_array[i] = Math.floor(Math.random() * 6) + 1;  
    }
    return dice_array;
}

//! RÄKNA HUR MÅNGA TÄRNINGAR AV VARJE
function countDice(dice_array) {    //// dice_array innehåller de slumpade tärningarnas värden [2, 4, 4, 1, 3]
    let values_array = []; ////Skapa en tom array
    for (let i = 0; i <= 6; i++) { //// assignar värdet 0 till varje index i values
        values_array[i] = 0;
    }
    // [0, 0, 0, 0, 0, 0, 0]    //// arrayen nu
    // [0, 1, 1, 1, 2, 0, 0]    //// arrayens index

    for (let current_dice of dice_array) { 
        values_array[current_dice]++;
    }
    return values_array;
}

//! LÄGGER TILL VALD TD_SCORE TILL SUMMAN
function addToSum(x){
    sum+=Number(x);
    return sum;
}