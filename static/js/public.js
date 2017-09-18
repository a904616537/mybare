var apiUrl = 'http://server.mybarrefitness.com';
// var apiUrl = 'http://localhost:9080';



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

// 注册
$("#register").on('click',function(){
	var firstName = $('#firstName').val(),
  		lastName = $('#lastName').val(),
  		mobile = $("#mobile").val(),
  		email = $('#email').val(),
  		phoneReg = /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0−9]3,4[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/,
  		reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;


  		if(firstName == ''){
		  	swal('Oops...', 'Submission failed, name cannot be empty！', 'error');
		}
		else if(!reg.test(email) || email == ''){
			swal('Oops...', 'Submission failed, incorrect email address！', 'error');
	 	}
	 	else if(!myreg.test(mobile) || mobile == '') { 
		    swal('Oops...', 'Submission failed, incorrect phone number！', 'error');
		}

	$.ajax({
		cache : false,
		type  : "POST",
		url   : apiUrl + '/register',
		data  : $('#myfrom').serialize(),
		async : false,
		error : function(request) {
			swal('Oops..', 'Submission failed!', 'error');
		},
		success : function(data) {
			if(data.status) {

				swal({
					title: "Registered Success",
					text: "Please check your registered email!",
					type: "success",
					confirmButtonColor: "#5bc0de",   confirmButtonText: "To Home!"
				},
				function(){
					window.location.replace("/index.html");
				});

			} else {
				swal('Oops...', 'Submission failed, mobile phone number or email has been registered！', 'error');
			}	
		}
	});
});

// 登录
$("#login").on('click',function(){
	var body = $('#loginfrom').serialize();
	$.ajax({
		cache : false,
		type  : "POST",
		url   : apiUrl + '/login',
		data  : body,
		async : false,
		error : function(request) {
			swal('Oops...', 'Login failed！', 'error');
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
			else swal('Oops...', 'Login failed, please try again!', 'error');

		}
	});
});

// cookie
$(function() {
	var cookieuser = $.cookie('user');
	if(typeof cookieuser != 'undefined') {
		var user = JSON.parse(cookieuser);
		$('#user').html('<a href="user.html" class="login-icon">'+ user.first_name + user.last_name +'</a>')
	} else {
		$('#user').html('<a href="login.html" class="login-icon"><i class="fa fa-user"></i></a>')
	}
	
})
