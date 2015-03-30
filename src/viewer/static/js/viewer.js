function set_nsfw() {
    var value = $('#nsfw_enabled').bootstrapSwitch('status');
    console.log('Setting NSFW to', value);
    if (! value) {
        $('.nsfw').find('.image_container').hide('slow');
    } else {
        $('.nsfw').find('.image_container').show('slow');
    }
}

function set_sfw() {
    var value = $('#sfw_enabled').bootstrapSwitch('status');
    console.log('Setting SFW to', value);
    if (! value) {
        $('.sfw').hide('slow');
    } else {
        $('.sfw').show('slow');
    }
}
$('.nsfw_warning').click(function () {
    $(this).parent().find('.image_container').toggle('slow');
});

$('#nsfw_enabled').on('switch-change', function (e, data) {
    var value = data.value;
    console.log('NSFW', value);
    set_nsfw();
});

$('#sfw_enabled').on('switch-change', function (e, data) {
    var value = data.value;
    console.log('SFW', value);
    set_sfw();
});


$.endlessPaginate({
    paginateOnScroll: true,
    paginateOnScrollMargin: 20,
    onCompleted: function(data) {
        console.log('New entries loaded, setting nsfw status');
        $('.nsfw').show();
        $('.sfw').show();
        set_nsfw();
        set_sfw();
}});

$(function() {
    set_nsfw();
    // All nsfw elements are hidden by default to avoid nasty surprises for people without javascript, show the divs but not the images
    $('.nsfw').show();
});