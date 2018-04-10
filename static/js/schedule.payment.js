

var getOrderId = function() {
	var str = "" + moment().unix(),
    pad = "000000000",
    _id = moment().format("YYYY") + moment().format("MM") + pad.substring(0, pad.length - str.length) + str;
    return _id;
}

$('.payment').click(function() {
	$(this).css({display : 'none'})
	$('#qrcode').html('')

})

function onPayment(price, next) {
	var order = getOrderId();
	var cookieuser = $.cookie('user');
	
	// 没登录
	if(!cookieuser) {
		window.location.replace("login.html");
		return;
	} else {
		var user = JSON.parse(cookieuser).user;
		var total = price * 100
		$.ajax({
			cache : false,
			type  : "post",
			// url   : apiUrl + '/payment/sweep',
			url : 'http://server.mybarrefitness.com/payment/sweep',
			async : false,
			data  : 'order='+order+'&total=' +total+ '&user=' + user._id ,
			error : function(request) {
				swal('Oops...','For failure！','error');
			},
			success : function(result) {
				console.log('微信扫码测试', result);
				$('#qrcode').qrcode({width: 200,height: 200, text: result.code_url});
				$('.payment').css({display : 'block'})
			}
		});


		// var socket = io(apiUrl);
		var socket = io('http://server.mybarrefitness.com');
		socket.on('wechatPay', function(result) {
			console.log('socket io result:', result)
			if(result.order_id[0] == order) {
				swal({
	                  title             : 'Payment Complete!',
	                  text              : 'To access your course content, click on "Videos" under the profile icon in the upper-right corner. Enjoy the videos!',
	                  type              : 'success',
	                  showCancelButton  : false,
	                  confirmButtonText : 'OK'
	            }).then(() => {
	            	user.is_payment = true;
	            	$.cookie('user', JSON.stringify({user : user}), { expires: 7 });
	                next();
	            });
	        }
		});

	}
}
