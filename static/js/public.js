// var apiUrl = 'http://server.mybarrefitness.com';
var homeUrl = 'http://www.mybarrefitness.com';
var apiUrl = 'http://test.mybarrefitness.com';
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


// cookie
$(function() {
	var cookieuser = $.cookie('user');
	if(typeof cookieuser != 'undefined') {
		var cookie = JSON.parse(cookieuser);
		$('#user_id').val(cookie.user._id);
		$('#user').html('<a href="#" class="login-icon">'+ cookie.user.first_name +" "+cookie.user.last_name +'</a>');
		$('#user-grid').html('<a href="user.html" class="login-icon">'+ cookie.user.first_name +" "+cookie.user.last_name +'</a>');
	} else {
		$('#user').html('<a href="login.html" class="login-icon">Log In</a>');
		$('#user-grid').html('<a href="login.html" class="login-icon">Log In</a>');
	}
	
})


// 注册
$("#register").on('click',function(){
	var firstName = $('#firstName').val(),
  		lastName = $('#lastName').val(),
  		mobile = $("#mobile").val(),
  		email = $('#email').val(),
  		phoneReg = /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0−9]3,4[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/,
  		reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

	if(firstName == '' || lastName == '' ){
  		swal('Oops...', 'Submission failed, name cannot be empty！', 'error');
	}
	else if(!reg.test(email) || email == ''){
		swal('Oops...', 'Submission failed, incorrect email address！', 'error');
 	}
 	else if(!phoneReg.test(mobile) || mobile == '') { 
	    swal('Oops...', 'Submission failed, incorrect phone number！', 'error');
	}else{
		$.ajax({
			cache : false,
			type  : "POST",
			url   : apiUrl + '/register',
			data  : $('#myfrom').serialize(),
			async : false,
			error : function(xhr) {
				console.log(JSON.stringify(xhr));
				swal('Oops..', 'Submission failed!', 'error');
			},
			success : function(data) {
				if(data.status) {
					swal({
						title: "Successfully Submitted",
						text: "Please sit tight! The MYbarre team will review your application and get back to you shortly. Keep a close eye on your email inbox!",
						type: "success",
						confirmButtonColor: "#5bc0de",
						confirmButtonText: "To Home!"
					}).then(function(isConfirm){
						if (isConfirm === true) {
							window.location.href = homeUrl;
						}
					})				
				}else{
					swal('Oops..', "Your email or phone number has already been registered in our system. If this doesn't seem right, please email us: info@mybarrefitness.com", 'warning');
				}

			}
		});
	}
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
  				// window.history.back()
  				window.location.href = homeUrl;
			}
			else swal('Oops...', 'Login failed, please try again!', 'error');
		}
	});
});


// 登出
$("#logOut").on('click',function(){
	$.cookie('user', null, { expires: -1 });
	window.location.href = homeUrl;
});
$("#logOut-grid").on('click',function(){
	$.cookie('user', null, { expires: -1 });
	window.location.href = homeUrl;
});


// 修改密码	
$('#change_pwd').on('click',function(){
	var pwd 	= $('#pwd').val(),
		pwd1    = $('#pwd1').val(),
		body    = $('#pwdfrom').serialize();

	if(pwd == pwd1){
		$.ajax({
			cache : false,
			type  : "PUT",
			url   : apiUrl + '/user',
			data  : body,
			async : false,
			error : function(request) {
				swal('Request failed！','', 'error');
			},
			success : function(data) {
				if(data.status) {
					swal('Done!','Password Successfully Updated','success').then(function(){
						$.cookie('user', null, { expires: -1 });
						location.href = "login.html";
					})
				} else {
					$('#prompt').html('<font style="color: red">'+data.err+'</font>');
				}
			}
		});
	}else{
		$('#prompt').html('<font style="color: red">Your new password and confirmed new password do not match.</font>');
	} 
})

// Host Studio
$('#studio_submit').on('click',function(){
	var body    = $('#train-from').serialize();

	$.ajax({
		cache : false,
		type  : "post",
		url   : apiUrl + '/studio',
		data  : body,
		async : false,
		error : function(request) {
			swal('Request failed！','', 'error');
		},
		success : function(data) {
			if(data.status) {
				swal('success','','success')
			} else {
				swal('failed','','error')
			}
		}
	});
})
	


