$(function() {
    console.log("\n\n\n\n\n\n\n");

    var photosets = [
        "72157648490544211",
        "72157648490550711"
    ];

    var photos = {};
    var url = "https://api.flickr.com/services/rest/?";
    var methods = {
        ps_photos: "flickr.photosets.getPhotos",
        ps_info: "flickr.photosets.getInfo",
        p_info: "flickr.photos.getInfo"
    };
    var api_key = "0b2cf9d025573009ab21a8085dae6597";

    photosets.forEach(function(ps) {
        $.getJSON(
            url+"method="+methods.ps_photos+"&api_key="+api_key+"&photoset_id="+ps+"&format=json&nojsoncallback=1",
            function(json) {
                var ps_photos = json.photoset.photo;
                ps_photos.forEach(function(p) {
                    photos[p.id] = {
                        "image": p.id+"_"+p.secret
                    };

                    $.getJSON(
                        url+"method="+methods.p_info+"&api_key="+api_key+"&photo_id="+ p.id+"&format=json&nojsoncallback=1",
                        function(pjson) {
                            photos[p.id].title = pjson.photo.title._content;
                            photos[p.id].description = pjson.photo.description._content;
                            $("#image").prepend(
                                "<div data-id=\""+p.id+"\">" +
                                "<img src=\"http://farm3.staticflickr.com/"+p.server+"/"+photos[p.id].image+".jpg\" />" +
                                "<div>"+photos[p.id].title+"</div>" +
                                "<div>"+photos[p.id].description+"</div>" +
                                "</div>" +
                                "<br />"
                            );
                        }
                    );
                });
            }
        );
    });

    $(document).ajaxStop(function() {
        //load into window
    })
});