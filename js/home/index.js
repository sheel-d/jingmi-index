window.onload = function(){
	var oBody = document.body;
	oBody.style.height = window.screen.availHeight + 'px';
	//登录 + 注册
	var oLogin = document.getElementById('login_');
	var oMask = document.getElementById('mask');
	
	var cTimer = document.getElementById('timer');

	var musicText = document.getElementById('musicText');
 	var smtp = musicText.getElementsByTagName('p')[0];
 	var musicList = document.getElementById('music_list');
 	var mlLi = musicList.getElementsByTagName('li');
 	var mlSpan = musicList.getElementsByTagName('span');
 	var mlEm = musicList.getElementsByTagName('em');
 	var mlSt = musicList.getElementsByTagName('strong');
 	var url = null;
 	var textText = document.getElementById('textText');
 	var audio = textText.getElementsByTagName('audio')[0];
 	
 	var headp = document.getElementById('headp');
 	var spanone = headp.getElementsByTagName('span')[1];
 	
 	var qwe = 0;
 	
 	var username = document.getElementById('username');
 	var io = document.getElementById('io');
 	
 	ajax('post','sessionUserName.do','username=' + username.innerHTML,function(date){
		var data = JSON.parse(date);
		if(data.username == null){
			io.innerHTML = "嗨，欢迎来到静谧网，请先";
			oLogin.innerHTML = '登录';
		}else{
			username.innerHTML = data.username + "，";
			io.innerHTML = "你好！欢迎光临静谧网，";
			oLogin.innerHTML = '退出';
			oLogin.href = "exit.do";
		}
	});
 	
 	spanone.onclick = function(){
 		oRegedit.style.display = 'block';
 		oMask.style.display = 'block';
 		oImgyz.src = 'token.do';
		
		oMask.style.width = Math.max( document.body.offsetWidth, document.documentElement.clientWidth ) + 'px';
		oMask.style.height = Math.max( document.body.offsetHeight, document.documentElement.clientHeight ) + 'px';
 	};
 	
	function ajax(method, url, data, success){
		var xhr = null;
		try {
			xhr = new XMLHttpRequest();
		} catch (e) {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');  
		}
		if (method == 'get' && data) {
			url += '?' + data;
		}
		xhr.open(method,url,true);
		if (method == 'get') {
			xhr.send();
		} else {
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
			xhr.send(data);
		}
		xhr.onreadystatechange = function() {
			if ( xhr.readyState == 4 ) {
				if ( xhr.status == 200 ) {
					success && success(xhr.responseText);
				} else {
					alert('出错了,' + xhr.status);
				}
			}
		}
	}

	var oErCode = document.getElementById('er_code');
	var oCode = document.getElementById('code');
	oErCode.onmouseover = function(){
		oCode.style.display = 'block';
	}
	oErCode.onmouseout = function(){
		oCode.style.display = 'none';
	}
	var oCollect = document.getElementById('collect');
	var prompt = document.getElementById('prompt');
	oCollect.onclick = function(){		
		prompt.style.display = 'block';
		oMask.style.display = 'block';
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
		
		oMask.style.width = Math.max( document.body.offsetWidth, document.documentElement.clientWidth ) + 'px';
		oMask.style.height = Math.max( document.body.offsetHeight, document.documentElement.clientHeight ) + 'px';
	}
	var hSpan = prompt.getElementsByTagName('span')[0];
	hSpan.onclick = function(){
		prompt.style.display = 'none';
		oMask.style.display = 'none';
	}
	
	//navigation_nav
	var oUl = document.getElementById('navigation_nav');
	var aLi = oUl.getElementsByTagName('li');
	var timer = null;

	var iNum = 1;
	
	aLi[1].onclick =function(){
		oMask.style.display = 'block';
		cTimer.style.display = 'block';
	}

	var oHide = document.getElementById('hide');
  	var oDiv2 = document.getElementById('contentRight_text');
  	var oGG = true;
	aLi[4].onclick = function(){
		qwe++;
		var aA = this.getElementsByTagName('a')[0];
		aA.href = '#contentRight';
		oHide.innerHTML = "隐藏";
		oDiv2.style.right = "0";
		oGG = false;
		ajax('get','music.do?'+Math.random(),'',function(date){
			var data = JSON.parse(date);
  			for(var i=0;i<data.length;i++){
  				if(mlLi.length < 5){
					addCreate();
				}
  				mlSpan[i].innerHTML = data[i].musicName;
  				mlEm[i].innerHTML = data[i].musicAuthor;
  				mlLi[i].index = "music/" + data[i].musicFile;
  				//alert(data[i].musicTime);
  				var str = data[i].musicTime;
  				mlSt[i].innerHTML = str.replace('.', ":");
  			}
		  });
	};

	//contentLeft
	var oTime = document.getElementById('time');
	setInterval(fntime,1000);
    fntime();

    function fntime(){
      var myTime = new Date();
      var iYear = myTime.getFullYear();
      var iMonth = myTime.getMonth()+1;
      var iDate = myTime.getDate();
      var iWeek = myTime.getDay();
      var iHours = myTime.getHours();
      var iMin = myTime.getMinutes();
      var iSec = myTime.getSeconds();
      var str = '';

      if(iWeek === 0)iWeek='星期日';
      if(iWeek === 1)iWeek='星期一';
      if(iWeek === 2)iWeek='星期二';
      if(iWeek === 3)iWeek='星期三';
      if(iWeek === 4)iWeek='星期四';
      if(iWeek === 5)iWeek='星期五';
      if(iWeek === 6)iWeek='星期六';
      str = iYear+'年'+iMonth+'月'+iDate+'日 '+iWeek+' '+ toTwo(iHours)+' : '+toTwo(iMin)+' : '+toTwo(iSec); 
     oTime.innerHTML = str;
  	}
  	function toTwo ( n ) {
   		return n < 10 ?  '0' + n : '' + n;
  	} 
  	var contentLeft = document.getElementById('contentLeft');
  	var lDiv = contentLeft.getElementsByTagName('div')[0];
  	ajax('get','date.do','',function(data){
  		var d=eval("("+data+")");
  		lDiv.innerHTML = d.date;
	});
	var matter = document.getElementById('matter');
	var change = document.getElementById('change');
	var lEm = matter.getElementsByTagName('em')[2];
	ajax('get','mood.do','',function(data){
		var d=eval("("+data+")");
  		lEm.innerHTML = d.mood;
	});
	change.onclick = function(){
		ajax('get','mood.do?'+Math.random(),'',function(data){
			var d=eval("("+data+")");
  			lEm.innerHTML = d.mood;
		});
	}
 	//contentCenter
 	var conBtn = document.getElementById('con_btn');
 	
 	conBtn.onclick = function(){
 		oMask.style.display = 'block';
		cTimer.style.display = 'block';
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
		
		oMask.style.width = Math.max( document.body.offsetWidth, document.documentElement.clientWidth ) + 'px';
		oMask.style.height = Math.max( document.body.offsetHeight, document.documentElement.clientHeight ) + 'px';
 	}
 	var aDropOut = cTimer.getElementsByTagName('div')[0];
 	aDropOut.onclick = function(){
 		cTimer.style.display = 'none';
 		oMask.style.display = 'none';	
 	}
 	var cLi = cTimer.getElementsByTagName('li');
 	var countDown = document.getElementById('countDown');
 	for(var i=0;i<cLi.length;i++){
 		cLi[i].onclick = cvTime;
 	}

 	var cEnd = document.getElementById('end');

 	function cvTime(){
 		cTimer.style.display = 'none';
 		oMask.style.display = 'none';
 		countDown.style.display = 'block';
 		var mSpan = countDown.getElementsByTagName('span')[0];
 		var cSpan = countDown.getElementsByTagName('span')[1];
 		var sSpan = countDown.getElementsByTagName('span')[2];
 		

 		var sV = 59;
 		if(this == cLi[9]){
 			this.innerHTML = 60;
 			var cV = parseInt(this.innerHTML);
 		}else{
 			var cV = parseInt(this.innerHTML);
 		}
 		var timer = null;

 		if(timer==null){
			timer=setInterval(function(){			
				mSpan.innerHTML=cV-1;
				cSpan.innerHTML = ':';
				sSpan.innerHTML=sV;						
				if(sV === 0){
					cV--;
					sV=59;
				}
				if( cV <= 0 ){
					clearInterval(timer);;
					oMask.style.display = 'block';
					cEnd.style.display = 'block';
					countDown.style.display = 'none';
				}
				sV--;				
			},1000);
		}
 	}
 	var rFt = document.getElementById('rFt');
 	var Cspan = rFt.getElementsByTagName('span')[0];
 	Cspan.onclick = function(){
 		cEnd.style.display = 'none';
 		oMask.style.display = 'none';
 	}
 	
 	//contentRight
 	document.onkeydown = function(ev){
  		var ev = ev || event;
  		if(ev.keyCode == 13){
  			qwe++;
  			oHide.innerHTML = "隐藏";
  	 		oDiv2.style.right = "0";
  	 		oGG = false;
  	 		
  	 		ajax('post','selectMusic.do? '+Math.random(),'musicName=' + musicName.value,function(date){
  				var data = JSON.parse(date);
  				for(var i=0;i<data.length;i++){
  					if(mlLi.length < 5){
  						addCreate();
  					}
  	  				mlSpan[i].innerHTML = data[i].musicName;
  	  				mlEm[i].innerHTML = data[i].musicAuthor;
  	  				mlLi[i].index = "music/" + data[i].musicFile;
  	  				var str = data[i].musicTime;
  	  				mlSt[i].innerHTML = str.replace('.', ":");
  				}
  			});
  		}
	};
 	var rSearch = document.getElementById('rSearch');
 	var musicName = document.getElementById('musicName');
 	rSearch.onclick = function(){
 		qwe++;
 		oHide.innerHTML = "隐藏";
 		oDiv2.style.right = "0";
 		oGG = false;
 		
 		ajax('post','selectMusic.do?'+Math.random(),'musicName=' + musicName.value,function(date){
			var data = JSON.parse(date);
			for(var i=0;i<data.length;i++){
				if(mlLi.length < 5){
					addCreate();
				}
  				mlSpan[i].innerHTML = data[i].musicName;
  				mlEm[i].innerHTML = data[i].musicAuthor;
  				mlLi[i].index = "music/" + data[i].musicFile;
  				var str = data[i].musicTime;
  				mlSt[i].innerHTML = str.replace('.', ":");
			}
		});
 	};
 	smtp.onclick = function(){
 		ajax('get','music.do?'+Math.random(),'',function(date){
 			var data = JSON.parse(date);
  			for(var i=0;i<data.length;i++){
  				if(mlLi.length < 5){
					addCreate();
				}
  				mlSpan[i].innerHTML = data[i].musicName;
  				mlEm[i].innerHTML = data[i].musicAuthor;
  				mlLi[i].index = "music/" + data[i].musicFile;
  				var str = data[i].musicTime;
  				mlSt[i].innerHTML = str.replace('.', ":");
  			}
		});
 	}
 	for(var i=0;i<mlLi.length;i++){
 		mlLi[i].onclick = function(){
 			audio.src=this.index;
 			audio.play();
 		}
 	}
 		
 		
 	
 	 oHide.onclick = function(){
   	 	if(oGG){
   	 	  qwe++;
    	  oHide.innerHTML = "隐藏";
    	  oDiv2.style.right = "0";
    	  oGG = false;
    	  ajax('get','music.do?'+Math.random(),'',function(date){
    		  var data = JSON.parse(date);
  			  for(var i=0;i<data.length;i++){
  			  	if(mlLi.length < 5){
					addCreate();
				}
  				mlSpan[i].innerHTML = data[i].musicName;
  				mlEm[i].innerHTML = data[i].musicAuthor;
  				mlLi[i].index = "music/" + data[i].musicFile;
  				var str = data[i].musicTime;
  				mlSt[i].innerHTML = str.replace('.', ":");
  			}
		  });
   		 }else {
   		   qwe = 0;
   		   oHide.innerHTML = "显示";
   		   oDiv2.style.right = "-80%";
    	   oGG = true;
   		 }
    }
    oDiv2.onmouseover = function(){
    	if(oGG){
    		this.style.right = "0";
    		oHide.innerHTML = "隐藏";
    		oGG = false;
    	}
    }
    
   oHide.onmouseover = function(){
	   qwe++;
	   if(qwe == 1){
		   ajax('get','music.do?'+Math.random(),'',function(date){
	  		    var data = JSON.parse(date);
				for(var i=0;i<data.length;i++){
					if(mlLi.length < 5){
						addCreate();
					}
					mlSpan[i].innerHTML = data[i].musicName;
					mlEm[i].innerHTML = data[i].musicAuthor;
					mlLi[i].index = "music/" + data[i].musicFile;
					var str = data[i].musicTime;
	  				mlSt[i].innerHTML = str.replace('.', ":");
				}
			  });
	   }
    };

    function addCreate(){
		var vLi = document.createElement('li');
		var vImg = document.createElement('img');
		vImg.style.width = '23px';
		vImg.style.height = '23px';
		vImg.src = 'img/login_bg/note.png';
		var vSpan = document.createElement('span');
		var vStrong = document.createElement('strong');
		var vEm = document.createElement('em');

		vLi.appendChild(vImg);
		vLi.appendChild(vSpan);
		vLi.appendChild(vStrong);
		vLi.appendChild(vEm);
	    musicList.appendChild(vLi);
}

	//contentFooter的JS
	var oMain = document.getElementById('main');
	var oCover = document.getElementById('cover');

    var arrImgBG = ['img/home/1.jpg','img/home/2.jpg','img/home/3.jpg','img/home/4.jpg','img/home/5.jpg','img/home/6.jpg','img/home/7.jpg','img/home/9.jpg','img/home/10.jpg','img/home/11.jpg','img/home/12.jpg','img/home/13.jpg','img/home/14.jpg','img/home/15.jpg','img/home/16.jpg','img/home/17.jpg','img/home/18.jpg','img/home/19.jpg','img/home/20.jpg','img/home/21.jpg','img/home/22.jpg','img/home/23.jpg','img/home/24.jpg'];
    var length = arrImgBG.length;
    
    for(var i=0;i<length;i++){
    	oCover.innerHTML +='<span><img src="'+arrImgBG[i]+'"/></span>';
    }

    var aImg = oCover.getElementsByTagName('img');
    var oImg = document.getElementById('img');
    
    for(var i=0;i<aImg.length;i++){
    	aImg[i].onclick = function(){
    	  oImg.src = this.src;
    	}
    }
var contrntFooter = document.getElementById('contentFooter');
    
	if(contrntFooter.addEventListener){
		contrntFooter.addEventListener('DOMMouseScroll',roller,false);
	}
	contrntFooter.onmousewheel = roller;
	
	var i = 0;
	function roller(ev){
		var ev = ev || event;
		
		if(ev.detail == 3){
			i++;
			if(i < 8){
				oCover.style.left = '-' + i +'00' + '%';
			}else{
				i = 7;
			}
		}else if(ev.detail == -3){
			if(i<= 8 && i>0){
				i--;
				oCover.style.left = '-' + i +'00' + '%';
			}else if(i<0){
				i=0;
			}
		}
		if(ev.wheelDelta == -120){
			i++;
			if(i < 8){
				oCover.style.left = '-' + i +'00' + '%';
			}else{
				i = 7;
			}
		}else if(ev.wheelDelta == 120){
			if(i<= 8 && i>0){
				i--;
				oCover.style.left = '-' + i +'00' + '%';
			}else if(i<0){
				i=0;
			}
		}

		if(ev.preventDefault){
 			ev.preventDefault();
		}
		return false;
	}
}
