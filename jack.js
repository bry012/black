
var value = [];
var suit = [];
var deck = [];
var face = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"];
var type = [];
var images = [];


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


/*creating deck*/
var create_deck = function() {
for(i=1;i<14;i++){
    var val = (i<=10)? i : 10;
    value.push(val,val,val,val);
    }
for(i=1;i<14;i++){
    suit.push("Heart","Diamond","Spade", "Club");
 }
 
 
function card(value, suit, cards) {
    this.value = value;
    this.suit = suit;
    this.cards = cards;
}

for(i=0;i<images.length;i++){
    var v = value[i];
    var s = suit[i];
    var c = images[i];
    deck.push(new card(v,s,c));

}
};

/*removes card from deck*/
Array.prototype.removeByIndex = function(index) {
    this.splice(index, 1);
};

function players(name,total,cards, score) {
    this.name = name;
    this.total = total;
    this.cards = cards;
    score = 20;
    this.score = score;
}

var player1 = new players("Player 1", 0,[]);
var dealer = new players("Dealer", 0, []);



players.prototype.deal = function() {
    var num = Math.floor(Math.random() * deck.length);
    if(deck[num].value == 1) {
        if((21 - this.total) >= 11) {
            deck[num].value = 11
        }

    }
    this.total += deck[num].value;
    if(this == player1){
    $(document).ready(function() {
            $("<img>").attr('src', deck[num].cards).appendTo('#cards');
        });
    
}

    if(this == dealer) {
          $(document).ready(function() {
            $("<img>").attr('src', deck[num].cards).appendTo('#dealer-cards');
        });
          
          
    }
    deck.removeByIndex(num);
    
};
var start = function() {
    document.getElementById('cards').innerHTML = "";
    document.getElementById('dealer-cards').innerHTML = "";

    if(deck.length <=4) {
        create_deck();
}
player1.total = 0;
dealer.total = 0;
player1.deal();
dealer.deal();
player1.deal();
dealer.deal();
document.getElementById("result").innerHTML = "";
document.getElementById("player1").innerHTML = "Player: " + player1.total;
document.getElementById("dealer").innerHTML = "Dealer: " + dealer.total;
document.getElementById("player_tally").innerHTML = "Player: " + player1.score;
document.getElementById("dealer_tally").innerHTML = "Dealer: " + dealer.score;
$(document).ready( function() {
    $('#hit').bind('click', hit);
    $('#stay').bind('click', stay);
});

};

var dealer_hit = function() {

      for(i=0;i<deck.length;i++){
                    
                if(dealer.total<21 && dealer.total<player1.total && player1.total<22){
                    dealer.deal();
                    
                }
                else if(dealer.total>21){
                    
                    dealer.total = "Bust";
                    return dealer.total;
                    
                }
                else{
                    
                    return dealer.total;
                    }
                }

};


var hit = function() {
       player1.deal();
  
            if(player1.total>21) {
                player1.total = "Bust";
                document.getElementById("player1").innerHTML = "Player: " + player1.total;
                console.log("bust");
                end();
                return player1.total;
            }
                document.getElementById("player1").innerHTML = "Player: " + player1.total;
        };

var stay = function() {
    document.getElementById("player1").innerHTML = "Player: " + player1.total;
    dealer_hit();
    document.getElementById("dealer").innerHTML = "Dealer: " + dealer.total;
    end();
    return player1.total;
};



var end = function() {
$(document).ready( function() {
    $('#hit').unbind('click', hit);
    $('#stay').unbind('click', stay);
});


console.log("You scored a "+player1.total+" and the dealer scored a "+ dealer.total);

if(dealer.total > player1.total && dealer.total !== "Bust" || player1.total == "Bust"){
document.getElementById("result").innerHTML = "Dealer wins!";
dealer.score+=1;
player1.score-=1;
document.getElementById("player_tally").innerHTML = "Player: " + player1.score;
document.getElementById("dealer_tally").innerHTML = "Dealer: " + dealer.score;

}
else if(dealer.total < player1.total || dealer.total == "Bust"){
document.getElementById("result").innerHTML = "You win!";
player1.score+=1;
dealer.score-=1;
document.getElementById("player_tally").innerHTML = "Player: " + player1.score;
document.getElementById("dealer_tally").innerHTML = "Dealer: " + dealer.score;

}
else{
  document.getElementById("result").innerHTML = "We Tie";
}

if(player1.score === 0) {
    document.getElementById("result").innerHTML = "You have lost the game.";
    dealer.score = 20;
    player1.score = 20;
}

if(dealer.score === 0) {
    document.getElementById("result").innerHTML = "You have beat the dealer!";
    dealer.score = 20;
    player1.score = 20;

}

player1.total = 0;
dealer.total = 0;

};













