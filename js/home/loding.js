window.addEventListener('load',function(){
	var oMask = document.getElementById('mask');
	oMask.style.display = 'block';
	oMask.style.background = '#ccc';
	oMask.style.opacity = '1';
	oMask.style.filter = 'alpha(opacity=100)';
	window.addEventListener('scroll',function(){
		if (oMask.style.display == 'none') return ;
		oMask.style.width = Math.max( document.body.offsetWidth, document.documentElement.clientWidth ) + 'px';
		oMask.style.height = Math.max( document.body.offsetHeight, document.documentElement.clientHeight ) + 'px';
	});
	window.addEventListener('resize',function(){
		if (oMask.style.display == 'none') return ;
			oMask.style.width = Math.max( document.body.offsetWidth, document.documentElement.clientWidth ) + 'px';
			oMask.style.height = Math.max( document.body.offsetHeight, document.documentElement.clientHeight ) + 'px';
		});
			
	var oScript = document.createElement('script');
	oScript.src = "js/home/pace.js";
	document.getElementsByTagName('head')[0].appendChild(oScript);
});
