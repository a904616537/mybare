var apiUrl = 'http://server.mybarrefitness.com';
// var apiUrl = 'http://localhost:9080';


function getvideos (level){
	$.ajax({
		cache : false,
		type  : "GET",
		url   : apiUrl + '/courses/list/video/' + level,
		async : false,
		error : function(request) {
			swal('Oops...','For failure！', 'error');
		},
		success : function(result) {
			if(result.status) {
				for(var i = 0; i < result.data.length; i++) {
					var item =  result.data[i];
					var str = '<div class="panel panel-default">\
	                        <div class="panel-heading" role="tab" id="headingOne">\
	                            <h4 class="panel-title">\
	                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">\
				                ' + item.courses.name;
				        str += '</a>\
	                            </h4>\
	                        </div>\
	                        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">\
	                            <div class="panel-body">\
	                                <div class="row">';
				                    
				                
					for (var v=0; v<item.videos.length; v++)
					{
						var video = item.videos[v];
						str += '<div class="col-md-4 col-xs-6 item">\
									<div class="box" style="background : url(static/img/pdf.jpg) no-repeat top center; background-size : auto 100%;">\
                                        <div class="inner">\
                                            <a href="'+ video.path +'" download="'+video.name+'.mp4"><i class="icon fa fa-cloud-download"></i></a>\
                                        </div>\
                                    </div>\
                                    <p>'+ video.name +'</p>\
								</div>'
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

$(function() {
	var cookieuser = $.cookie('user');
	var cookie = JSON.parse(cookieuser);
	$.ajax({
		cache : false,
		type  : "GET",
		url   : apiUrl + '/user/level/' + cookie.user._id,
		async : false,
		error : function(request) {
			swal('Oops','For failure！','error');
		},
		success : function(result) {
			getvideos(result.level);
		}
	});

	
})
