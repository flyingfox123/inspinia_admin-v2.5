/**
 * Created by admin on 2016/10/17.
 */
/*自定义下拉框*/
(function ($){
    
     // 反馈
    var backTop = {
        disY : 200,
        speed : 200,
        domEl : $('<div id="backTop02"></div>'),
        dtnShow : function(){
            $("#backTop02 .f-helper").on("click",function(){
                $('.mubtS').stop().slideToggle();
            });
        },
        btnFn : function(){
            $("#backTop02 .f-toTop").on("click",function(){
                $("body,html").stop().animate({scrollTop: 0},400);
            });
        },
        scrollFn : function(){
            var _this = this;
            $(window).scroll(function(event) {
            /* Act on the event */
                var st = $(window).scrollTop();
                if(st > _this.disY){
                    $(".f-toTop").stop().animate({height: '60px'},400);
                }else{
                    $(".f-toTop").stop().animate({height: 0},400);
                }
            });
        },
        init : function(){
            var fixIcon = '';
            fixIcon += '<a href="javascript:;" class="f-helper"><img src="http://pic.lenglianmajia.com/images/helper03.png" width="50" height="50"></a>';
            fixIcon += '<div class="mubtS"><a href="javascript:void(0);" onclick="TQKF.OpenChat(\'acd\',7);return false;"><em class="mjFont">&#xe646;</em><span>交易咨询</span></a>';
            fixIcon += '<a href="javascript:void(0);" onclick="TQKF.OpenChat(\'acd\',8);return false;"><em class="mjFont">&#xe644;</em><span>认证咨询</span></a>';
            fixIcon += '<a href="javascript:void(0);" onclick="TQKF.OpenChat(\'acd\',9);return false;"><em class="mjFont">&#xe603;</em><span>货源咨询</span></a>';
            fixIcon += '<a href="javascript:void(0);" onclick="TQKF.OpenChat(\'acd\',10);return false;"><em class="mjFont">&#xe605;</em><span>车源咨询</span></a>';
            fixIcon += '<a href="javascript:void(0);" onclick="TQKF.OpenChat(\'acd\',11);return false;"><em class="mjFont">&#xe60a;</em><span>库源咨询</span></a></div>';
            // fixIcon += '<a href="'+$("#baseCenterServer").val()+'/feedback/toFeedback.shtml"><em class="mjFont">&#xe641;</em><span>意见反馈</span></a></div>';
            if ($(window).scrollTop() > this.disY) {
                fixIcon += '<a href="javascript:;" class="f-toTop" style="height:60px"><em class="mjFont">&#xe63f;</em><span>返回顶部</span></a>';
            }else{
                fixIcon += '<a href="javascript:;" class="f-toTop"><em class="mjFont">&#xe63f;</em><span>返回顶部</span></a>';
            }
           
            this.domEl.html(fixIcon);
            $("body").append(this.domEl);
            this.btnFn();
            this.dtnShow();
            this.scrollFn();
        }
    };
    if ($('body').attr('load_tq')=='false') {
        return
    }else{
        backTop.init();
    };

    
    $.fn.xeFormSel = function(){
        return this.each(function(index,el){
            //$(".mySel").remove();
            var width= null;
            if($(el).attr("data-width")){
                width = $(el).attr("data-width");
            }
            var osel = $(el).find('select');
            for(var i=0,len=osel.length;i<len;i++){
                //console.log(osel.eq(i).attr("disabled"))
                if(osel.eq(i).attr("disabled")){
                    var mySel = $("<div class='mySel mySel_disabled'></div>");
                }else{
                    var mySel = $("<div class='mySel'></div>");
                }
                var osDiv = $("<div class='mySel_result'><span></span><i class='mjFont'>&#xe606;</i></div>");
                var osUl = $("<ul class='mySel_ul'></ul>");
                var _thisSel = osel.eq(i).addClass("select"+i);
                var options = _thisSel.find("option");
                var otxt = _thisSel.find("option:selected").html() || "请选择";
                var str="";
                if(width){
                    osDiv.css("width",width + "px");
                    osUl.css("width",(parseInt(width)+25) + "px");
                }
                osDiv.find("span").html(otxt).attr("title",otxt);

                for(var o=0,olen=options.length;o<olen;o++){

                    if(o == options.length - 1){
                        str+= "<li class='li-last' title="+options.eq(o).html()+" data-select=select"+i+" data-value="+options.eq(o).attr("value")+"><span>"+options.eq(o).html()+"</span></li>";
                    }else{
                        str+= "<li title="+options.eq(o).html()+" data-select=select"+i+" data-value="+options.eq(o).attr("value")+"><span>"+options.eq(o).html()+"</span></li>";
                    }
                }
                osUl.append(str);
                mySel.append(osDiv).append(osUl);
                $(el).append(mySel);

                if(osUl.find('li').length >= 9) {
                    osUl.addClass('mySel_ul_scroll');
                }

                //osel.hide();

                mySel.on("click",function(ev){
                    ev.stopPropagation();
                    if($(this).hasClass('mySel_disabled')) return;
                    if($(this).hasClass('mySel_act')){
                        $(".mySel_ul").hide();
                        $(".mySel").removeClass('mySel_act');
                        return;
                    }
                    $(".mySel_ul").hide();
                    $(".mySel").removeClass('mySel_act');
                    $(this).addClass('mySel_act');
                    $(this).find('ul').slideDown(50);
                    //再次点击时显示的值不会被遮挡
                    /*$('.mjFormSel').css('zIndex','1');
                    $(this).parents('.u-selectBox').css('zIndex','2')*/

                });

                mySel.on("click","li",function(ev){
                    ev.stopPropagation();
                    $(this).parents(".mySel_ul").find("li").removeClass('active').eq($(this).index()).addClass('active');
                    $(this).parents(".mySel").find(".mySel_result span").html($(this).text());
                    $(this).parents(".mjFormSel").find('select').val($(this).attr("data-value")).change();
                    $(".mySel_ul").slideUp(50);
                    $(".mySel").removeClass('mySel_act');
                })
            }

            $(document).on("click",function(){
                $(".mySel_ul").slideUp(50);
                $(".mySel").removeClass('mySel_act');
                /*$(".mySel_ul").parents('.u-selectBox').css('zIndex','1')*/
            })
        });
    };
})(jQuery)
$(function(){
    if($(".mjFormSel").length){
          $(".mjFormSel").xeFormSel();
    };
    $('.title .titleLi').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        var num = $(this).index();
        var move = -11+(num * 104) ;
        var move1 = 51+(num*104);
        $('.title .arrow-up').animate({'left':move1 + 'px'},500);
        $('.title .line').animate({'left':move + 'px'},500);
        $('.g-content').eq(num).show().siblings('div').hide();
    });
    $('.mj-news').slider(307,4);
    $('.mj-partner').slider(217,5);
    $('.u-inptBtn').on('mousedown',function(){
        $(this).css('background','#3278d7');
    });
    $('.u-inptBtn').on('mouseup',function(){
        $(this).css('background','#2562b4');
    });
})
/*自定义下拉框end*/

