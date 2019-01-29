$(document).ready(function() {
    
    // defining variables
    var verbs = [
        'sip',
        'giggle',
        'boogie',
        'frolick',
        'shimmy',
        'roll',
    ];

    var clicked = false; 

    var favoriteGifs = [];

    // defining functions
    function animate() {
        var state = $(this).attr('data-state');
        if(state === 'still'){
            $(this).attr('src',$(this).attr('data-animate'));
            $(this).attr('data-state','animate');
        } else {
            $(this).attr('src',$(this).attr('data-still'));
            $(this).attr('data-state','still');
        } 
    };

    function favorite() {
        var state = $(this).attr('class');
        var favGif = $(this).parent().find($('<innerHTML>'));
        if(state === 'far fa-heart small') {
            $(this).attr('class','fas fa-heart small');
            favoriteGifs.push(favGif);
            console.log('gif added to favorites');
            console.log(favoriteGifs);
        } else if(state === 'fas fa-heart small') {
            $(this).attr('class','far fa-heart small');
            favoriteGifs.splice(favoriteGifs.indexOf($('this'), 1));
            console.log('gif removed from favorites');
            console.log(favoriteGifs);

            if(clicked === true) {
                $('#verb-view').empty();
                for(var i = 0; i < favoriteGifs.length; i++) {
                    var div = $('<div class="image-container">');
                    var info = favoriteGifs[i].prevObject[0].innerHTML;
                    $(div).append(info);
                    $('#verb-view').append(div);
                }

            }

            $('.fa-heart').on('click', favorite);

        }
    }; // end favorite

    function populateFavorites() {
        $('#title').text('favorites');
        $('#verb-view').empty();
        var state = $(this).attr('class');
        console.log('favorites heart clicked');
        if(state === 'far fa-heart favorites-button' && clicked === false) {
            clicked = true;
            $(this).attr('class','fas fa-heart favorites-button');
            for(var i = 0; i < favoriteGifs.length; i++) {
                var div = $('<div class="image-container">');
                var info = favoriteGifs[i].prevObject[0].innerHTML;
                console.log(info);
                $(div).append(info);
                $('#verb-view').append(div);
            }
        } else if (state === 'fas fa-heart favorites-button' && clicked === true) {
            clicked = false
            $(this).attr('class','far fa-heart favorites-button');
        }

        $('.gif').on("click", animate);

        $('.fa-heart').on('click', favorite);

        $('#verb-input').focus();
    }; // end populateFavorites

    function newButtons() {
        event.preventDefault()
        var input = $('#verb-input').val();
        verbs.push(input);
        $('.button-farm').append('<button class="searchbutton" value="' + input + '">' + input + '</button>');

        $('#verb-input').val('');

        renderButtons(); 
    }; // end newButtons

    function renderButtons() {
        $('#verb-input').focus();

        $('.button-farm').html('');
        for (var i = 0; i < verbs.length; i++) {
            var button = $('<button>');
            button.text(verbs[i]);
            button.addClass('searchbutton');
            $('.button-farm').append(button);
        }

        $('.searchbutton').on('click', doSearch);
    }; // end renderButtons


    function doSearch() {
        $('#list').css({'display': 'none'});
        console.log('clicked');
        $('#verb-view').empty();

        var button = $(this).text();
        console.log(button);

        $('#title').html(button);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + button + "&api_key=Uhq8lpKKXrzJXUNAcSLTiGSBjjn2VrZa&limit=10$rating=pg-13";
        
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response){
            console.log(queryURL);
            console.log(response);
            for(var i = 0; i < response.data.length; i++) {
                var div = $('<div class="image-container">');
                var p = $('<p>');
                var img = $('<img>');
                img.attr('class', 'gif');
                var source = response.data[i].images.downsized.url;
                var still = response.data[i].images.downsized_still.url;
                img.attr({src: still, 'data-still': still, 'data-animate': source, 'data-state' : 'still' , width: '300px', height: 'auto'});
                $(div).append(img);
                $(p).append(response.data[i].rating.toUpperCase());
                var smallHeart = $('<i class="far fa-heart small"></i>');
                $(div).append(p, smallHeart);
                $('#verb-view').append(div);
            } 

            $('.gif').on("click", animate);

            $('.fa-heart').on('click', favorite);
            
            $('#verb-input').focus();

            $('.searchbutton').on('click', function(){
                clicked = false;
                $('.favorites-button').attr('class','far fa-heart favorites-button');
            });
        }); 
    }; // end doSearch

    // calling functions
    $('#add-verb').on('click', newButtons);
    
    $('.favorites-button').on('click', populateFavorites);

    renderButtons();
    // favorite();

}); // end document.ready
