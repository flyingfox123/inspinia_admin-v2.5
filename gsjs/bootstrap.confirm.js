/**
 * bootstrap 弹窗
 * 
 */
$(function(){
	"use strict"
	
	var defaults={
			type	:	'modal-default',
			title	:	'默认标题',
			content	:	function(cnt){
				return '默认内容';
			},
			validate:	function(btn, data, cnt){
				return true;
			},
			showClose: true,
			buttons	:[
		       	  /**
		       	  {
		       		name:'ok',
		       		text:'确认',
		       		click:function(btn, data){
		       			console.log('click ok!')
		       		}
		       	  }**/
			],
			listeners:{
				showing:function(cnt){
				},
				closing:function(cnt){
				}
			},
			_template	:	$('#bootstrap_confirm'),
			_modal		: null,
			getModal	:function(){
				return this._modal;
			},
			hidden		: function(){
				this.getModal().modal('hide')
			},
			getCnt		:function(){
				return this.getModal().find('.modal-body:first')
			},
			setType		:function(n){
				this.getModal().find('.modal-dialog:eq(0)').removeClass('modal-lg').removeClass('modal-default').removeClass('modal-sm').addClass(n)
			}
	}
	

	/**
	 * 确认窗口
	 */
	$.Dialog = function(title, text, callback, options){
		var opt = $.extend(
				true, 
				opt,
				{
					title	:	title, 
					content	: 	text,
					type	:	'modal-sm'
				}, 
				{
					buttons:[
					  {
			       		name:'ok',
			       		text:'确认',
			       		click:function(btn, data){
			       			if(callback)
			       				callback(btn, data)
			       		}
			       	  }
					]
				}, options||{});
		$.Confirm(opt);
	}
	
	/**
	 * 1.获取弹窗模版
	 */
	$._getTmp = function(cfg){
		return cfg._template.tmpl(cfg)
	}
	
	/**
	 * 2.匹配默认属性
	 */
	$._getOpt = function(opt){
		opt = opt||{};
		delete opt['_template'];
		return $.extend(true, {}, defaults, opt);
	}
	
	/**
	 * 3.默认窗口
	 */
	$.Confirm = function(opt){
		var cfg = $._getOpt(opt);
		var modal = $._getTmp(cfg);
		
		var body1 = modal.find('.modal-body:first')
		body1.empty().append(
			$.isFunction(cfg.content)?cfg.content():cfg.content
		)
		
		$('body').append(modal)
		
		$.extend(true, cfg, {_modal: modal});
		
		modal.off().removeData('bootstrap.confirm');
		
		return modal.data('bootstrap.confirm', cfg).off()
	    .on('show.bs.modal', function () {
	    	var modal = $(this);
	    	var cfg = modal.data('bootstrap.confirm')
	    	if($.isArray(cfg.buttons) && cfg.buttons.length>0){
	    		modal.find('.modal-footer button').each(function(i,b){
		    		$.each(cfg.buttons, function(j,o){
		    			if(o.name == $(b).attr('name')){
		    				$(b).off('click').click(function(){
		    					if(cfg.validate($(b), o, cfg)){
									cfg.hidden();
									o.click($(b), o, cfg);
		    					}
		    				})
		    			}
		    			
		    		})
		    	})
	    	}
	    	
	    	if($.isFunction(cfg.listeners.shown))
	    		cfg.listeners.shown(this,cfg);
	    	
	    	if($.isFunction(cfg.listeners.showing)){
	    		setTimeout(function(){
	    			cfg.listeners.showing(cfg);
	    		},1000)
	    	}
	  	})
	  	.on('hidden.bs.modal', function () {
	  		var modal = $(this);
	    	var cfg = modal.data('bootstrap.confirm')
	    	if($.isFunction(cfg.listeners.closing))
	    		cfg.listeners.closing(cfg);
	    	modal.remove();
	  	})
	  	.modal('toggle')
	}
})