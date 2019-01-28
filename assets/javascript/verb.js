$(document).ready(function() {
    
    var verbs = [
        'sip',
        'giggle',
        'smile',
        'frolick',
        'shimmy',
        'roll',
    ];

    var favoriteGifs = [];

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
        var favGif = $(this).parent().find($('<img>'));
        if(state === 'far fa-heart small') {
            $(this).attr('class','fas fa-heart small');
            favoriteGifs.push(favGif);
            console.log('gif added to favorites');
        } else if(state === 'fas fa-heart small') {
            $(this).attr('class','far fa-heart small');
            favoriteGifs.splice(favoriteGifs.indexOf(favGif), 1);
        }
        console.log(favoriteGifs);
    }

    function newButtons() {
        event.preventDefault()
        var input = $('#verb-input').val();
        verbs.push(input);
        $('.button-farm').append('<button class="searchbutton" value="' + input + '">' + input + '</button>');

        renderButtons(); 

    }; //newButtons

    $('#add-verb').on('click', function(){
        newButtons();
        $('#verb-input').val('');
    });

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

    }; // renderButtons


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

        }); 

    }; // doSearch
     
    $('.favorites').on('click', function() {
        $('#verb-view').empty();
        var state = $(this).attr('class');
        console.log('favorites heart clicked', state);
        if(state === 'far fa-heart favorites') {
            $(this).attr('class','fas fa-heart favorites');
            for(var i = 0; i < favoriteGifs.length; i++) {
                var div = $('<div class="image-container">');
                var info = favoriteGifs[i].prevObject[0].innerHTML;
                console.log(info);
                $(div).append(info);
                $('#verb-view').append(div);
            }
        } else if (state === 'fas fa-heart favorites'){
            $(this).attr('class','far fa-heart favorites');
        }

        $('.gif').on("click", animate);

        $('.fa-heart').on('click', favorite);

    });

    renderButtons();

}); // document.ready
