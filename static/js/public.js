var apiUrl = 'http://localhost:9080';



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


$("#register").on('click',function(){
	$.ajax({
		cache : false,
		type  : "POST",
		url   : apiUrl + '/register',
		data  : $('#myfrom').serialize(),
		async : false,
		error : function(request) {
			alert('提交失败！')
		},
		success : function(data) {
			if(data.status){
				alert('Submit success!')
				window.location.replace("/index.html");
			}
			else alert('Submission failed, mobile phone number or email has been registered！')
		}
	});
});

$("#login").on('click',function(){
	var body = $('#loginfrom').serialize();
	$.ajax({
		cache : false,
		type  : "POST",
		url   : apiUrl + '/login',
		data  : body,
		async : false,
		error : function(request) {
			alert('Login failed！')
		},
		success : function(data) {
			if(data.status) {
				var user = {user : data.user, first_name : data.user.first_name, last_name:data.user.last_name}
				if(body.rember === 'no') {
					$.cookie('user', JSON.stringify(user), { expires: 7 });
				} else {
					$.cookie('user', JSON.stringify(user));
				}
				window.location.replace("index.html");
			}
			else alert('Login failed, please try again!')
		}
	});
});

$(function() {
	var cookieuser = $.cookie('user');
	if(typeof cookieuser != 'undefined') {
		var user = JSON.parse(cookieuser);
		$('#user').html('<a href="user.html" class="login-icon">'+ user.first_name + user.last_name +'</a>')
	} else {
		$('#user').html('<a href="login.html" class="login-icon"><i class="fa fa-user"></i></a>')
	}
	
})
