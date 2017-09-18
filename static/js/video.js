var apiUrl = 'http://server.mybarrefitness.com';

$(function() {
	$.ajax({
		cache : false,
		type  : "GET",
		url   : apiUrl + '/video/level/0',
		async : false,
		error : function(request) {
			swal('Oops...','For failure！','error');
		},
		success : function(result) {
			console.log('result', result)
			var video_view = $('#videos');
			if(result.status) {
				var s = result.videos > 0?result.videos - 1 : 0;
				if(s == 0) {
					// videojs(document.querySelector('.video-js'));
					// $.getScript("./static/js/video.min.js");
				}
				for (var i = 0; i < result.videos.length; i++)
				{
					var video = result.videos[i];
					video_view.append('<div class="col-md-4 col-sm-6 col-xs-12">\
		                <video id="example_video_1" class="video-js vjs-default-skin vjs-big-play-centered video-style" controls preload="none"\
		                    poster="'+video.img+'"\
		                    data-setup="{}">\
		                    <source src="' + video.path +'" type="video/mp4" />\
		                </video>\
		                <p>'+video.name+'</p>\
		            </div>')
		            if(s == i) {
		            	// videojs(document.querySelector('.video-js'));
		            	$.getScript("./static/js/video.min.js");
		            }
				}
			}
		}
	});
})
