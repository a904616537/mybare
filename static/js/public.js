var apiUrl = 'http://server.mybarrefitness.com';
var homeUrl = 'http://www.mybarrefitness.com';
// var homeUrl = 'http://106.14.94.210:8090';

// var apiUrl = 'http://test.mybarrefitness.com';
// var apiUrl = 'http://localhost:9080';

// 手机端nav
$('#bars').on('click',function(){
	$('#dropdown').toggle();
});
$('#bar').on('click',function(){
	$('#user-dropdown').toggle();
})
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
		$('#video-tip').show();
	} else {
		$('#user').html('<a href="login.html" class="login-icon">Log In</a>');
		$('#user-grid').html('<a href="login.html" class="login-icon">Instructor Login</a>');
		$('#video-tip').hide();
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


  	if(firstName == ''){
  		$('.firstName').prev().html('First name cannot be empty');
  	}else if(lastName == ''){
  		$('.lastName').prev().html('Last name cannot be empty');
  	}else if(!phoneReg.test(mobile) || mobile == '') { 
  		$('.mobile').prev().html('Phone number cannot be empty');
  	}else if(!reg.test(email) || email == ''){
  		$('.email').prev().html('Email cannot be empty');
  	}else if($('.address').val() == ''){
  		$('.address').prev().html('Address cannot be empty');
  	}else if($('.birth').val() == ''){
  		$('.birth').prev().html('Date of birth cannot be empty');
  	}else if($('.nationality').val() == ''){
  		$('.nationality').prev().html('Nationality cannot be empty');
  	}else if($('.occupation').val() == ''){
  		$('.occupation').prev().html('Occupation cannot be empty');
  	}else if($('.howfind').val() == ''){
  		$('.howfind').prev().html('This field cannot be left empty');
  	}else if($('.elaborate').val() == ''){
  		$('.elaborate').prev().html('This field cannot be left empty');
  	}else if($('.discipline').val() == ''){
  		$('.table').prev().html('This field cannot be left empty');
  	}else if($('.level').val() == ''){
  		$('.table').prev().html('This field cannot be left empty');
  	}else if($('.experience').val() == ''){
  		$('.table').prev().html('This field cannot be left empty');
  	}else if($('.prior').val() == ''){
  		$('.prior').prev().html('This field cannot be left empty');
  	}else if($('.share').val() == ''){
  		$('.share').prev().html('This field cannot be left empty');
  	}else if($('input:radio[name="isvpn"]:checked').val() == null){
  		$('.vpn').next().html('A selection must be made');
  	}else if($('.device').val() == ''){
  		$('.device').prev().html('This field cannot be left empty');
  	}else if($('input:radio[name="QQ"]:checked').val() == null){
  		$('.qq').next().html('A selection must be made');
  	}else if($('input:radio[name="heart_condition"]:checked').val() == null){
  		$('.heart_condition').next().html('A selection must be made');
  	}else if($('input:radio[name="workout"]:checked').val() == null){
  		$('.workout').next().html('A selection must be made');
  	}else if($('input:radio[name="high_blood"]:checked').val() == null){
  		$('.high_blood').next().html('A selection must be made');
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
  				
  				setTimeout(function() {
  					window.location.href = homeUrl;
  				}, 500);
  				
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
	var body     = $('#train-from').serialize();
	var name     = $('#name').val(),
		email    = $('#email').val(),
		wechat   = $('#wechat').val(),
		phoneReg = /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0−9]3,4[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/,
		reg      = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
		phone    = $('#phone').val();

	if(name == ''){
		swal('Oops...', 'Submission failed, name cannot be empty！', 'error');
	}else if(wechat == ''){
		swal('Oops...', 'Submission failed, wechat ID cannot be empty！', 'error');
	}else if(!reg.test(email) || email == ''){
		swal('Oops...', 'Submission failed, incorrect email address！', 'error');
 	}else if(!phoneReg.test(phone) || phone == '') { 
	    swal('Oops...', 'Submission failed, incorrect telephone number！', 'error');
	}else{
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
	}	
})
	


