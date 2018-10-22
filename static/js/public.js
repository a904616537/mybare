var apiUrl = 'http://server.mybarrefitness.com';
var homeUrl = 'http://www.mybarrefitness.com';
// var homeUrl = 'http://106.14.94.210:8090';
// var apiUrl = 'http://test.mybarrefitness.com';
// var apiUrl = 'http://localhost:9080';
// var homeUrl = 'http://localhost:3000';

// 中英文切换
var type=navigator.appName
if (type=="Netscape"){
var lang = navigator.language
}
else{
var lang = navigator.userLanguage
}
//取得浏览器语言的前两个字母
var lang = lang.substr(0,2)

var message = {
	zh : {
		error : {
			title          : '哎呀...',
			msg1           : '出错了!',
			login          : '登陆失败！',
			login_401      : '你的 Mybarre 账户当前为锁定状态！',
			login_401_desc : '你的账户已被锁定！',
			login_password : '登录失败，请再试一次!',
			password_msg   : '你的新密码和确认密码不匹配。',
			agree          : '你必须同意我们的条款!',
			submission     : '注册失败!',
			request        : '提交失败!'
		},
		success : {
			title          : '谢谢！',
			msg            : '你的申请已经提交给MYbarre团队审批。如果你的申请成功，将在24小时内收到一封电子邮件，里面有你的账户密码。',
			password_title : '完成!',
			password       : '密码更新成功'
		},
		msg : {
			login : '登录',
			msg1 : '姓氏不能为空',
			msg2 : '名字不能为空',
			msg3 : '请填写你的手机号码',
			msg4 : '请填写你的电子游戏',
			msg5 : '请填写你的地址',
			msg6 : '请填写你的出生日期',
			msg7 : '请填写你的国籍',
			msg8 : '请填写你的职业',
			msg9 : '这里的信息不能为空',
			msg10 : '必须做出选择',
			msg11 : '提交失败，名字不能为空！',
			msg12 : '提交失败，微信号不能为空！',
			msg13 : '提交失败，你的邮箱地址不能为空！',
			msg14 : '提交失败，你的手机号码信息不正确！',
		}
	},
	en : {
		error : {
			title          : 'Oops...',
			msg1           : 'For failure!',
			login          : 'Login failed！',
			login_401      : 'Your MYbarre Account is currently locked',
			login_401_desc : 'If you would like to gain access to your Instructor Videos and unlock your account please email: info@mybarrefitness.com',
			login_password : 'Login failed, please try again!',
			password_msg   : 'Your new password and confirmed new password do not match.',
			agree          : 'You must agree with our terms!',
			submission     : 'Submission failed!',
			request        : 'Request failed!'
			
		},
		success : {
			title          : 'Thank You!',
			msg            : 'Your application has been submitted to the MYbarre team for approval. If your application is successful you will receive an email in the next 24 hours with your account password.',
			password_title : 'Done!',
			password       : 'Password Successfully Updated'
		},
		msg : {
			login : 'Log In',
			msg1  : 'First name cannot be empty',
			msg2  : 'Last name cannot be empty',
			msg3  : 'Phone number cannot be empty',
			msg4  : 'Email cannot be empty',
			msg5  : 'Address cannot be empty',
			msg6  : 'Date of birth cannot be empty',
			msg7  : 'Nationality cannot be empty',
			msg8  : 'Occupation cannot be empty',
			msg9  : 'This field cannot be left empty',
			msg10 : 'A selection must be made',


			msg11 : 'Submission failed, name cannot be empty！',
			msg12 : 'Submission failed, wechat ID cannot be empty！',
			msg13 : 'Submission failed, incorrect email address！',
			msg14 : 'Submission failed, incorrect telephone number！',
		}
	}
}

var cookie_lang = $.cookie('lang');
if(cookie_lang) {
	setLang(cookie_lang);
} else {
	setLang(lang);
}

$('.langToggle').on('click',function(){
	var lang = $('.langToggle .lang').attr('data');
	$.cookie('lang', lang, { expires: 7 });
	setLang(lang);
});

function setLang(lang){
	if(lang == 'en'){
		$('.langToggle').html('<span class="lang" data="zh"><i class="iconfont icon-fuhao-zhongwen fontlang"></i></span>');
		$('.changeLang .zh').hide();
		$('.changeLang .en').show();
	}else{
		$('.langToggle').html('<span class="lang" data="en"><i class="iconfont icon-fuhao-yingwen fontlang"></i></span>');
		$('.changeLang .en').hide();
		$('.changeLang .zh').show();
	}
}


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

console.log('socket')
var socket = io(apiUrl);

