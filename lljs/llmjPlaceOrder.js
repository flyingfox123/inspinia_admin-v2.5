var baseAppUrl = "http://m.lenglianmajia.com/";
var baseMyUrl = "http://my.lenglianmajia.com/";
var baseImageUrl = "http://pic.lenglianmajia.com/";

var certificationRole = $.cookie("certificationRole");//角色认证 1：物流公司 2：信息部 3：个体司机 4：个体货主 5：公司货主 6：公司库主
var certificationStatus = $.cookie("certificationStatus");//角色认证状态 0:未认证(默认) 1:认证中 2：已认证 3：认证未通过

$(function(){
	$('.mClose').click(function(){
		$('.mask').hide();
		$('.m-ensureInf1').hide();
	})
})

function closeAll(){
	layer.closeAll();
	window.location.reload();
}

function closeGoodsLine(){
	layer.closeAll();
	if($(".curr").text() != null && $(".curr").text() != ''){
		queryGoodsLine($(".curr").text());
	}else{
		window.location.reload();
	}
	
}
function closeLine(){
	layer.closeAll();
	queryLine($(".curr").text());
}
/**
 * 库源列表抢单相关，开始
 * @param n
 */
//查询所有找库货源
function queryGoodsWarehouseList(obj,n){
	n = isNaN(n)?1:n;
	var checkStatus = checkLogin();
	if(checkStatus == false){
		loginBox();
		return;
	}
	//校验角色状态
	if(certificationRole == null || certificationRole ==''){
		layer4=layer.open({
		 	type: 1,
		 	title:false,
		 	closeBtn: 1,
		 	area: ['480px', '290px'],
		 	resize:false,
		 	content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>未认证角色\<\/div>\<\div>尊敬的用户您好，您还未认证角色，请您认证\<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layer4)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" href="'+baseMyUrl+'authentication/toUserCenter.shtml">去认证\<\/a>\<\/div>'
		 });
		 
		return ;
	}else if(certificationStatus != 2){
		layer4=layer.open({
		 	type: 1,
		 	title:false,
		 	closeBtn: 1,
		 	resize:false,
		 	area: ['480px', '290px'],
		 	content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>未认证角色\<\/div>\<\div>尊敬的用户您好，您还未认证角色，请您认证\<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layer4)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" href="'+baseMyUrl+'authentication/toUserCenter.shtml">去认证\<\/a>\<\/div>'
		 });
		return ;
	}else if(certificationRole == 3 || certificationRole == 6){
		$('.posi-ts').hide();
		$(obj).siblings('.posi-ts').show();
		$(obj).siblings('.posi-ts').fadeOut(3000); 
		return ;
	}
	
	$("#warehouseResourceId").attr("goods-id","");
	var dataTemp = {"resourceStatus": 1, "pageNow": n,"userId": $.cookie("userId"),"pageSize": 2}
	$('.mj-loading').show();
	$.ajax({
		url:baseAppUrl+'/toOther/complieUrl.shtml',
		type: 'POST',
		timeout:15000,
		async:true,
        cache:false,
		dataType: 'jsonp',
		data:{"version":1.0,"targetUrl":"mjGoodsWarehouseController/queryMjGoodsWarehouse.shtml","data":JSON.stringify( dataTemp)},
		success : function(data){
			console.log(data);
			$('.mj-loading').hide();
			$('.mask').show();
			$('.m-ensureInf1').show();
            if(data.code =='0000'){
            	var _data=data.data.mjGoodsWarehouse;
            	console.log(_data);
            	if(_data.length == 0){
            			layer.closeAll();
            			$('.mask').hide();
            			$('.m-ensureInf1').hide();
                		layer2=layer.open({
                	 		type: 1,
                	 		title:false,
                	 		closeBtn: 1,
                	 		skin: 'yourclass',
                	 		resize:false,
                			area: ['425px', '270px'],
                			content: '\<\div class="mj-iconF mj-iconF2" style="padding:54px 20px 44px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>没有货源\<\/div>\<\/div>\<\div class="mj-alL" style="padding:20px 60px;">\<\a onclick="layer.close(layer2)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" href="'+baseMyUrl+'my/myGoodsResourceCtl/addWarehouseGoodsResource.shtml">去发布\<\/a>\<\/div>'
                		});
					}else{
						layui.use(['laypage', 'layer'], function(){
							  var laypage = layui.laypage
							  ,layer = layui.layer;
							  laypage({
							    cont: 'demo2'
							    ,pages: data.data.pageCount
							    ,skin: '#2562b4'
							    ,groups: 3 //连续显示分页数
						    	,jump: function(obj){
						    		renderGoodsWarehouseList(obj.curr);
					    	    }
							  });
							  
						});
						
					} 
                }else if(data.code =='0001'){
                	layer4=layer.open({
            		 	type: 1,
            		 	title:false,
            		 	closeBtn: 1,
            		 	resize:false,
            		 	area: ['480px', '290px'],
            		 	content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>未认证角色\<\/div>\<\div>尊敬的用户您好，您还未认证角色，请您认证\<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layer4)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" href="'+baseMyUrl+'authentication/toUserCenter.shtml">去认证\<\/a>\<\/div>'
            		 });
            		 return;
                }else{
                	//其他错误原因
                	layerOther=layer.open({
    			        type: 1,
    			        title:false,
    			        closeBtn:1,
    			        resize:false,
    			        skin: 'yourclass',
    			        area: ['483px', '270px'],
    			        content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>数据加载失败\<\/div>\<\div>'+data.msg+'<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layerOther)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" onclick="layer.close(layerOther)" href="javascript:;">确定\<\/a>\<\/div>'
    			    });
                	return;
                }
				
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				if(textStatus == "timeout"){
					layerError=layer.open({
    			        type: 1,
    			        title:false,
    			        closeBtn:1,
    			        resize:false,
    			        skin: 'yourclass',
    			        area: ['483px', '270px'],
    			        content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>数据加载失败\<\/div>\<\div>网络超时，请稍后再试\<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layerError)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" onclick="layer.close(layerError)" href="javascript:;">确定\<\/a>\<\/div>'
    			    });
	            }
				$('.mj-loading').hide();
            }
	});
	
	
}
//模拟渲染
var renderGoodsWarehouseList = function(curr){
	$("#warehouseResourceId").attr("goods-id","");
	var dataTemp = {"resourceStatus": 1,"pageNow": curr,   "userId": $.cookie("userId"),"pageSize": 2}
	$.ajax({
		url:baseAppUrl+'/toOther/complieUrl.shtml',
		type: 'POST',
		timeout:15000,
		dataType: 'jsonp',
		data:{"version":1.0,"targetUrl":"mjGoodsWarehouseController/queryMjGoodsWarehouse.shtml","data":JSON.stringify( dataTemp)},
		success : function(data){
			console.log(data);
            if(data.code =='0000'){
            	var _data=data.data.mjGoodsWarehouse;
            	console.log(_data);
            	//循环data的数据，添加车链接
                var str = "";
				for (var i = 0; i < _data.length; i++) {
					var picArr = _data[i].image;
					var picSrc = baseImageUrl+'goodsImage/188/140/'+picArr;
					var goodsType = ['常温','冷藏','冷冻','急冻','深冷']
					str += "<div class=\"clearfix xzck-boder\" onclick=\"goodsWarehouseCheck(this,"+_data[i].id+")\">";
				   		str += "<img class=\"fl\" src=\""+picSrc+"\" alt=\"货源图片\" width=\"101\" height=\"101\">";
				   		str += "<ul class=\"fl\" style=\"width:300px;\">";
				   			str += "<li class=\"f16\"><a href=\"javascript\">需要仓库地：</a><span>"+_data[i].cityName+"|"+_data[i].areaName+"</span></li>";
				   			str += "<li>货物名称:<span>"+_data[i].name+"</span></li>";
				   			str += "<li>货物类型:<span>"+goodsType[_data[i].goodsType-1]+"</span></li>";
				   			str += "<li>货物规格:</a><span>"+_data[i].weight+"吨</span></li>";
				   		str += "</ul>";
				   		str += "<i class=\"mjFont hide\">&#xe611;</i></div>";
                };
                $('.xzck-tk').html(str);
           }
		},
		error : function(){}
	});
}
//货找库下单
function goodsWarehousePlaceOrder(){
	if($("#warehouseResourceId").attr("goods-id") == ''){
		
		layer3=layer.open({
	        type: 1,
	        title:false,
	        closeBtn:1,
	        resize:false,
	        skin: 'yourclass',
	        area: ['483px', '270px'],
	        content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>\<\/div>\<\div>请选择需要交易的货源<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layer3)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" onclick="layer.close(layer3)" href="javascript:;">确定\<\/a>\<\/div>'
	        	
	    });
		return;
	}
	var dataTemp = {userId:$.cookie("userId"),warehouseResourceId:$("#warehouseResourceId").val(),goodsId:$("#warehouseResourceId").attr("goods-id")};
	console.log(dataTemp);
	$('.mask').hide();
	$('.m-ensureInf1').hide();
	$('.mj-loading').show();
	$.ajax({
		url:baseAppUrl+'toOther/complieUrl.shtml',
		type: 'POST',
		timeout:15000,
		dataType: 'jsonp',
		data:{"version":1.0,"targetUrl":"mjOrderWarhouse/addGoodsFoundWarhouseOrder.shtml","data":JSON.stringify( dataTemp)},
		success : function(data){
			console.log(data);
			$('.mj-loading').hide();
            if(data.code=='0000'){
            	layer3=layer.open({
					type: 1,
			 		title:false,
			 		closeBtn: 1,
			 		skin: 'yourclass',
			 		resize:false,
					area: ['480px', '260px'],
					content: '\<\div class="mj-iconF" style="padding:20px 20px 10px;">\<\div class="mj-iconF1">\<\span class="mjFont">&#xe611;\<\/span>\<\/div>\<\div>\下单成功,等待库主接受订单<\/div>\<\/div>\<\div class="mj-alL">\<\a class="mj-rzL" style="margin-left:75px;" onclick="closeAll();" href="javascript:;">确定\<\/a>\<\/div>'
				});
            }else{
            	layer3=layer.open({
			        type: 1,
			        title:false,
			        closeBtn:1,
			        resize:false,
			        skin: 'yourclass',
			        area: ['483px', '270px'],
			        content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>下单失败\<\/div>\<\div>'+data.msg+'<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layer3)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" onclick="layer.close(layer3)" href="javascript:;">确定\<\/a>\<\/div>'
			        	
			    });
            }
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus == "timeout"){
				layerError=layer.open({
			        type: 1,
			        title:false,
			        closeBtn:1,
			        resize:false,
			        skin: 'yourclass',
			        area: ['483px', '270px'],
			        content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>数据加载失败\<\/div>\<\div>网络超时，请稍后再试\<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layerError)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" onclick="layer.close(layerError)" href="javascript:;">确定\<\/a>\<\/div>'
			    });
            }
			$('.mj-loading').hide();
        }
	});
}
//选择货源
function goodsWarehouseCheck(that,id){
	$('.xzck-boder').find('i').hide();
	$(that).find('i').show();
	$("#warehouseResourceId").attr("goods-id",id);
}
/**
 * 库源列表抢单相关，结束
 * @param n
 */



