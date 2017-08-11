var apiUrl = 'http://38514e76.ngrok.io/';

// 手机端nav
$('#bars').on('click',function(){
	$('#dropdown').toggle();
});


// 注册成为会员
$('#enter').on('click',function(){
	var firstName = $('#firstName').val(),
		lastName = $('#lastName').val(),
		mobile = $("#mobile").val(),
		email = $('#email').val(),
		myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
		reg =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(!reg.test(email)){
		$('#email')
	}
	if(!myreg.test(mobile)) { 
	    alert('请输入有效的手机号码！'); 
	}
	if(firstName == ''){
		alert('请输入姓名! ');
	}if(lastName == ''){
		alert('请输入姓名! ');
	}else{
		$.post(apiUrl+'register',{first_name: firstName, last_name:lastName, email: email, phone:mobile},function(data){
			alert('注册成功');
			$('.registe .from').hide();
			$('.registe .succeed').show();
		});
	}
});



