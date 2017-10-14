<!--1.全局页面初始化-->
var AdminLTEOptions={
		animationSpeed:'fast'
}
$(function(){
	$.extend(true, $.AdminLTE.layout, {
		collapse:function(flag, callback){
			if(flag){
				$('body').addClass('sidebar-collapse');
			}else{
				$('body').removeClass('sidebar-collapse');
			}
		}
	});
	Array.prototype.remove=function(dx) 
	{
	      if(isNaN(dx)||dx>this.length){return false;} 
	      for(var i=0,n=0;i<this.length;i++) 
	      { 
	          if(this[i]!=this[dx]) 
	          { 
	              this[n++]=this[i] 
	          } 
	      } 
	      this.length-=1 
	};
	Array.prototype.indexOf=function(d) 
	{
	      if(d==null || typeof(d)=='undefined' || d==''){return -1;} 
	      
	      for(var i=0,n=0;i<this.length;i++) 
	      { 
	          if(this[i]==d) 
	              return i;
	      } 
	      return -1;
	};
})


<!--2.全局页面初始化-->
var CookieUtils = {
	setCookie :function(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires+ "; path=/;";//" domain="+window.location.origin;
	},
	getCookie: function(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	    }
	    return "";
	},
	clearCookie: function (name) {  
	    CookieUtils.setCookie(name, "", -1);  
	}
}

<!--3.消息检测-->
<!--3.1 请求后台展示消息内容 -->
function checkJms(touch){
	$.ajax({
		url: Url.getWebRoot("jmsg/getResult.action"), 
		dataType: "json",
		type:"POST",
		global: false,
		success:function(resp){
			
			if(resp.success){
				$('.notifications-menu:first').empty();
				
				if(resp.total>0){
					var obj = $('#notifications_tmpl').tmpl(
							resp,
							{
		    					getInfo:function(no, jmsdid){
		    						//1.标示已读
		    						$.ajax({
		    							url:Url.getWebRoot("jmsg/updateJmsg.action"), 
		    							dataType:"json",
		    							type:"POST",
		    							data: {jmsgId: jmsdid},
		    							success:function(r){
		    								//checkJms();
		    							},
		    							error:function(XMLHttpRequest,textStatus,errorThrown){}
		    						});
		    						//2.转换页面
		    						return Url.getWebRoot('tms/order/dtl/init.action?no='+no);
		    					}
		    				}
					);
					
					$('.notifications-menu:first').empty().append(obj)
				}	
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			if(interId)
				window.clearInterval(interId)
		}
	});
}

<!--3.2 隐藏弹窗消息 -->
function hidenMsgPanel(){
	CookieUtils.setCookie('hidMsg', true, 7)
	MessageUtil.info('7日内不再弹窗提醒.');
}

<!--3.3 清空当前消息提醒 -->
function cleanJmsg(jreg){
	CookieUtils.clearCookie('hidMsg');
	
	$.ajax({
		url:Url.getWebRoot("jmsg/cleanJmsg.action"), 
		dataType:"json",
		type:"POST",
		data: {jreg:$('#jreg').val()},
		success:function(r){
			
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){}
	});
}

if(!isDebug){
	checkJms(false);
	var interId = setInterval(checkJms, 300000);
}


<!--3.2 隐藏弹窗消息 -->
var LocalStoreUtils = {
	 /**
	   * Store a new settings in the browser
	   *
	   * @param String name Name of the setting
	   * @param String val Value of the setting
	   * @returns void
	   */
	 store: function(name, val) {
	    if (typeof (Storage) !== "undefined") {
	      localStorage.setItem(name, val);
	    } else {
	      window.alert('Please use a modern browser to properly view this template!');
	    }
	  },

	  /**
	   * Get a prestored setting
	   *
	   * @param String name Name of of the setting
	   * @returns String The value of the setting | null
	   */
	  get: function(name) {
	    if (typeof (Storage) !== "undefined") {
	      return localStorage.getItem(name);
	    } else {
	      window.alert('Please use a modern browser to properly view this template!');
	    }
	  }
}

var SkinUtils = {
	skins:[
		       "skin-blue",
		       "skin-black",
		       "skin-red",
		       "skin-yellow",
		       "skin-purple",
		       "skin-green",
		       "skin-blue-light",
		       "skin-black-light",
		       "skin-red-light",
		       "skin-yellow-light",
		       "skin-purple-light",
		       "skin-green-light"
		 ],
	change_skin: function (cls) {
	    $.each(SkinUtils.skins, function (i) {
	      $("body").removeClass(SkinUtils.skins[i]);
	    });

	    $("body").addClass(cls);
	    LocalStoreUtils.store('skin', cls);
	}
}