/**
 * 库找货源列表抢单相关，开始
 * @param n
 */
//查询所有库源
function queryGoodsLibraryList(obj,n){
	n = isNaN(n)?1:n;
	var checkStatus = checkLogin();
	if(checkStatus == false){
		loginBox();
		return;
	}
	//校验角色状态
	if(certificationRole == null || certificationRole ==''){
		layer4=layer.open({
		 	type: 1,
		 	title:false,
		 	closeBtn: 1,
		 	resize:false,
		 	area: ['480px', '290px'],
		 	content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>未认证角色\<\/div>\<\div>尊敬的用户您好，您还未认证角色，请您认证\<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layer4)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" href="'+baseMyUrl+'authentication/toUserCenter.shtml">去认证\<\/a>\<\/div>'
		 });
		 
		 return;
	}else if(certificationStatus != 2){
		layer4=layer.open({
		 	type: 1,
		 	title:false,
		 	closeBtn: 1,
		 	resize:false,
		 	area: ['480px', '290px'],
		 	content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>未认证角色\<\/div>\<\div>尊敬的用户您好，您还未认证角色，请您认证\<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layer4)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" href="'+baseMyUrl+'authentication/toUserCenter.shtml">去认证\<\/a>\<\/div>'
		 });
		 return;
	}else if(certificationRole == 2 || certificationRole == 3 || certificationRole == 4 || certificationRole == 5){
		$('.posi-ts').hide();
		$(obj).siblings('.posi-ts').show();
		$(obj).siblings('.posi-ts').fadeOut(3000); 
		return;
	}
	$("#warehouseResourceId").val("");
 	var dataTemp = {"resourceState":1,"pageNow":n,"userId":$.cookie("userId"),"pageSize":2}
 	$('.mj-loading').show();
 	$.ajax({
		url:baseAppUrl+'toOther/complieUrl.shtml',
		type: 'POST',
		timeout:15000,
		async:true,
        cache:false,
		dataType: 'jsonp',
		data:{"version":1.0,"targetUrl":"mjWarehouseResourceController/queryMjWarehouseResourceList.shtml","data":JSON.stringify( dataTemp)},
		success : function(data){
				console.log(data);
				$('.mj-loading').hide();
				$('.mask').show();
				$('.m-ensureInf1').show();
				if(data.code =='0000'){
	              	var _data=data.data.warehouse;
	              	console.log(_data);
	              	if(_data.length == 0){
	              		$('.mask').hide();
	              		$('.m-ensureInf1').hide();
						layer2=layer.open({
					 		type: 1,
					 		title:false,
					 		closeBtn: 1,
					 		resize:false,
					 		skin: 'yourclass',
							area: ['425px', '270px'],
							content: '\<\div class="mj-iconF mj-iconF2" style="padding:54px 20px 44px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>没有库源\<\/div>\<\/div>\<\div class="mj-alL" style="padding:20px 60px;">\<\a onclick="layer.close(layer2)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" href="'+baseMyUrl+'my/wareHouseCtl/queryMjWarehouse.shtml">去发布\<\/a>\<\/div>'
					
						});
					}else{
						layui.use(['laypage', 'layer'], function(){
							  var laypage = layui.laypage
							  ,layer = layui.layer;
							  
							  laypage({
							    cont: 'demo2'
							    ,pages: data.data.pageCount
							    ,skin: '#2562b4'
						    	,jump: function(obj){
						    		renderGoodsLibraryList(obj.curr);
					    	    }
							  });
							  
						});
					} 
	           }else if(data.code =='0001'){
                	layer4=layer.open({
            		 	type: 1,
            		 	title:false,
            		 	closeBtn: 1,
            		 	area: ['480px', '290px'],
            		 	content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>未认证角色\<\/div>\<\div>尊敬的用户您好，您还未认证角色，请您认证\<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layer4)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" href="'+baseMyUrl+'authentication/toUserCenter.shtml">去认证\<\/a>\<\/div>'
            		 });
            		 return;
               }else{
            	   layerOther=layer.open({
	   			        type: 1,
	   			        title:false,
	   			        closeBtn:1,
	   			        resize:false,
	   			        skin: 'yourclass',
	   			        area: ['483px', '270px'],
	   			        content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>数据加载失败\<\/div>\<\div>'+data.msg+'<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layerOther)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" onclick="layer.close(layerOther)" href="javascript:;">确定\<\/a>\<\/div>'
	   			    });
	               	return;
	           }
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				if(textStatus == "timeout"){
					layerError=layer.open({
    			        type: 1,
    			        title:false,
    			        closeBtn:1,
    			        resize:false,
    			        skin: 'yourclass',
    			        area: ['483px', '270px'],
    			        content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>数据加载失败\<\/div>\<\div>网络超时，请稍后再试\<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layerError)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" onclick="layer.close(layerError)" href="javascript:;">确定\<\/a>\<\/div>'
    			    });
	            }
				$('.mj-loading').hide();
            }
	});
 	
 	
}

