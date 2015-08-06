/**
 * Created by Andy on 8/5/15.
 */
$(document).ready(function () {
    console.log('here',$('.images'))
    //THIS IS ANOTHER CLICK HANDLER
    $('body').on('click','.images',function(){console.log('do stuff');})
    $('.images').click(function () {
        console.log($(this).attr('title'))
    })
});