$(function(){
	/*个人中心左侧栏选中效果 */
	$('.person-left').find('dd').click(function(){
	       $('dd').removeClass('PS-active');
	       $(this).addClass('PS-active');
	});


});

/*头部选中效果*/
function selectedStatus(item){
	$('.nav-content').find('a').removeClass('active');
	$('.nav-content').find('a').eq(item).addClass('active');
}
/*自定义控制台打印，测试环境使用，生产环境注掉*/
function consoleLog(data){
	//console.log(data);
}


/*新闻轮播*/
$.fn.extend({
    slider: function(Wid,le) {
        var i=0;
        var k =$(this).find('.n-lists').find('.news-list').length
        $(this).find('.n-left').click(function(){
            i--;
            if(i<0){
                i=0;
            };
            $(this).siblings('.new-h').find('.n-lists').stop().animate({'left':i*-Wid+'px'},500)
        });
        $(this).find('.n-right').click(function(){
            i++;
            if(i>(k-le)){
                i=((k-le))
            };
            $(this).siblings('.new-h').find('.n-lists').stop().animate({'left':i*-Wid+'px'},500)
        });
    }
});
/*end*/
/*上传照片*/
$.fn.extend({
    uploadPreview: function (opts) {
        var _self = this,
            _this = $(this);
        opts = jQuery.extend({
            Img: "ImgPr",
            Width: 100,
            Height: 100,
            ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
            Callback: function () {}
        }, opts || {});
        _self.getObjectURL = function (file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file)
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file)
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file)
            }
            return url
        };
        _this.change(function () {
            var that = this;
            if (this.value) {
                if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                    // layer.alert("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "中的一种",{
                    //     title:" ",
                    //     area: ['480px', '240px']
                    // });
                    this.value = "";
                    return false
                }
                if (navigator.userAgent.indexOf("MSIE")!=-1) {

                    try {
                        $(that).parents(".my-inImg,.img-upload,.fileJs").find("img").attr('src', _self.getObjectURL(this.files[0]))
                    } catch (e) {
                        var src = "";
                        var obj = $(that).parents(".my-inImg,.img-upload,.fileJs").find("img")
                        var div = obj.parent("div")[0];
                        _self.select();
                        if (top != self) {
                            window.parent.document.body.focus()
                        } else {
                            _self.blur()
                        }
                        //var src = $(that).val();
                        var src = document.selection.createRange().text;
                        //alert(src)
                        $(that).parents(".my-inImg,.img-upload,.fileJs").find("img").removeAttr('src').removeAttr('alt');
                        document.selection.empty();
                        obj.hide();
                        //obj.parent("div").removeAttr("style");
                        obj.parent("div").css({
                            'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)',
                            'width': opts.Width + 'px',
                            'height': opts.Height + 'px'

                        });
                        div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                    }
                } else {
                    $(that).parents(".my-inImg,.img-upload,.fileJs").find("img").attr('src', _self.getObjectURL(this.files[0]))
                }
                opts.Callback(this);
            }
        })
    }
});

