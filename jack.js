/* Black Jack by Bry012*/

var value = [];
var deck = [];
var images = [];
var amount_bet = 0;
var black_jack = false;

//card images
images[0] = "black_jack/a_h.jpg";
images[1] = "black_jack/ace_d.jpg";
images[2] = "black_jack/ace_s.jpg";
images[3] = "black_jack/ace_c.jpg";
images[4] = "black_jack/2_h.jpg";
images[5] = "black_jack/2_d.jpg";
images[6] = "black_jack/2_s.jpg";
images[7] = "black_jack/2_c.jpg";
images[8] = "black_jack/3_h.jpg";
images[9] = "black_jack/3_d.jpg";
images[10] = "black_jack/3_s.jpg";
images[11] = "black_jack/3_c.jpg";
images[12] = "black_jack/4_h.jpg";
images[13] = "black_jack/4_d.jpg";
images[14] = "black_jack/4_s.jpg";
images[15] = "black_jack/4_c.jpg";
images[16] = "black_jack/5_h.jpg";
images[17] = "black_jack/5_d.jpg";
images[18] = "black_jack/5_s.jpg";
images[19] = "black_jack/5_c.jpg";
images[20] = "black_jack/6_h.jpg";
images[21] = "black_jack/6_d.jpg";
images[22] = "black_jack/6_s.jpg";
images[23] = "black_jack/6_c.jpg";
images[24] = "black_jack/7_h.jpg";
images[25] = "black_jack/7_d.jpg";
images[26] = "black_jack/7_s.jpg";
images[27] = "black_jack/7_c.jpg";
images[28] = "black_jack/8_h.jpg";
images[29] = "black_jack/8_d.jpg";
images[30] = "black_jack/8_s.jpg";
images[31] = "black_jack/8_c.jpg";
images[32] = "black_jack/9_h.jpg";
images[33] = "black_jack/9_d.jpg";
images[34] = "black_jack/9_s.jpg";
images[35] = "black_jack/9_c.jpg";
images[36] = "black_jack/10_h.jpg";
images[37] = "black_jack/10_d.jpg";
images[38] = "black_jack/10_s.jpg";
images[39] = "black_jack/10_c.jpg";
images[40] = "black_jack/j_h.jpg";
images[41] = "black_jack/j_d.jpg";
images[42] = "black_jack/j_s.jpg";
images[43] = "black_jack/j_c.jpg";
images[44] = "black_jack/q_h.jpg";
images[45] = "black_jack/q_d.jpg";
images[46] = "black_jack/q_s.jpg";
images[47] = "black_jack/q_c.jpg";
images[48] = "black_jack/k_h.jpg";
images[49] = "black_jack/k_d.jpg";
images[50] = "black_jack/k_s.jpg";
images[51] = "black_jack/k_c.jpg";

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

preload(images);

/*creating deck*/
var create_deck = function() {
    for(i=1;i<14;i++){
        var val = (i<=10)? i : 10;
        value.push(val,val,val,val);
        }
    
     function card (value, cards) {
        this.value = value;
        this.cards = cards;
    }

    for(i=0;i<images.length;i++){
        var v = value[i];
        var c = images[i];
        deck.push(new card(v,c));
    }
};

/*removes card from deck*/
Array.prototype.removeByIndex = function(index) {
    this.splice(index, 1);
};


//creates player object
function players(name,total,cards, score) {
    this.name = name;
    this.total = total;
    this.cards = cards;
    score = 20;
    this.score = score;
}

var player1 = new players("Player 1", 0,[]);
var hand2 = new players("Hand2", 0, []);
var dealer = new players("Dealer", 0, []);

var new_game = function () {
    document.getElementById('cards').innerHTML = "";
    document.getElementById('dealer-cards').innerHTML = "";
    document.getElementById("hand2-cards").innerHTML = "";
    document.getElementById("player2").innerHTML = "";

    player1.score = prompt("What dollar amount would you like to start with?");
    if (player1.score == null) {
        player1.score = original_score
    }
    else if (isNaN(parseInt(player1.score))) {
        alert("Sorry, your cash amount entered is not a valid number. Please, press okay and enter in another value.");
        new_game();
    }
    else{
        player1.score = parseInt(player1.score);
    }
    document.getElementById("winnings").innerHTML = "Player: " + player1.score;
    amount_bet = 0;
    original_score = player1.score;
    document.getElementById("amount_bet").innerHTML = "Bet: " + 0;
    $(document).ready(function() {
        $('#start').attr('onclick', 'alert("Please, place your bet.")');
        $('#white').attr('onclick', 'bet(1)');
        $('#red').attr('onclick', 'bet(5)');
        $('#blue').attr('onclick', 'bet(10)');
    });
};



