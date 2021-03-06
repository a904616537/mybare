var apiUrl = 'http://server.mybarrefitness.com';
// var apiUrl = 'http://test.mybarrefitness.com';
// var apiUrl = 'http://localhost:9080';

function getvideos (level, user_id){

	var cookieuser = $.cookie('user');
	// 没登录
	if(typeof cookieuser == 'undefined') {
		window.location.replace("login.html");
		return;
	} else {
		var user = JSON.parse(cookieuser).user;
		// 移除用户前往付款
		// if(!user.is_payment) {
		// 	window.location.replace("topay.html");
		// 	return;
		// }
		$.ajax({
			cache : false,
			type  : "GET",
			url   : apiUrl + '/courses/list/video/' + level + '/' + user._id,
			async : false,
			error : function(request) {
				swal('Oops...','For failure！', 'error');
			},
			success : function(result) {

				if(result.status) {
					for(var i = 0; i < result.data.length; i++) {
						var item =  result.data[i];
						var str = '<div class="panel panel-default">\
		                        <div class="panel-heading" role="tab" id="heading'+i+'">\
		                        	<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+i+'" aria-expanded="true" aria-controls="collapse'+i+'">\
		                            <h4 class="panel-title">\
					                ' + item.courses.name;
					        str += '</h4>\
		                            </a>\
		                        </div>\
		                        <div id="collapse'+i+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+i+'">\
		                            <div class="panel-body">\
		                                <div class="row">';
					                    
					                
						for (var v=0; v<item.videos.length; v++)
						{
							var video = item.videos[v];

							var photourl = 'static/img/pdf.jpg';
							if(!video.path || video.path == '') {
								continue;
							}
							
							if(video.img && video.img.length > 0) {
								photourl = video.img;
							}
							var ext = video.path.split('.').pop();
							console.log('ext', ext)
							if(ext === 'pdf') {
								// 下载视频
								str += '<div class="col-md-4 col-xs-6 item">\
										<div class="box" style="background : url('+ photourl +') no-repeat top center; background-size : auto 100%;">\
											<div class="inner">\
	                                            <a href="'+apiUrl+'/video/download?video='+ video._id +'&user_id='+ user_id +'"><i class="icon fa fa-cloud-download"></i></a>\
	                                        </div>\
	                                    </div>\
	                                    <p>'+ video.name +'</p>\
									</div>'
							} else {
								str += '<div class="col-md-4 col-sm-6 col-xs-12 item">\
                                    	<video id="example_video_1" class="video-js vjs-default-skin vjs-big-play-centered video-style" controls preload="none"\
                                        poster="'+photourl+'"\
                                        data-setup="{}">\
                                        <source src="' + apiUrl+'/video/download?video='+ video._id +'&user_id='+ user_id +'" type="video/mp4" />\
                                    </video>\
                                    <p>'+ video.name +'</p>\
                                </div>'
							}
							
							
						}
						str += '</div>\
					            </div>\
					        </div>\
					    </div>';

					    $('#userVideo').append(str);
					}
				}
			}
		});
	}
}

$(function() {
	var cookieuser = $.cookie('user');
	if(typeof cookieuser != 'undefined') {
		var cookie     = JSON.parse(cookieuser);
		$.ajax({
			cache : false,
			type  : "GET",
			url   : apiUrl + '/user/level/' + cookie.user._id,
			async : false,
			error : function(request) {
				// swal('Oops','For failure！','error');
			},
			success : function(result) {
				getvideos(result.level, cookie.user._id);
			}
		});
	} else {
		window.location.replace("login.html");
	}
})