var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
function fileChange(target,id) {
    var fileSize = 0;
    var filetypes =[".JPG",".jpeg",".png",".PNG",".bmp",".BMP",".gif", ".GIF",".tmp.jpg", ".jpg",];
    var filepath = target.value;
    var filemaxsize = 6*1024;//2M
    if(filepath){
        var isnext = false;
        var fileend = filepath.substring(filepath.indexOf("."));
        if(filetypes && filetypes.length>0){
            for(var i =0; i<filetypes.length;i++){
                if(filetypes[i]==fileend){
                    isnext = true;
                    break;
                }
            }
        }
        if(!isnext){
            /*layer.alert("不接受此文件类型！",{
                title:" ",
                area: ['480px', '240px']
            });*/
        	layerMy=layer.open({
                type: 1,
                title:false,
                area: ['370px', '266px'],
                content: '\<\div class="mj-iconF" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>\<\/div>\<\div>不支持此文件类型！\<\/div>\<\/div>',
                closeBtn: 1,
                btn: ['确定'],
                yes: function(index, layero){
                    layer.close(layerMy);
                }
        	});
            target.value ="";
            return false;
        }
    }else{
        return false;
    }
    if (isIE && !target.files) {
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        if(!fileSystem.FileExists(filePath)){
            /*layer.alert("附件不存在，请重新输入！",{
                title:" ",
                area: ['480px', '240px']
            });*/
        	layerMy1=layer.open({
                type: 1,
                title:false,
                area: ['370px', '266px'],
                content: '\<\div class="mj-iconF" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>\<\/div>\<\div>附件不存在，请重新输入！\<\/div>\<\/div>',
                closeBtn: 1,
                btn: ['确定'],
                yes: function(index, layero){
                    layer.close(layerMy1);
                }
        	});
            return false;
        }
        var file = fileSystem.GetFile (filePath);
        fileSize = file.Size;
    } else {
        fileSize = target.files[0].size;
    }
    var size = fileSize / 1024;
    if(size>filemaxsize){
       /* layer.alert("附件大小不能大于"+filemaxsize/1024+"M！",{
            title:" ",
            area: ['480px', '240px']
        });*/
    	layerMy2=layer.open({
            type: 1,
            title:false,
            area: ['370px', '266px'],
            content: '\<\div class="mj-iconF" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>\<\/div>\<\div>附件大小不能大于'+filemaxsize/1024+'M！\<\/div>\<\/div>',
            closeBtn: 1,
            btn: ['确定'],
            yes: function(index, layero){
                layer.close(layerMy2);
            }
    	});
        target.value ="";
        return false;
    }
    if(size<=0){
        /*layer.alert('附件大小不能为0K！',{
            title:" ",
            area: ['480px', '240px']
        });*/
    	layerMy3=layer.open({
            type: 1,
            title:false,
            area: ['370px', '266px'],
            content: '\<\div class="mj-iconF" style="padding:20px 20px 10px;">\<\div class="mj-iconF mj-iconF2">\<\span class="mjFont">&#xe67e;\<\/span>\<\/div>\<\div>附件大小不能为0K！\<\/div>\<\/div>',
            closeBtn: 1,
            btn: ['确定'],
            yes: function(index, layero){
                layer.close(layerMy3);
            }
    	});
        target.value ="";
        return false;
    }
}
// function myAlert(){
//     var str = '<div class="my-scMask"></div>' +
//         '<div class="my-scContent">' +
//         '<div class="my-scCon clearfix"> ' +
//         '<div class="my-scTitle fl">头像设置</div> ' +
//         '<a href="javascript:;" class="mjFont fr mj-scc">&#xe615;</a> ' +
//         '</div> ' +
//         '<div class="my-file"> ' +
//         '<div class="my-inImg"> ' +
//         '<img id="ImgPr" width="120" height="120"  src="" />'+
//         '<input id="up" type="file"/> ' +
//         '</div> <p>只支持JPG、PNG、GIF,大小不超过500k。</p> ' +
//         '</div> ' +
//         '<div class="my-mjBtn clearfix"> ' +
//         '<a href="#" class="fl">确定</a> ' +
//         '<a href="#" class="fl fileRemove">取消</a> ' +
//         '</div> ' +
//         '</div>';
//     $('body').append(str);
//     $('body').on('click','.mj-scc',function(){
//         $('.my-scMask').remove();
//         $('.my-scContent').remove();
//     });
//     $('body').on('click','.fileRemove',function(){
//         $('.my-scMask').remove();
//         $('.my-scContent').remove();
//     });
//     $('#up').change(function(){
//         fileChange(this);
//     });
//     $("#up").uploadPreview({ Img: "ImgPr", Width: 120, Height: 120 });
// }
// $('.heda-inputFile').click(function(){
//     myAlert();
// })
/*上传end*/
//validate 封装对象方法
$.fn.extend({
    /**
     * 显示表单提示信息
     * @param {Object} op
     */
    showMsg: function(op) {
        return this.each(function() {
            var $this = $(this),
                _type = this.type,
                list = $this.data("msgList"),
                index = op ? (typeof op == "number" ? op : op.i) : 0,
                $li;
            var showMsgEle = $this.attr("validate-ele-id");
            if (typeof list == "undefined") {
                if (typeof showMsgEle == "undefined" || showMsgEle == "") {
                    list = ((_type === "radio" || _type === "checkbox") ? $this.parent() : $this).nextAll(".u-msg").children()
                } else {
                    list = $("#" + showMsgEle).children();
                }
                $this.data("msgList", list);
            }
            $li = $(this).parents(".validate-parent").find(".u-msg li").removeClass("active").eq(index).addClass("active");
            if (typeof op == "object" && typeof op.msg == "string") {
                $li.find("span").html(op.msg);
            }
        })
    }
});

