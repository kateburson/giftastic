$(document).ready(function() {
    
    var verbs = [
        'skip',
        'leap',
        'frolick',
        'wiggle',
        'mime'
    ];

    var gifURL = [];
    var gifRating = [];

    function newButtons() {

        event.preventDefault()

        var input = $("#verb-input").val();
        verbs.push(input);
        $('.button-farm').append('<button class="new-verb" value="' + input + '">' + input + '</button>');
        
    }; //newButtons

    $('#add-verb').on('click', newButtons);

    function renderButtons() {
        $('.button-farm').html('');

        for (var i = 0; i < verbs.length; i++) {
            var button = $('<button>');
            button.text(verbs[i]);
            button.addClass('searchbutton');
            $('.button-farm').append(button);
        }

        $('.searchbutton').on('click', doSearch);

    }; // renderButtons


    function doSearch() {

        console.log('clicked');

        var button = $(this).text();
        console.log(button);

        var queryURL = $.get("https://api.giphy.com/v1/gifs/search?q=" + button + "&api_key=Uhq8lpKKXrzJXUNAcSLTiGSBjjn2VrZa&limit=10");
        queryURL.done(function(data) { console.log("success got data", data); });

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(queryURL);
            console.log(response);
            $('#verb-view').empty();
            for(var i = 0; i < response.data.length; i++) {
                gifURL.push(response.data[i].bitly_url);
                gifRating.push(response.data[i].rating);
            } 
        });
        
        for(var i = 0; i < 10; i++){
        $('#verb-view').append('<img src="' + gifURL + '">');
        $('#verb-view').append('<p>Rating: ' + gifRating + '</p>');
        }

    }; // doSearch

    renderButtons();

}); // document.ready
