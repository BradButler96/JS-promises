// Number Facts
$('#enter-single-num').click(() => {
    $('#enter-multi-nums').show()
    $('#enter-single-num').hide()
    $('#fav-num-div').show()
    $('#multi-num-div').hide()
    $('#submit-btn').show()
    $('#multi-fact-submit-btn').show()
    $('#multi-submit-btn').hide()
});

$('#enter-multi-nums').click(() => {
    $('#enter-multi-nums').hide()
    $('#enter-single-num').show()
    $('#fav-num-div').hide()
    $('#multi-num-div').show()
    $('#submit-btn').hide()
    $('#multi-fact-submit-btn').hide()
    $('#multi-submit-btn').show()
});

$('#add-num').click(() => {
    $('#additional-nums-ol').append($('<li>').attr('class', 'multi-num-li')
                                             .attr('id', `multi-num-li-${$('#additional-nums-ol li').length + 1}`))

    $(`#multi-num-li-${$('#additional-nums-ol li').length}`).append($('<input>').attr('type', 'text')
                                                                                .attr('class', 'multi-num-input')
                                                                                .attr('id', `multi-num-input-${$('#additional-nums-ol li').length}`))
});

$('#sub-num').click(() => {
    if ($('#additional-nums-ol li').length > 1) {
        $(`#multi-num-li-${$('#additional-nums-ol li').length}`).remove()
    }
});

// Get one fact about one number
function singleNumFact() {
    $('#res-div').empty();
    const num = $('#fav-num').val();

    axios.get(`http://numbersapi.com/${num}/math?json`)
        .then((res) => {
            $('#res-div').append($('<h2>').text('Fact About Your Favorite Number!').attr('id', 'fact-title'));
            $('#res-div').append($('<p>').text(res.data.text).attr('id', 'num-fact'));
        })
        .catch(err => console.log(err.message));
} 
$('#submit-btn').click(singleNumFact);

// Get one fact about multiple numbers
function multiNumFact() {
    $('#res-div').empty();
    let nums = [];
    let baseURL = 'http://numbersapi.com/';
    for (let i = 1; i <= $('#additional-nums-ol li').length; i++) {
        nums.push(parseInt($(`#multi-num-input-${i}`).val()));
    }
    let numStr = JSON.stringify(nums).replace('[', '').replace(']', '')
    url = baseURL + numStr;
    axios.get(url)
    .then((res) => {
        $('#res-div').append($('<h2>').text('Fact About Your Favorite Number!').attr('id', 'fact-title'));
        for (let i = 0; i <= nums.length; i++) {
            $('#res-div').append($('<p>').text(res.data[nums[i]]).attr('id', `num-fact-${i}`)) ;
        }
    }) 
    .catch(err => console.log(err.message));
}
$('#multi-submit-btn').click(multiNumFact);

// Get multiple facts about one number
function multiFacts() {
    $('#res-div').empty();
    const num = $('#fav-num').val();
    let numFacts = [];

    for (let i = 0; i < 4; i++) {
        numFacts.push(axios.get(`http://numbersapi.com/${num}/math?json`))
    }

    Promise.all(numFacts)
        .then(resArr => {
            $('#res-div').append($('<h2>').text('Fact About Your Favorite Number!').attr('id', 'fact-title'));
            for (res of resArr) {
                $('#res-div').append($('<p>').text(res.data.text).attr('id', 'num-fact'));
            }
        })
        .catch(err => console.log(err));
}
$('#multi-fact-submit-btn').click(multiFacts);
