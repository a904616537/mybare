var apiUrl = 'http://server.mybarrefitness.com';
// var apiUrl = 'http://106.14.94.210:8091';



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
							window.location.href = 'http://www.mybarrefitness.com';
						}
					})				
				}else{
					swal('Oops..', 'Please check your phone number or email have been registration', 'warning');
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
		$('#user').html('<a href="login.html" class="login-icon">Log In</a>')
	}
	
})



