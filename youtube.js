$(document).ready(function () {
    $('button').click('on', function(){
        $.ajax({
            dataType: 'json',
            url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
            method: 'post',
            data: {
                query: "Superman",
                maxResults: 10
            },
            crossDomain: true,
            success: function(response){
                youtube_video = response.video.id[0];
                console.log("Response: ", youtube_video);
                var video = $('<iframe>', {
                    src: "https://www.youtube.com/embed/" + youtube_video
                });
                $('#main').append(video);
                }
            })
        })
});