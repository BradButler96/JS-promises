// Get one card from new deck
function getOneCard() {
    axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
        .then(res => console.log(res.data.cards[0].value + ' of ' + res.data.cards[0].suit))
        .catch(err => console.log(err))
}
getOneCard()

// Get two cards from one deck
function getTwoCards() {
    let card1;
    let card2;
    axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
        .then(res => {
            card1 = res.data.cards[0].value + ' of ' + res.data.cards[0].suit;
            return res.data.deck_id
        })
        .then((deckID) => {
            return axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
        })
        .then(res => {
            card2 = res.data.cards[0].value + ' of ' + res.data.cards[0].suit;
            console.log(card1 + ' & '+ card2)
        })
        .catch(err => console.log(err))
}
getTwoCards()

// Draw card until deck is empty
let deck;
function getDeck() {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => {deck = res.data.deck_id})
        .catch(err => console.log(err))
}
$(document).ready(getDeck)

function shuffle() {
    $('#card-div').empty()
    $('#card-btn').show()
    $('#shuffle-btn').hide()
    getDeck()
}
$('#shuffle-btn').click(shuffle)

function drawCard() {
    axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
        .then(res => {
            let img = res.data.cards[0].image
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            let angle = Math.random() * 90 - 45;

           $('#card-div').append($('<img>').attr('src', img)
                                           .attr('class', 'card')
                                           .css({transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`}))

            if (res.data.remaining < 1) {
                $('#card-btn').hide()
                $('#shuffle-btn').show()
            }
        })
        .catch(err => console.log(err))
}
$('#card-btn').click(drawCard)
