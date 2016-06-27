window.addEventListener('load',function(){
	var oBody = document.body;
	oBody.style.height = document.documentElement.clientHeight + 'px';

	var oImgyz = document.getElementById('imgyz');
	oImgyz.src = "token.do" + '?d=' + Math.random();
	oImgyz.addEventListener('click',function(){
		oImgyz.src = "token.do" + '?d=' + Math.random();
	},false);
	
	var oRegister = document.getElementById('register');
	var aI = oRegister.getElementsByTagName('i');
	var aEm = oRegister.getElementsByTagName('em');
	var aInput = oRegister.getElementsByTagName('input');
	
	var re = /^[\u0391-\uFFE5a-zA-Z0-9_\-\@\.]{2,10}$/;
	var se = /^[a-zA-Z0-9_\$\#\@\^\&\+\-\*\%\!]{6,20}$/;

	for(var i=0;i<aInput.length;i++){
		(function(i){
			aInput[i].addEventListener('focus',function(){
				if(aI[i].style.display =='inline-block'){
					aEm[i].style.display = 'none';
				}else{
					aEm[i].style.display = 'block';
				}
			},false);
		})(i);
	}

	for(var i=0;i<aInput.length;i++){
		(function(i){
			aInput[i].addEventListener('blur',function(){
				if(i==0 && re.test(aInput[i].value) ){
					ajax('post','findUserName.do','name=' + aInput[i].value,function(date){
						if(date == 'false'){
							aEm[i].style.display = 'none';
							aI[i].style.display = 'inline-block';
							aI[i].style.borderLeft = '3px solid green';
							aI[i].style.borderBottom = '3px solid green';
						}else{
							aEm[i].innerHTML = "该用户名已被注册";
						}
					});
				}else{
					aEm[i].innerHTML = "请输入正确的用户名";
				}
				if(i==1 && se.test(aInput[i].value) ){
					aEm[i].style.display = 'none';
					aI[i].style.display = 'inline-block';
					aI[i].style.borderLeft = '3px solid green';
					aI[i].style.borderBottom = '3px solid green';
				}else{
					aEm[i].innerHTML = "请输入正确的格式";
				}
				if( i==2 && se.test(aInput[i].value) ){
					if(aInput[i].value == aInput[i-1].value){
						aEm[i].style.display = 'none';
						aI[i].style.display = 'inline-block';
						aI[i].style.borderLeft = '3px solid green';
						aI[i].style.borderBottom = '3px solid green';
					}else{
						aEm[i].innerHTML = "请输入一样的密码";
					}
				}else{
					aEm[i].innerHTML = "请输入正确的格式";
				}
				if(i == 3){
					ajax('post','againToken.do','token=' + aInput[i].value,function(date){
						if(date == '1'){
							aEm[i].style.display = 'none';
							aI[i].style.display = 'inline-block';
							aI[i].style.borderLeft = '3px solid green';
							aI[i].style.borderBottom = '3px solid green';
						}else{
							aEm[i].innerHTML = "验证码输入错误!请重新输入或换一张验证码";
						}
					});
				}
			},false);
		})(i);
	}

	var zcbut = document.getElementById('zcbut');
	zcbut.addEventListener('click',function(){
		if(aI[0].style.display == 'inline-block' && aI[1].style.display == 'inline-block' && aI[2].style.display == 'inline-block' && aI[3].style.display == 'inline-block' ){
			ajax('post','registerAction.do','name=' + aInput[0].value + '&password=' + aInput[1].value,function(date){
				if(date == 'index.html'){
					window.location = "http://www.jingmi.date";
				}else{
					alert('注册失败！');
				}
			});
		}else{
			alert('请查看信息是否填写完整！');
		}
	},false);

	var imggh = document.getElementById('imggh');
	imggh.addEventListener('click',function(){
		oImgyz.src = "token.do" + '?d=' + Math.random();
	},false);

},false);
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