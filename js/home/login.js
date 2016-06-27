window.addEventListener('load',function(){
	var oBody = document.body;
	oBody.style.height = document.documentElement.clientHeight + 'px';
	//console.log(typeof window.location.href);
	var oBtn = document.getElementById('btn');
	oBtn.addEventListener('click',function(){
		var oUs = document.getElementById('username');
		var oPs = document.getElementById('password');

		if(oUs.value != '' && oPs != ''){
			ajax('post','loginAction.do','name=' + oUs.value + '&password=' + oPs.value,function(date){
				if(date == 'index.html'){
					var str = window.location.href;
					if(str.split('?')[1] == 'data=index'){
						window.location = "http://www.jingmi.date";
					}else{
						window.location = "http://localhost:8080/bbs-web/BBS.html";
					}
				}else{
					alert('密码错误！');
				}
			});
		}else{
			alert('请输入用户名和密码!');
		}

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