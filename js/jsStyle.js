$(document).ready(function(){
	//测试对象，需删除
	var vedioplay=true;
	//测试对象，需删除
	var video = panoviewer_get_texture_source();
	
	//CSS
	function setCss(){
//		$("#canvas").width($("#testmodule").width()).height($("#testmodule").height());

		$('body').css({'margin':'0px','padding':'0px'});
		$('dl').css({
			'margin':'0px',
			'padding':'0px',
			'display': 'none',
			'border': '1px solid #fff',
			'borderBottom': '1px',
			'borderTopLeftRadius': '10px',
			'borderTopRightRadius': '10px',
			'background': 'rgba(0,0,0,0.5)',
			'fontWeight': 'bold',
			'position': 'absolute',
			'right': '20px'
		});
		$('dd').css({
			'margin':'0px',
			'padding':'0px',
			'lineHeight': '35px',
			'height': '35px',
			'cursor':'pointer'
		}).mouseover(function(){
			$(this).css({
				'background': 'rgba(255,255,255,0.5)'
			});
		}).mouseout(function(){
			$(this).css({
				'background': ''
			});
		});
//		$('dt').css({
//			'margin':'0px',
//			'padding':'0px',
//			'height': '35px',
//			'background': '#000',
//			'borderTopLeftRadius': '10px',
//			'borderTopRightRadius': '10px',
//			'lineHeight': '35px',
//
//		});

		$("#control").find('div').css({
			'float':'left'
		});
//		$("#control").find('span').css({
//			'float':'left'
//		});
		$("#control").children("#right").css({
			'float':'left',
			'width':'10%'
		});
		$(".time_past").css({
			'float':'left',
			'width':'5%',
			'text-align':'center'
		});
		$(".time_all").css({
			'float':'left',
			'width':'5%',
			'text-align':'center'
		});
		
		$(".img").css({
		    'text-align':'center',
			'display':'block',
			'cursor':'pointer',
			'width':'5%',
			'heigth':'100%'
			
		});
		$(".img").children('span').css({
			'display':'block',
			'width':'30px',
			'height':'30px',
			'backgroundImage':'url(img/videointerface_skin.png)',
			'backgroundRepeat':'no-repeat',
			
	
			'backgroundSize':'200% auto'
		
		});
		$(".img:eq(1)").children('span').css({
			'width':'60px',
			'height':'30px',
			'backgroundPosition':'90% 60%',
			'backgroundSize':'120% auto',
			
		});
		$(".img:eq(1)").css({
		    'float':'left'
		}).mouseover(function(){
			$(this).css({
				'backgroundImage':'url(../img/videointerface_skin.png)',
				'backgroundRepeat':'no-repeat',
				'backgroundSize':'auto 650%',
				'backgroundPosition':'20% 80%',
				'backgroundImage':'url(../img/videointerface_skin.png)',
				'backgroundRepeat':'no-repeat',
				'backgroundSize':'auto 650%',
				'backgroundPosition':'630% 80%'
			});
		}).mouseout(function(){
			$(this).css({
				'background':'',
			});
		});
		$(".img:eq(2)").children('span').css({
			'width':'30px',
			'height':'30px',
			'backgroundPosition':'0% 20%',
		
			'float':'left'
			
		});
		$(".progress").css({
			'width':"55%",
			'height': '2px',
			'border': '1px solid rgba(100, 100, 100, 0.5)',
			'background': 'rgba(200, 200, 200, 0.5)',
			'margin': '17px',
			'position': 'relative'
		});
		$(".progress .load").css({
			
			'width': '100%',
			'height': '2px',
			'background': 'rgba(255, 255, 255, 0.5)',
			'position': 'absolute',
			'left':'0px',
			'top':'0px'
		});
		$(".progress .circle").css({
			'width': '16px',
			'height': '16px',
			'borderRadius':' 50%',
			'background': '#fff',
			'position': 'absolute',
			'left': '0%',
			'top': '-7px',
			'cursor':'pointer'
		});
		$(".pause").css({
			'background': 'rgba(0,0,0,0.5) ',
			'width': 'inherit',
			'height': 'inherit',
			'position': 'absolute'
		});
		$(".pause> div").css({
			'background': 'url(../img/playpause.png) top no-repeat',
			'width': '70px',
			'height': '70px',
			'position':'absolute',
			'left':(parseInt($('.pause').width())-70)/2+'px',
			'top':(parseInt($('.pause').height())-70)/2+'px',
			'cursor':'pointer'
		}).mouseover(function(){
			$(this).css({
				'background': 'url(../img/playpause.png) bottom no-repeat',
			});
		}).mouseout(function(){
			$(this).css({
				'background': 'url(../img/playpause.png) top no-repeat',
			});
		});
			playStatus=setInterval(goOn,1000);
			$(this).css({'backgroundPosition':'100% 0%'});
			$(".pause").css('display','none');
	}
	
	setCss();
	
	//选择视角列表
	$("#imgeye").click(function(){
		$("dl").toggle();
	});
	//选择视角
	$("dd").click(function(){
		var now=$(this).index('dd');
		switch(now){
			case 0://全景
			updateModel(0);
			break;

			case 1://待定
			updateModel(1);
			break;

			case 2://小行星
			updateModel(2);
			break;

			case 3://小行星
			updateModel(3);
			break;
		}
		$("dd").parents('dl').toggle();
	})
	//播放
	$('#showplay').click(function(){
		//判断是否播放

		var video = panoviewer_get_texture_source();

		if(vedioplay){ //正在播放时，暂停,改成暂停图标，显示暂停面板
			vedioplay=false;
			video.autoplay = false;
			video.pause();
			clearInterval(playStatus);
			$(this).css({'backgroundPosition':'0% 0%'});
//			$(".pause").css('display','block');
           document.getElementById("showplay").src= "./play.png";
		}else{
			vedioplay=true; //开始播放
			video.autoplay = true;
			video.play();
			playStatus=setInterval(goOn,1000);
			$(this).css({'backgroundPosition':'100% 0%'});

			 document.getElementById("showplay").src= "./pause.png";
		}
	});
	//点击播放
	$(".pause >div").click(function(e){
		var video = panoviewer_get_texture_source();
		e.stopPropagation();
		vedioplay=true; //开始播放
		video.autoplay = true;
		video.play();
		playStatus=setInterval(goOn,1000);

		$(".show:first").css({'backgroundPosition':'100% 0%'});
	});
//	$("canvas").click(function(e){
//		e.stopPropagation();
//		vedioplay=false;
//		$(".show:first").css({'backgroundPosition':'0% 0%'});
//		$(".pause").css('display','block');
//	});
	//点击画面  控制栏切换
	$("#testmodule").click(function(){

		$("#control").show();
	})
	


	//隐藏控制栏
	$(".hide").click(function(e){
		$(this).parents('#control').slideUp();
	});
	
	$("#control").click(function(e){
		e.stopPropagation();
	})
	//进度条控制
	$(".progress").mousedown(function(e){

		var x=e.clientX;
//		$(".circle").css({"left":x+"px"});
		var video = panoviewer_get_texture_source();
		
		var s=video.duration*x/parseInt($(".progress").width());
	
		video.currentTime=s;
		
		
	})
	$(document).keyup(function(event){
		
		 if(event.keyCode==27||event.keyCode==96) {
			if($("#testmodule").width()==window.screen.width){
			//	exitFullScreen()
				$("#testmodule").css({
					'width':'1280px',
					'height':'640px',
					'position':'relative'
				});

				$(".pause>div").css({
					'left':(parseInt($('.pause').width())-70)/2+'px',
					'top':(parseInt($('.pause').height())-70)/2+'px'
				});
				$(".img:eq(2)").children('span').css({
					'backgroundPosition':'0% 40%'
				});
//				$(".progress").css({
//					'width': parseInt($("#canvas").width())-380+'px'
//				});
			}
		 }
	});
	
	//获取总时间
	var allTime;
	var pastTime;//播放的时间
	var loadTime;
	function goOn(){
		var video = panoviewer_get_texture_source();

		allTime = video.duration;
		loadTime = video.buffered.end(0);	
		
		var sec=allTime%60;
		sec = parseInt(sec);
		sec=sec<10?sec='0'+sec:sec;
		$(".time_all").html(parseInt(allTime/60)+':'+sec);
		//获取已经播放的时间
		pastTime = video.currentTime;
		var s=video.currentTime%60;
		s = parseInt(s);
		s=s<10?s='0'+s:s;
		
		$(".time_past").html(parseInt(pastTime/60)+':'+s);
		
		var left=parseInt($(".progress").width()-38)*(pastTime/allTime)+'px';
		//播放位置
		$(".circle").css({
			'left':left
		});
		//进度条长度
//		$(".load").css({
//			'width':parseInt($(".progress").width())*(loadTime/allTime)+'px'
//		});
		
		if(loadTime>allTime){
			loadTime=allTime;
		}
	}
	
	var playStatus;
	//开始播放时调用
	//playStatus=setInterval(goOn,1000);
	
	//暂停结束
	//clearInterval(playStatus);
});