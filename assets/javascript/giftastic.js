$(document).ready(function() {
    
    var verbs = [
        'skip',
        'leap',
        'frolick',
        'shimmy',
    ];


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
                $(div).append(p);
                $('#verb-view').append(div);
            } 

            $('.gif').on("click", function() {
                console.log('clicked');
                var state = $(this).attr('data-state');
                console.log(state);
                if(state === 'still'){
                    $(this).attr('src',$(this).attr('data-animate'));
                    $(this).attr('data-state','animate');
                } else {
                    $(this).attr('src',$(this).attr('data-still'));
                    $(this).attr('data-state','still');
                } 
        
            });

        }); 

    }; // doSearch

    renderButtons();

}); // document.ready