players.prototype.check_total = function() {
    var total = 0
    var lists = []
    var new_total = 0
    for (i=0;i<this.cards.length;i++){
        
        total = total + this.cards[i].value
        lists.push(this.cards[i].value)
        
        }
    //checks if 1 (ace) is in hand.
    if (lists.indexOf(1) != -1) {
       
        if (total + 10 > 21) {
            this.total = total
        }

        else {
            if (this == dealer) {

                this.total = total + 10
                if (lists[1] == 1) {
                    new_total = dealer.total - dealer.cards[1].value - 10
                    document.getElementById("dealer").innerHTML = "Dealer: " + new_total;
                }
                else {
                    new_total = dealer.total - dealer.cards[1].value
                    document.getElementById("dealer").innerHTML = "Dealer: " + new_total;
                }
            }
            this.total = total + 10
        }
    }
    else {
        this.total = total
    }

    if (this == dealer && new_total === 0) {
                new_total = dealer.total  - dealer.cards[1].value
                document.getElementById("dealer").innerHTML = "Dealer: " + new_total;
    }


    

    document.getElementById("player1").innerHTML = "Player: " + player1.total;
    
}


players.prototype.deal = function() {
    
    var num = Math.floor(Math.random() * deck.length);

    if(deck.length <=4) {
        create_deck();
    }
//defines value of ace
 
    if(this == player1){
        
        player1.cards.push(deck[num]);
        $(document).ready(function() {
                $("<img>").attr({src: deck[num].cards, id: "pic"+player1.cards.indexOf(deck[num])}).appendTo('#cards');
        });
        }

    else if (this == hand2){
        hand2.cards.push(deck[num]);
        $(document).ready(function() {
                $("<img>").attr('src', deck[num].cards).appendTo('#hand2-cards');
        });
    }

    else if (this == dealer){
        dealer.cards.push(deck[num]);
         $(document).ready(function() {
            $("<img>").attr('src', deck[num].cards).appendTo('#dealer-cards');
        }); 
     }

    else {
        alert('Error');
    }
    deck.removeByIndex(num);
};


var original_score = player1.score;

var bet = function(bet_amount) {
    var chip_amount = bet_amount;

//checks if player has made bet before cards are dealt
    if(amount_bet + chip_amount <= original_score) {
        $(document).ready(function() {
            $('#start').attr('onclick', 'start()');
        });
            amount_bet += chip_amount;
            player1.score -= chip_amount;
     }

    else {
        alert("Sorry, you don't have enough chips to make that bet.");
    }

    document.getElementById("amount_bet").innerHTML = "Bet: " + amount_bet;

    chip_amount = 0;

};



var double = function() {
 
    $(document).ready(function() {
        $('#double').attr('onclick', " ");
    });
    if(player1.score < amount_bet) {
        return alert("Sorry, you don't have enough chips to double down.");
    }
    player1.score -= amount_bet;
    amount_bet *= 2;
    
    document.getElementById("amount_bet").innerHTML = "Bet: " + amount_bet;
    
    hit();
    document.getElementById("player1").innerHTML = "Player: " + player1.total;
    player1.check_total()
    dealer.check_total()
    
};

var is_split = false;
var split = function() {
    
    if(player1.score < amount_bet) {
        return alert("Sorry, you don't have enough chips to split.");
    }
    hand2.cards.push(player1.cards.pop())
    is_split = true;

    
    $(document).ready(function(){
        $('#pic1').prependTo('#hand2-cards');
        $('#split').attr('onclick', "");
    });
    player1.deal();
    hand2.deal();
    player1.check_total()
    hand2.check_total()
    player1.score -= amount_bet;
    amount_bet *= 2;
    document.getElementById("player1").innerHTML = "Player: " + player1.total;
    document.getElementById("player2").innerHTML = "Player2: " + hand2.total;
    document.getElementById("amount_bet").innerHTML = "Bet: " + amount_bet;
    
};

var start = function() {

    //resets values for new hand
    document.getElementById('cards').innerHTML = "";
    document.getElementById('dealer-cards').innerHTML = "";
    document.getElementById("hand2-cards").innerHTML = "";
    document.getElementById("player2").innerHTML = "";
    player1.cards = [];
    hand2.cards = [];
    dealer.cards = [];

    player1.deal();
    dealer.deal();
    player1.deal();
    document.getElementById("dealer").innerHTML = "Dealer: " + dealer.total;
    dealer.deal();
    player1.check_total();
    dealer.check_total();
    //hides dealer's second card
    $('#dealer-cards img:nth-child(2)').hide();
    $("<img id='back'>").attr('src', 'black_jack/card_back.jpg').appendTo('#dealer-cards');

    document.getElementById("result").innerHTML = "";
    document.getElementById("result2").innerHTML = "";
    document.getElementById("player1").innerHTML = "Player: " + player1.total;


    if(player1.total == 21) {
         black_jack = true;
          document.getElementById("dealer").innerHTML = "Dealer: " + dealer.total;
        end();
        return;
    }
    
    $(document).ready( function() {
        $('#hit').attr('onclick', 'hit()');
        $('#stay').attr('onclick', 'stay()');
        $('#double').attr('onclick', 'double()');

        //activates split button if player's first two card values are identical or if first two cards are aces
        if(player1.cards[0].value == player1.cards[1].value || ((player1.cards[0].value==1 || player1.cards[0].value==11)&&(player1.cards[1].value==1|| player1.cards[1].value==11))) {
            $('#split').attr('onclick', 'split()');
        }

        $('#start').attr('onclick', ' ');
        $('#white').attr('onclick', ' ');
        $('#red').attr('onclick', ' ');
        $('#blue').attr('onclick', ' ');
 });

};



