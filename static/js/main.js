$(function() {
    console.log("\n\n\n\n\n\n\n");

    var photosets = [
        "72157648127281331",
        "72157648040800948"
    ];

    var photos = [];
    var url = "https://api.flickr.com/services/rest/?";
    var methods = {
        ps_photos: "flickr.photosets.getPhotos",
        ps_info: "flickr.photosets.getInfo",
        p_info: "flickr.photos.getInfo"
    };
    var api_key = "3b99b0b8f427d265b121e1af5e251312";

    photosets.forEach(function(ps) {
        $.getJSON(
            url+"method="+methods.ps_photos+"&api_key="+api_key+"&photoset_id="+ps+"&format=json&nojsoncallback=1",
            function(json) {
                var ps_photos = json.photoset.photo;
                ps_photos.forEach(function(p) {
                    $("#image").append(
                        "<img src=\"http://farm3.staticflickr.com/"+p.server+"/"+p.id+"_"+p.secret+".jpg\" />"
                    );

                    $.getJSON(
                        url+"method="+methods.p_info+"&api_key="+api_key+"&photo_id="+ p.id+"&format=json&nojsoncallback=1",
                        function(pjson) {
                            //pjson.photo.title._content;
                            //pjson.photo.description._content;
                        }
                    );
                });
            }
        );
    });
});