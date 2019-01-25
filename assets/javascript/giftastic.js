$(document).ready(function() {
    
    var verbs = [
        'skip',
        'leap',
        'frolick',
        'shimmy',
    ];


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
            for(var i = 0; i < queryURL.length; i++) {
                var div = $('<div class="image-container">');
                var p = $('<p>');
                var img = $('<img>');
                var imgURL = response.data[i].images.downsized.url;
                img.attr({src: imgURL, width: '300px', height: 'auto'});
                $(div).append(img);
                $(p).append(response.data[i].rating);
                $(div).append(p);
                $('#verb-view').append(div);
            } 
        }); 
        


    }; // doSearch

    renderButtons();

}); // document.ready