var dealer_hit = function() {

    for(i=0;i<deck.length;i++){
        dealer.check_total()          
        if(dealer.total<=17 && dealer.total<player1.total && player1.total<22 || dealer.total<hand2.total&&hand2.total<22){
            dealer.deal();
        }

        else if(dealer.total>21){
            document.getElementById("dealer").innerHTML = "Dealer: Bust";
            end();
            break;
        }
                
        else{
            document.getElementById("dealer").innerHTML = "Dealer: " + dealer.total
            end();
            break;
        }
    }

};
//allows split function to work with two different player hands
var who_hit = 0;
var hit = function() {
    
    if(who_hit === 0) {
        player1.deal();
        player1.check_total()
        if(player1.total>21) {
             document.getElementById("player1").innerHTML = "Player: Bust";
            document.getElementById("dealer").innerHTML = "Dealer: " + dealer.total;
            stay();
            return;
            }
        document.getElementById("player1").innerHTML = "Player: " + player1.total;

        $(document).ready(function() {
            $('#double').attr('onclick', "");
        });
    }
    else{

        hand2.deal();
        hand2.check_total()
        if(hand2.total>21) {
            document.getElementById("player2").innerHTML = "Player2: Bust";
            document.getElementById("dealer").innerHTML = "Dealer: " + dealer.total;
            stay();
            return;
        }

        document.getElementById("player2").innerHTML = "Player2: " + hand2.total;
    }
    
    dealer.check_total()

};

var stay = function() {
    //allows stay function for both hands after split
    if(is_split===true) {
        who_hit = 1;
        is_split=false;
        $(document).ready(function() {
            $('#player1').css({'background':'rgba(10,10,10,0.7)',"border-radius":"10px", "padding":"3px"});
        });
        return;
    }
    else{
        document.getElementById("player1").innerHTML = "Player: " + player1.total;
        dealer_hit();
    }
};

var end = function() {
    player1.cards = [];
    hand2.cards = [];
    dealer.cards = [];
    who_hit = 0;

    

    $(document).ready(function(){
        $('#hit').attr('onclick', "");
        $('#stay').attr('onclick', "");
        $('#start').attr('onclick', 'alert("Please, place your bet.")');
        $('#white').attr('onclick', 'bet(1)');
        $('#red').attr('onclick', 'bet(5)');
        $('#blue').attr('onclick', 'bet(10)');
    });

    //shows dealer's second card
    $("#back").remove();
    $('#dealer-cards img:nth-child(2)').show();

    $('#player1').css('background','none');
    $('#misc ul').css('background','rgba(10,10,10,0.6)');
    $('#table').one('click', function(){
        $('#misc ul').fadeOut('slow');
    });

   
    if(dealer.total > player1.total && dealer.total <=21 || player1.total > 21){
        
        if(hand2.total === 0){
            document.getElementById("result").innerHTML = "Dealer wins!";
        }   
        else{
            document.getElementById("result").innerHTML = "Dealer beats hand one!";
        }
        
     }

    else if(dealer.total < player1.total || dealer.total > 21){

        if(hand2.total === 0) {
            document.getElementById("result").innerHTML = "You win!";
        
        if(black_jack == true) {
            player1.score += amount_bet + (amount_bet * 1.5);
        }

        else{
            player1.score += amount_bet * 2;
        }   
        }
        else {
            document.getElementById("result").innerHTML = "You win hand one!";
            player1.score += amount_bet;
        }
    }
    

    else{
        
        if(hand2.total === 0){
        document.getElementById("result").innerHTML = "We Tie";
         player1.score += amount_bet;
        }

        else {
            document.getElementById("result").innerHTML = "We Tie on hand one";
            player1.score += amount_bet * 0.5;
        }
    }

    if(hand2.total > 0) {

        if (dealer.total > hand2.total && dealer.total <=21 || hand2.total > 21) {
            document.getElementById("result2").innerHTML = "<br>" + "Dealer wins hand two.";
        }

        else if (dealer.total < hand2.total || dealer.total > 21) {
            document.getElementById("result2").innerHTML = "<br>" + "You win hand two!";
            player1.score += amount_bet;
        }

        else {
            document.getElementById("result2").innerHTML = "<br>" + "We Tie on hand two.";
            player1.score += amount_bet * 0.5;
        }
    }
    $('#misc ul').fadeIn("slow");
    document.getElementById("winnings").innerHTML = "Player: " + player1.score;

    original_score = player1.score;
    amount_bet = 0;
    black_jack = false;
    hand2.total = 0
    document.getElementById("amount_bet").innerHTML = "Bet: " + amount_bet;

};