//模拟渲染
var renderGoodsLibraryList = function(curr){
	$("#warehouseResourceId").val("");
  //此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
	var dataTemp = {"resourceState":1,"pageNow":curr,"userId":$.cookie("userId"),"pageSize":2}
 	$.ajax({
		url:baseAppUrl+'toOther/complieUrl.shtml',
		type: 'POST',
		timeout:15000,
		dataType: 'jsonp',
		data:{"version":1.0,"targetUrl":"mjWarehouseResourceController/queryMjWarehouseResourceList.shtml","data":JSON.stringify( dataTemp)},
		success : function(data){
			  console.log(data);
	          if(data.code =='0000'){
	    	  	var _data=data.data.warehouse;
	    	  	//循环data的数据，添加车链接
	    	  	var str = "";
				for (var i = 0; i < _data.length; i++) {
					var picArr = _data[i].imgurl;
					var picSrc = $("#baseImageUrl").val()+'storeImage/188/140/'+picArr;
					var warehouseProperty = _data[i].warehouseProperty;
	                      var warehouseType = "";
	                      var warehousePrice ="";
	                      for(var j = 0; j < warehouseProperty.length; j++){
	                      	if(warehouseProperty[j].type == "1"){
	                      		warehouseType += warehouseProperty[j].attributeName+"&nbsp;";
	                      	}
	                      	if(warehouseProperty[j].type == "4"){
	                      		warehousePrice += warehouseProperty[j].value+warehouseProperty[j].attributeName+"&nbsp;";
	                      	}
	                      }
					
					str += "<div class=\"clearfix xzck-boder\" onclick=\"goodsLibraryCheck(this,'"+_data[i].mjWarehouseResourceId+"')\">";
				   		str += "<img class=\"fl\" src=\""+picSrc+"\" alt=\"仓库图片\" width=\"101\" height=\"101\">";
				   		str += "<ul>";
				   			str += "<li><a href=\"javascript\">仓库名称：</a><span>"+_data[i].name+"</span></li>";
				   			str += "<li><a href=\"javascript:;\">仓库类型：</a><span>"+warehouseType+"</span></li>";
				   			str += "<li><a href=\"javascript:;\">仓库价格：</a><span>"+warehousePrice+"</span></li>";
				   		str += "</ul>";
				   		str += "<i class=\"mjFont hide\">&#xe611;</i></div>";
	            };
	            $('.xzck-tk').html(str);
	            
			} 
	              
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus == "timeout"){
				layerError=layer.open({
			        type: 1,
			        title:false,
			        closeBtn:1,
			        resize:false,
			        skin: 'yourclass',
			        area: ['483px', '270px'],
			        content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>数据加载失败\<\/div>\<\div>网络超时，请稍后再试\<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layerError)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" onclick="layer.close(layerError)" href="javascript:;">确定\<\/a>\<\/div>'
			    });
            }
			$('.mj-loading').hide();
        }
	});
};

