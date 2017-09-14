// var apiUrl = 'http://106.14.94.210:9080';
var apiUrl = 'http://localhost:9080';


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
			console.log('result', result)
			if(false) {
				for (var y = 0; y < 5; y++) {
					var videos = result.videos.filter(function(item) {
						return item.level == y;
					})
					if(videos.length > 0) {
						var str = '<div class="panel panel-default">\
	                        <div class="panel-heading" role="tab" id="headingOne">\
	                            <h4 class="panel-title">\
	                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">\
	                                Collapsible Group Item #' + y;
	                        str += '</a>\
	                            </h4>\
	                        </div>\
	                        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">\
	                            <div class="panel-body">\
	                                <div class="row">';
	                                    
	                                
						for (var i = 0; i < videos.length; i++)
						{
							var video = videos[i];
							console.log('video', video)
							str += '<div class="col-md-4 col-xs-6 item">\
                                        <div class="box" style="background : url('+ video.img +') no-repeat top center; background-size : cover;">\
                                            <div class="inner">\
                                                <a href="'+ video.path +'" download="movie.avi"><i class="icon fa fa-cloud-download"></i></a>\
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
