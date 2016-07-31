window.onload = function(){
	waterfall('main','box');
	var dataInt = {"date":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"11.jpg"},{"src":"13.jpg"}]}
	window.onscroll = function(){
		if (checkScroll) {
			var oParent = document.getElementById('main');
			//将数据块渲染到页面的尾部
			for (var i = 0;i < dataInt.date.length;i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic =  document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = 'images/'+dataInt.date[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}
}

function waterfall(parent,box){
	//将main下的所有属性为box的元素取出来
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
	//计算整个页面的列数
	var oBoxW = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	//设置main的宽度
	oParent.style.cssText = 'width:' + oBoxW * cols + 'px; margin:0 auto;'
	
	//调整图片位置
	var hArr = [];
	for (var i = 0; i < oBoxs.length; i++) {
		if (i < cols) {
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var Hmin = Math.min.apply(null,hArr);
			var index = getHminIndex(hArr,Hmin);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = Hmin + 'px';
			//oBoxs[i].style.left = index * oBoxW + 'px';
			oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
			hArr[index] += oBoxs[i].offsetHeight;

		}
	}
			console.log(hArr);
}

//根据class获取元素
function getByClass(parent,clsName){
	var boxArr = [],
			oElements = parent.getElementsByTagName('*');
	for (var i = 0; i < oElements.length; i++) {
		if( oElements[i].className == clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

//根据值获取索引值
function getHminIndex(arr,Hmin){
	for(var i in arr){
		if (arr[i] == Hmin) {
			return i;
		}
	}
}

//检测是否具备滚动条加载数据块的条件
function checkScroll(){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	return (lastBoxH < height + scrollTop) ? true : false ;
}
