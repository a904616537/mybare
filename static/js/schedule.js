$(function() {
	var cookieuser = $.cookie('user');
	var geturl = apiUrl + '/class'
	if(typeof cookieuser != 'undefined') {
		var cookie = JSON.parse(cookieuser);
		geturl = apiUrl + '/class?user=' + cookie.user._id;
	}
	console.log(geturl)
	$.ajax({
		cache : false,
		type  : "get",
		url   : geturl,
		async : false,
		error : function(xhr) {
			swal('Oops..', 'Submission failed!', 'error');
		},
		success : function(result) {
			var html = '<tr class="table-title">\
                        <td>Status</td>\
                        <td>Date</td>\
                        <td>Course</td>\
                        <td>Location</td>\
                        <td></td>\
                    </tr>';
			for(var i = 0; i < result.data.length; i++) {
				var item =  result.data[i];
				var data = item.data;
				var status = 'UPCOMING TRAININGS';
				var isRegister = '<a href="javascript:;" class="regist-btn" price="'+ data.price+'" ref="'+data._id+'">Register</a>';
				var d2 = new Date();//取今天的日期
				var d1 = new Date(Date.parse(data.endTime));

				if(data.sign_user.length >= data.limit) {
					status = 'COMPLETED';
					isRegister = '<a class="full-btn">Registration Ended</a>';
				} else if(d1 < d2){
					status = 'COMPLETED';
					isRegister = '<a class="full-btn">Registration Ended</a>';
				} else if(item.selected) {
					isRegister = '<a class="full-btn">You have been registered</a>';
				}
				var str = '<tr>\
					<td>'+status+'</td>\
					<td>'+ data.time  +'</td>\
					<td>'+ data.name +'</td>\
					<td>'+ data.location +'</td>\
					<td>'+ isRegister +'</td>\
				</tr>';
				html += str;
			}

			$('.table').append(html);
			$('.regist-btn').on('click', function(){
				if(typeof cookieuser != 'undefined') {
					var cookie = JSON.parse(cookieuser);
					var price = $(this).attr('price');
					var _id = $(this).attr('ref');
					onPayment(price,function() {
						$.ajax({
							cache : false,
							type  : "post",
							url   : apiUrl + '/class/apply',
							async : false,
							data : 'courses=' + _id + '&user=' + cookie.user._id,
							error : function(request) {
								swal('Oops','For failure！','error');
							},
							success : function(result) {
								console.log(result)
								setTimeout(function() {
									window.location.replace("user.html");
								}, 1000);
							}
						});
					});
				} else {
					window.location.replace("form.html");
				}
			})
			
		}
	});

})