// cookie
$(function() {
	var lang = $.cookie('lang') || 'zh';;
	var msg = message[lang];
	var levelToString = function(level) {
		switch(level) {
			case 0:
			return 'Pre Course Instructor';
			case 1:
			return 'Instructor in Training';
			case 2:
			return 'MBI (MYbarre Instructor)';
			case 3:
			return 'MBI Elite/MBI Master';
		}
	}
	var cookieuser = $.cookie('user');

	if(typeof cookieuser != 'undefined') {
		var cookie = JSON.parse(cookieuser);
		var user = JSON.parse(cookieuser).user;
		$('#user_id').val(cookie.user._id);
		$('#user').html('<a href="profile.html" class="login-icon">'+ cookie.user.first_name +" "+cookie.user.last_name +'</a>');
		$('#user_login').hide();

		$('#user-grid').html('<a href="profile.html" class="login-icon">'+ cookie.user.first_name +" "+cookie.user.last_name +'</a>');
		$('#user-grid-login').hide();
		
		$('#profile').html(cookie.user.first_name +" "+cookie.user.last_name)
		$('#level').html(levelToString(cookie.user.level))
		$('#email').html(cookie.user.email)
		$('#video-tip').show();

		
		socket.on('user-level', function(result) {
			console.log('socket io result:', result)
			user.level = Number(result.level);
			if(user.level < 0) {
				$.cookie('user', null, { expires: -1 });
				swal(msg.error.login_401, msg.error.login_401_desc, 'warning').then(function (text) {
					window.location.href = homeUrl;
				});
			} else {
				$.cookie('user', JSON.stringify({user : user}), { expires: 7 });
			}
		});

	} else {

		$('#user_login').show();
		$('#user').hide();
		$('#user').html('<a href="login.html" class="login-icon">'+msg.msg.login+'</font></a>');
		$('#user-grid').html('<a href="login.html" class="login-icon">Instructor Login</a>');
		$('#video-tip').hide();
	}
	
})


// 注册
$("#register").on('click',function(){

	var lang = $.cookie('lang') || 'zh';;
	var msg = message[lang];
		
	var firstName = $('#firstName').val(),
  		lastName = $('#lastName').val(),
  		mobile = $("#mobile").val(),
  		email = $('#email').val(),
  		phoneReg = /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0−9]3,4[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/,
  		reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;



  	if(firstName == ''){
  		$('.firstName').prev().html(msg.msg.msg1);
		$('html,body').animate({scrollTop:$('.q1').offset().top},500)
  	}else if(lastName == ''){
  		$('.lastName').prev().html(msg.msg.msg2);
  		$('html,body').animate({scrollTop:$('.q2').offset().top},500)
  	}else if(!phoneReg.test(mobile) || mobile == '') { 
  		$('.mobile').prev().html(msg.msg.msg3);
  		$('html,body').animate({scrollTop:$('.q3').offset().top},500)
  	}else if(!reg.test(email) || email == ''){
  		$('.email').prev().html(msg.msg.msg4);
  		$('html,body').animate({scrollTop:$('.q4').offset().top},500)
  	}else if($('.address').val() == ''){
  		$('.address').prev().html(msg.msg.msg5);
  		$('html,body').animate({scrollTop:$('.q5').offset().top},500)
  	}else if($('.birth').val() == ''){
  		$('.birth').prev().html(msg.msg.msg6);
  		$('html,body').animate({scrollTop:$('.q6').offset().top},500)
  	}else if($('.nationality').val() == ''){
  		$('.nationality').prev().html(msg.msg.msg7);
  		$('html,body').animate({scrollTop:$('.q7').offset().top},500)
  	}else if($('.occupation').val() == ''){
  		$('.occupation').prev().html(msg.msg.msg8);
  		$('html,body').animate({scrollTop:$('.q8').offset().top},500)
  	}else if($('.howfind').val() == ''){
  		$('.howfind').prev().html(msg.msg.msg9);
  		$('html,body').animate({scrollTop:$('.q9').offset().top},500)
  	}else if($('.elaborate').val() == ''){
  		$('.elaborate').prev().html(msg.msg.msg9);
  		$('html,body').animate({scrollTop:$('.q10').offset().top},500)
  	}else if($('.discipline').val() == ''){
  		$('.table').prev().html(msg.msg.msg9);
  		$('html,body').animate({scrollTop:$('.q11').offset().top},500)
  	}else if($('.level').val() == ''){
  		$('.table').prev().html(msg.msg.msg9);
  		$('html,body').animate({scrollTop:$('.q11').offset().top},500)
  	}else if($('.experience').val() == ''){
  		$('.table').prev().html(msg.msg.msg9);
  		$('html,body').animate({scrollTop:$('.q11').offset().top},500)
  	}else if($('.prior').val() == ''){
  		$('.prior').prev().html(msg.msg.msg9);
  		$('html,body').animate({scrollTop:$('.q12').offset().top},500)
  	}else if($('.share').val() == ''){
  		$('.share').prev().html(msg.msg.msg9);
  		$('html,body').animate({scrollTop:$('.q13').offset().top},500)
  	}else if($('.device').val() == ''){
  		$('.device').prev().html(msg.msg.msg9);
		$('html,body').animate({scrollTop:$('.q15').offset().top},500)
  	}else if($('input:radio[name="QQ"]:checked').val() == null){
  		$('.qq').next().html(msg.msg.msg10);
  		$('html,body').animate({scrollTop:$('.q16').offset().top},500)
  	}else if($('input:radio[name="heart_condition"]:checked').val() == null){
  		$('.heart_condition').next().html(msg.msg.msg10);
  		$('html,body').animate({scrollTop:$('.q17').offset().top},500)
  	}else if($('input:radio[name="workout"]:checked').val() == null){
  		$('.workout').next().html(msg.msg.msg10);
  		$('html,body').animate({scrollTop:$('.q18').offset().top},500)
  	}else if($('input:radio[name="high_blood"]:checked').val() == null){
  		$('.high_blood').next().html(msg.msg.msg10);
  		$('html,body').animate({scrollTop:$('.q19').offset().top},500)
  	}

  	else if($('.wechatid').val() == ''){
  		$('.wechatid').next().html(msg.msg.msg9);
  		$('html,body').animate({scrollTop:$('.q20').offset().top},500)
  	}else if($('.city').val() == ''){
  		$('.city').next().html(msg.msg.msg9);
  		$('html,body').animate({scrollTop:$('.q21').offset().top},500)
  	}else if($('input:radio[name="lang"]:checked').val() == ''){
  		$('.lang').next().html(msg.msg.msg10);
  		$('html,body').animate({scrollTop:$('.q22').offset().top},500)
  	}else{
  		var is_checked = $('#agree').is(':checked')
		swal(msg.error.agree, '', 'warning')
		if(!is_checked) return;

  		$.ajax({
			cache : false,
			type  : "POST",
			url   : apiUrl + '/register',
			data  : $('#myfrom').serialize(),
			async : false,
			error : function(xhr) {
				console.log(JSON.stringify(xhr));

				swal(msg.error.title, msg.error.submission, 'error');
			},
			success : function(data) {
				swal({
					title : msg.success.title,
					text  : msg.success.msg,
					type  : "success",
					confirmButtonColor: "#5bc0de",
					confirmButtonText: "To Home!"
				}).then(function(isConfirm){
					if (isConfirm === true) {
						window.location.href = homeUrl;
					}
				})
			}
		});
  	}
});


