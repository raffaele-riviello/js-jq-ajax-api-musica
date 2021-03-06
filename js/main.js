$(document).ready(function() {
    // *** LOGIC ENGINE *** //

    // *** HANDLEBARS *** //
    var source = $("#album-template").html();
    var albumTemplate = Handlebars.compile(source);


    $('.genre-selector').change(function () {
       var genreSelected = $(this).val();
       // console.log(genreSelected); //debug
       if (genreSelected == "") {
           $('.album').show();
       } else {
           $('.album').each(function(){
               if(genreSelected.toLowerCase() == $(this).data('genre').toLowerCase()) {
                   $(this).show();
               } else {
                   $(this).hide();
               }
           });
       }
    });

    $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/array/music",
        method: "GET",
        success: function (data) {
            console.log(data);
            var albums = data.response;
            for (var i = 0; i < albums.length; i++) {
                var album = albums[i];
                console.log(album);
                var albumInformation = {
                    poster: album.poster,
                    title: album.title,
                    author: album.author,
                    year: album.year,
                    genre: album.genre
                }
                var templateWithData = albumTemplate(albumInformation);
                $('.albums-container').append(templateWithData);
            }
        },
        error: function () {
            alert('Error');
        }
    })


});
