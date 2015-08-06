/**********************************************************
 YOUTUBE
 **********************************************************/
var video = "";
var title = "";
var title_cut = "";


function pull_video(){
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
            var frame_div = $('<div>', {
                class: "frame_div",
            });
            video = $('<iframe>', {
                src: "https://www.youtube.com/embed/" + youtube_video,
                class: "iframe"
            });
            $(frame_div).append(video);
            $('.youTube_target').append(frame_div);
            console.log("Video: ", video);
        }
    })
}



/**********************************************************
CLICK
 **********************************************************/
$(document).ready(function () {
    $('body').on('click','.images', function(){
        $('#main_title').remove();
        $('.frame_div').remove();
        title = $(this).attr('title');
        console.log(title);
        cut_title();
        post_title();
        youtube_attach();
    });

    $(".modal-wide").on("show.bs.modal", function() {
        var height = $(window).height() - 200;
        $(this).find(".modal-body").css("max-height", height);
    });

function cut_title(){
    title_cut = title.substring(title.lastIndexOf("-")-1, title.lastIndexOf(title.length));
    console.log("Cut title: ", title_cut);
}

function post_title(){
    var text = $('<span>', {
        id: 'main_title',
        text: title_cut
    });
    $('h4').append(text);
    console.log("Append Title: ", title_cut);
}

function youtube_attach(){
    pull_video();

}
});
