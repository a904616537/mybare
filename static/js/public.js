var apiUrl = 'http://38514e76.ngrok.io/';



// 手机端nav
$('#bars').on('click',function(){
	$('#dropdown').toggle();
});

$('.floatBox>.item-box').on('mouseenter',function(){
    $(this).find('.hide-box').fadeIn();
});
$('.floatBox>.item-box').on('mouseleave',function(){
    $(this).find('.hide-box').fadeOut();
});

