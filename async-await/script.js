// Part 1: Number Facts
// Part 1.1
async function favNumFact(num) {
    let res = await axios.get(`http://numbersapi.com/${num}/math?json`)
}

// Part 1.2
let numArr = [];
let numStr = '';
function addNum() {
    $('#res-area').empty()
    let num = $('#num-input').val()
    $('#nums-div').append($('<p>').text(num))
    numArr.push(num)
    numStr = numArr.join(',')
    $('#num-input').val('')
}
$('#add-num-btn').click(addNum)

async function multiNumFacts() {
    let res = await axios.get(`http://numbersapi.com/${numStr}`)
    // When numArr.length was 1 it only added the first letter of the fact string so I resorted to this
    if (numArr.length == 1) {
        $('#res-area').append($('<p>').text(res.data))
    } else {
        for (num of numArr) {
            $('#res-area').append($('<p>').text(res.data[num]))
        }
    }
    $('#nums-div').empty()
    numArr = [];
    numStr = ''
}
$('#get-facts-btn').click(multiNumFacts)


// Part 1.3
async function multiFacts() {
    $('#fav-res-area').empty()
    let num = $('#fav-input').val()
    let res = await Promise.all([
        axios.get(`http://numbersapi.com/${num}/math?json`),
        axios.get(`http://numbersapi.com/${num}/math?json`),
        axios.get(`http://numbersapi.com/${num}/math?json`),
        axios.get(`http://numbersapi.com/${num}/math?json`)
    ])
    for (fact of res) {
        $('#fav-res-area').append($('<p>').text(fact.data.text))
    }
    $('#fav-input').val('')
}
$('#fav-facts-btn').click(multiFacts)





// Part 2: Deck of Cards
// Part 2.1
async function drawOneNew() {
    let deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    let card = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`)
    console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`)
}

// Part 2.2
async function drawTwoNew() {
    let deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    let cards = await Promise.all([
        axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`),
        axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`)
    ])
    console.log(`${cards[0].data.cards[0].value} of ${cards[0].data.cards[0].suit} & ${cards[1].data.cards[0].value} of ${cards[1].data.cards[0].suit}`)
}

// Part 2.3
let deckId;
async function getDeck() {
    let deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    deckId = deck.data.deck_id
}
$(document).ready(getDeck)

async function drawNextCard() {
    let nextCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    let img = nextCard.data.cards[0].image
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    let angle = Math.random() * 90 - 45;

    $('#card-div').append($('<img>').attr('src', img)
                                    .attr('class', 'card')
                                    .css({transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`}))

    if (nextCard.data.remaining < 1) {
        $('#card-btn').hide()
        $('#shuffle-btn').show()
    }
}
$('#card-btn').click(drawNextCard)

function shuffle() {
    $('#card-div').empty()
    $('#card-btn').show()
    $('#shuffle-btn').hide()
    getDeck()
}
$('#shuffle-btn').click(shuffle)