$('.store-selector').find('.text').click(function(){
    $(this).find('p').css('color','#333')
})
 $('.u-aNext1').click(function(){
    if (typeof($('.content_info').attr('data-provinceid'))!=="") {
       $('.store-selector').find('.text').find('p').css('color','#333')
    }
    
 })
 // 图片放大
 $('.mj-inptext img').on('click',function(){
            var oImg=$(this).attr('src');
             $('.tanchu img').attr('src',oImg);
            $('.tanchu').show();
        })
        $('.i-tanchu a').on('click',function(){
            $(this).parents('.tanchu').hide();

        })
        
        $(".i-tanchu").mouseover(function () {
                     $('.i-tanchu i').show();
                 });
                 $(".i-tanchu").mouseleave(function () {
                     $('.i-tanchu i').hide();
                  });
        var value2 =0
        var n =true;
        var clearj;
        $('.i-Left').on('click',function(){
            $('.i-Right').stop();
            console.log(n)
             value2 -=90;
                     $('.tanchu img').rotate({ 
                        animateTo:value2,
                        duration:1000
                     })
                        if(n){
                            $(".i-tanchu a").hide();
                            $(".i-tanchu a").removeClass('a1').addClass("a2");
                            setTimeout(function(){
                                $(".i-tanchu a").show();
                    
                            },1000)
                            n=false;
                        }
                        else{
                            $(".i-tanchu a").hide();
                            $(".i-tanchu a").removeClass('a2').addClass("a1");
                            clearj=setTimeout(function(){
                                $(".i-tanchu a").show();
                                
                            },1000)
                            n=true;
                        }          
        })      
        $('.i-Right').on('click',function(){
            $('.i-Left').stop();
             value2 +=90;
                     $('.tanchu img').rotate({ 
                        animateTo:value2,
                        duration:1000
                     })
                     if(n){
                            $(".i-tanchu a").hide();
                            $(".i-tanchu a").removeClass('a1').addClass("a2");
                            setTimeout(function(){
                                $(".i-tanchu a").show();
                    
                            },1000)
                            n=false;
                        }
                        else{
                            $(".i-tanchu a").hide();
                            $(".i-tanchu a").removeClass('a2').addClass("a1");
                            clearj=setTimeout(function(){
                                $(".i-tanchu a").show();
                            
                            },1000)
                            n=true;
                        }        
        })
$('input').attr('autocomplete','off');