// 登录
$("#login").on('click',function(){
	var lang = $.cookie('lang') || 'zh';
	var msg = message[lang];

	var body = $('#loginfrom').serialize();
	$.ajax({
		cache : false,
		type  : "POST",
		url   : apiUrl + '/login',
		data  : body,
		async : false,
		error : function(request) {

			swal(msg.error.title, msg.error.login, 'error');
		},
		success : function(data) {
			console.log('data', data)
			if(data.status) {
				var user = {user : data.user, first_name : data.user.first_name, last_name:data.user.last_name}
				if(body.rember === 'no') {
					$.cookie('user', JSON.stringify(user), { expires: 7 });
				} else {
					$.cookie('user', JSON.stringify(user));
				}
  				// window.history.back()
  				
  				setTimeout(function() {
  					window.location.href = 'profile.html';
  				}, 500);
  				
			}
			else {
				// 账户被锁定!
				if(data.locking) {
					swal(msg.error.login_401, msg.error.login_401_desc, 'warning');
					return;
				}
				swal(msg.error.title, msg.error.login_password, 'error');
			}
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
	var lang = $.cookie('lang') || 'zh';;
	var msg = message[lang];
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
				swal(msg.error.request,'', 'error');
			},
			success : function(data) {
				if(data.status) {
					swal(msg.success.password_title,msg.success.password,'success').then(function(){
						$.cookie('user', null, { expires: -1 });
						location.href = "login.html";
					})
				} else {
					$('#prompt').html('<font style="color: red">'+data.err+'</font>');
				}
			}
		});
	}else{
		$('#prompt').html('<font style="color: red">'+msg.error.password_msg+'</font>');
	} 
})

// Host Studio
$('#studio_submit').on('click',function(){
	var lang = $.cookie('lang') || 'zh';;
	var msg = message[lang];
	var body     = $('#train-from').serialize();
	var name     = $('#name').val(),
		email    = $('#email').val(),
		wechat   = $('#wechat').val(),
		phoneReg = /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0−9]3,4[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/,
		reg      = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
		phone    = $('#phone').val();

	if(name == ''){
		swal(msg.error.title, msg.msg.msg11, 'error');
	}else if(wechat == ''){
		swal(msg.error.title, msg.msg.msg12, 'error');
	}else if(!reg.test(email) || email == ''){
		swal(msg.error.title, msg.msg.msg13, 'error');
 	}else if(!phoneReg.test(phone) || phone == '') { 
	    swal(msg.error.title, msg.msg.msg14, 'error');
	}else{
		$.ajax({
			cache : false,
			type  : "post",
			url   : apiUrl + '/studio',
			data  : body,
			async : false,
			error : function(request) {
				swal(msg.error.request,'', 'error');
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
	


