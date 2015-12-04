/**
 * FS Tree View
 * Plugin takes JSON data that contains filesystem info and convert it into tree view.
 * @author Valery V. Krukov
 * @version 1.0.0
 */

;(function($){
	$.fsTreeView=function(el,options){
		var _options=$.extend({
			apiUrl:null,
			apiKey:null,
			folderClosedIcon:'<i class="glyphicon glyphicon-folder-close"></i>',
			folderOpenIcon:'<i class="glyphicon glyphicon-folder-open"></i>',
			fileIcon:'<i class="glyphicon glyphicon-open-file"></i>',
			fileCallback:null
		},options);
		var self=this;
		self.$el=$(el);
		self.el=el;
		self.$el.data('fsTreeView',self);
		self._html='';
		self.bytesToSize=function(bytes){
			var sizes=['Bytes','KB','MB','GB','TB'];
			if(bytes==0){
				return '0 Bytes';
			}
			var i=parseInt(Math.floor(Math.log(bytes)/Math.log(1024)));
			return Math.round(bytes/Math.pow(1024,i),2)+' '+sizes[i];
		};
		self.buildHtmlTree=function(data,level){
			self._html='<ul class="pi-tree-item"'+(level>0?' style="display:none;"':'')+'>';
			if(data.length>0){
				$.each(data,function(k,item){
					self._html+='<li>';
					self._html+=(item.type=='folder'?_options.folderClosedIcon:_options.fileIcon)+' ';
					self._html+='<a href="#" data-path="'+item.path+'" data-type="'+item.type+'" data-size="'+self.bytesToSize(parseInt(item.size))+'">'+item.name+'</a>';
					if(item.type=='folder'){
						level++;
						self._html+=self.buildHtmlTree(item.items,level);
					}
					self._html+='</li>';
				});
			}
			self._html+='</ul>';
			return self._html;
		};
		self.buildView=function(data){
			data=self.sortData(data);
			self.buildHtmlTree(data,0);
			self.$el.html(self._html);
			$.each(self.$el.find('a[data-type=folder]'),function(){
				$(this).click(function(e){
					e.preventDefault();
					if($(this).next().is(':visible')){
						$(this).prev().replaceWith(_options.folderClosedIcon);
						$(this).next().hide();
					}else{
						$(this).prev().replaceWith(_options.folderOpenIcon);
						$(this).next().show();
					}
				});
			});
			$.each(self.$el.find('a[data-type=file]'),function(){
				$(this).click(function(e){
					e.preventDefault();
					if(_options.fileCallback!=null){
						_options.fileCallback(e.target);
					}
				});
			});
		};
		self.sortData=function(data){
			data=data.sort(function(a,b){
				var a1=a.name,b1=b.name;
				if(a1==b1){
					return 0;
				}
				return a1>b1?1:-1;
			});
			data=data.sort(function(a,b){
				var a1=a.type,b1=b.type;
				if(a1==b1){
					return 0;
				}
				return b1=='folder'?1:-1;
			});
			return data;
		};
		self.loadData=function(){
			if(_options.apiUrl==null){
				alert('Parameter `apiUrl` is required.');
			}else{
				var _data={};
				if(_options.apiKey!=null){
					_data={apiKey:_options.apiKey};
				}
				$.ajax({
					url:_options.apiUrl,
					type:'get',
					data:_data,
					success:function(resp){
						if(resp.status=='ok'){
							self.buildView(resp.files);
						}
					}
				});
			}
		};
		self.init=function(){
			self.loadData();
		};
		self.init();
	};
	$.fn.fsTreeView=function(options){
		return this.each(function(){
			(new $.fsTreeView(this,options));
		});
	};
})(jQuery);