//库找货下单
function goodsLibraryPlaceOrder(){
	if($("#warehouseResourceId").val() == ''){
		
		layer3=layer.open({
	        type: 1,
	        title:false,
	        closeBtn:1,
	        resize:false,
	        skin: 'yourclass',
	        area: ['483px', '270px'],
	        content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>\<\/div>\<\div>请选择需要交易的库源<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layer3)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" onclick="layer.close(layer3)" href="javascript:;">确定\<\/a>\<\/div>'
	        	
	    });
		return;
	}
	var dataTemp = {userId:$.cookie("userId"),warehouseResourceId:$("#warehouseResourceId").val(),goodsId:$("#warehouseResourceId").attr("goodsId")};
	console.log(dataTemp);
	$('.mask').hide();
	$('.m-ensureInf1').hide();
	$('.mj-loading').show();
	$.ajax({
		url:baseAppUrl+'toOther/complieUrl.shtml',
		type: 'POST',
		timeout:15000,
		dataType: 'jsonp',
		data:{"version":1.0,"targetUrl":"mjOrderWarhouse/addWarhouseFoundGoodsOrder.shtml","data":JSON.stringify( dataTemp)},
		success : function(data){
			console.log(data);
			$('.mj-loading').hide();
           if(data.code=='0000'){
           		layer3=layer.open({
					type: 1,
			 		title:false,
			 		closeBtn: 1,
			 		skin: 'yourclass',
			 		resize:false,
					area: ['480px', '260px'],
					content: '\<\div class="mj-iconF" style="padding:20px 20px 10px;">\<\div class="mj-iconF1">\<\span class="mjFont">&#xe611;\<\/span>\<\/div>\<\div>\下单成功,等待货主接受订单<\/div>\<\/div>\<\div class="mj-alL">\<\a class="mj-rzL" style="margin-left:75px;" onclick="closeAll();" href="javascript:;">确定\<\/a>\<\/div>'
				});
           }else{
           	//下单失败
			    layer3=layer.open({
			        type: 1,
			        title:false,
			        closeBtn:1,
			        resize:false,
			        skin: 'yourclass',
			        area: ['480px', '270px'],
			        content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>下单失败\<\/div>\<\div>'+data.msg+'<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layer3)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" onclick="layer.close(layer3)" href="javascript:;">确定\<\/a>\<\/div>'
			        	
			    });
           }
			
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus == "timeout"){
				layerError=layer.open({
			        type: 1,
			        title:false,
			        closeBtn:1,
			        resize:false,
			        skin: 'yourclass',
			        area: ['483px', '270px'],
			        content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>数据加载失败\<\/div>\<\div>网络超时，请稍后再试\<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layerError)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" onclick="layer.close(layerError)" href="javascript:;">确定\<\/a>\<\/div>'
			    });
            }
			$('.mj-loading').hide();
        }
	});
}

