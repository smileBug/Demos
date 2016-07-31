$(window).on('load',function(){
	waterfall();
	var dataInt = {"data":[{"src":"1.jpg"},{"src":"12.jpg"},{"src":"6.jpg"},{"src":"3.jpg"},{"src":"11.jpg"}]} 
	$(window).on("scroll",function(){
		if (checkScrollSlide) {
			$.each(dataInt.data,function(key,value){
				var obox = $("<div>").addClass("box").appendTo($("#main"));
				var opic = $("<div>").addClass("pic").appendTo($(obox));
				$("<img>").attr("src","images/"+$(value).attr("src")).appendTo($(opic));
			})
				waterfall();
		}
	})
});


function  waterfall(){
	var $boxs = $('#main > div');
	var w =  $boxs.eq(0).outerWidth();
	var cols = Math.floor($(window).width()/w);
	$('#main').width(cols*w).css('margin','0 auto');
	var hArr = [];
	$boxs.each(function(index,value){
		if(index < cols){
			hArr.push($boxs.eq(index).outerHeight());
		}else{
			var hmin = Math.min.apply(null,hArr);
			var hmin_index = $.inArray(hmin,hArr);
			$(value).css({'position':'absolute',
										'top':hmin + 'px',
										'left':hmin_index*w + 'px',
			});
			hArr[hmin_index] += $boxs.eq(index).outerHeight();
		}
		
	})
}
function checkScrollSlide(){
	var $lastBox = $("#main>div").last();
	var lastBoxDis = $lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();
	return (lastBoxDis < scrollTop + documentH) ? true:false;
}