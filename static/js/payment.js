var apiUrl = 'http://server.mybarrefitness.com';
// var apiUrl = 'http://localhost:9080';
var homeUrl = 'http://www.mybarrefitness.com';
// var apiUrl = 'http://test.mybarrefitness.com';
// var homeUrl = 'http://106.14.94.210:8090';

var getOrderId = function() {
	var str = "" + moment().unix(),
    pad = "000000000",
    _id = moment().format("YYYY") + moment().format("MM") + pad.substring(0, pad.length - str.length) + str;
    return _id;
}

$(function() {
	var order = getOrderId();
	var cookieuser = $.cookie('user');
	
	// 没登录
	if(!cookieuser) {
		window.location.replace("login.html");
		return;
	} else {
		var user = JSON.parse(cookieuser).user;
		$.ajax({
			cache : false,
			type  : "post",
			url   : apiUrl + '/payment/sweep',
			async : false,
			data  : 'order='+order+'&total=400000&user=' + user._id ,
			error : function(request) {
				swal('Oops...','For failure！','error');
			},
			success : function(result) {
				console.log('微信扫码测试', result);
				$('#qrcode').qrcode({width: 200,height: 200, text: result.code_url});
			}
		});
	}

	var socket = io(apiUrl);
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
                window.location.href = homeUrl;
            });
        }
	});
})