function goodsLibraryCheck(that,id){
	$('.xzck-boder').find('i').hide();
	$(that).find('i').show();
	$("#warehouseResourceId").val(id);
}

/**
 * 库找货源列表抢单相关，结束
 * @param n
 */

/**
 * 车找货源列表抢单相关，开始
 * @param n
 */
function goodsLine(obj,goodsResourceId){
	//校验登录状态
	var checkStatus = checkLogin();
   	if(checkStatus == false){
   		loginBox();
   		return;
   	}
   	
   	//校验角色状态
	if(certificationRole == null || certificationRole ==''){
		layer4=layer.open({
		 	type: 1,
		 	title:false,
		 	resize:false,
		 	closeBtn: 1,
		 	area: ['480px', '290px'],
		 	content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>未认证角色\<\/div>\<\div>尊敬的用户您好，您还未认证角色，请您认证\<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layer4)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" href="'+baseMyUrl+'authentication/toUserCenter.shtml">去认证\<\/a>\<\/div>'
		 });
		 
		 return;
	}else if(certificationStatus != 2){
		layer4=layer.open({
		 	type: 1,
		 	title:false,
		 	resize:false,
		 	closeBtn: 1,
		 	area: ['480px', '290px'],
		 	content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>未认证角色\<\/div>\<\div>尊敬的用户您好，您还未认证角色，请您认证\<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layer4)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" href="'+baseMyUrl+'authentication/toUserCenter.shtml">去认证\<\/a>\<\/div>'
		 });
		 return;
	}else if(certificationRole == 4 || certificationRole == 5 || certificationRole == 6){
		$('.posi-ts').hide();
		$(obj).siblings('.posi-ts').show();
		$(obj).siblings('.posi-ts').fadeOut(3000); 
		return;
	}
	$("#goodsResourceId").val(goodsResourceId);
	$("#carrierName").text($.cookie("userName"));
	$("#phoneNum").val($.cookie("llmj_login_name"));
	
	layer.closeAll();
    layer1 = layer.open({
        type: 1,
        title: false,
        resize:false,
        closeBtn:1,
        skin: 'yourclass',
        area: ['580px'],
        content: $(".m-ensureInf")
    });
    return false;
}
//下单
function goodsLinePlaceOrder(){
	//判断手机号码是否输入正确
	var regPhone = /^[1][3-8]\d{9}$/;//手机
	if (!regPhone.test($("#phoneNum").val())) {
 	   layer3=layer.open({
	        type: 1,
	        title:false,
	        closeBtn:1,
	        resize:false,
	        skin: 'yourclass',
	        area: ['480px', '270px'],
	        content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>错误提示\<\/div>\<\div>请输入正确手机号码\<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layer3)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" onclick="layer.close(layer3)" href="javascript:;">确定\<\/a>\<\/div>'
	        	
	    });
 	   return;
	}
	layer.close(layer1);
	var dataTemp = {lineUserId:$.cookie("userId"),phone:$("#phoneNum").val(),goodsResourceId:$("#goodsResourceId").val()}
	console.log(dataTemp);
	$('.mj-loading').show();
	$.ajax({
		url:baseAppUrl+'toOther/complieUrl.shtml',
		type: 'POST',
		timeout:15000,
		dataType: 'jsonp',
		data:{"version":1.0,"targetUrl":"robOrderCtl/carUserRobGoods.shtml","userId":$.cookie("userId"),"data":JSON.stringify( dataTemp)},
		success : function(data){
			console.log(data);
			$('.mj-loading').hide();
           if(data.code=='0000'){
        	   layer3=layer.open({
					type: 1,
			 		title:false,
			 		closeBtn: 1,
			 		skin: 'yourclass',
			 		resize:false,
					area: ['480px', '260px'],
					content: '\<\div class="mj-iconF" style="padding:20px 20px 10px;">\<\div class="mj-iconF1">\<\span class="mjFont">&#xe611;\<\/span>\<\/div>\<\div>\下单成功,等待货主接受订单<\/div>\<\/div>\<\div class="mj-alL">\<\a class="mj-rzL" style="margin-left:75px;" onclick="closeGoodsLine();" href="javascript:;">确定\<\/a>\<\/div>'
				});
           }else{
           	   //下单失败
        	   layer3=layer.open({
			        type: 1,
			        title:false,
			        closeBtn:1,
			        resize:false,
			        skin: 'yourclass',
			        area: ['480px', '270px'],
			        content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>下单失败\<\/div>\<\div>'+data.msg+'<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layer3)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" onclick="layer.close(layer3)" href="javascript:;">确定\<\/a>\<\/div>'
			        	
			    });
           }
			
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus == "timeout"){
				layerError=layer.open({
			        type: 1,
			        title:false,
			        closeBtn:1,
			        resize:false,
			        skin: 'yourclass',
			        area: ['483px', '270px'],
			        content: '\<\div class="mj-iconF mj-iconF2" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>数据加载失败\<\/div>\<\div>网络超时，请稍后再试\<\/div>\<\/div>\<\div class="mj-alL">\<\a onclick="layer.close(layerError)" href="javascript:;">取消\<\/a>\<\a class="mj-rzL" onclick="layer.close(layerError)" href="javascript:;">确定\<\/a>\<\/div>'
			    });
            }
			$('.mj-loading').hide();
        }
	});
}
/**
 * 车找货源列表抢单相关，结束
 * @param n
 */

