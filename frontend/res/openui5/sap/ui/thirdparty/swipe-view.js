/*!
 * SwipeView v1.0 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
var SwipeView=(function(w,d){var a=d.createElement('div').style,v=(function(){var e='t,webkitT,MozT,msT,OT'.split(','),t,i=0,l=e.length;for(;i<l;i++){t=e[i]+'ransform';if(t in a){return e[i].substr(0,e[i].length-1)}}return false})(),c=v?'-'+v.toLowerCase()+'-':'',b=z('transform'),f=z('transitionDuration'),h=z('perspective')in a,g='ontouchstart'in w,j=!!v,k=z('transition')in a,m=h?' translateZ(0)':'',r='onorientationchange'in w?'orientationchange':'resize',s=g?'touchstart':'mousedown',o=g?'touchmove':'mousemove',q=g?'touchend':'mouseup',u=g?'touchcancel':'mouseup',y=(function(){if(v===false)return false;var t={'':'transitionend','webkit':'webkitTransitionEnd','Moz':'transitionend','O':'oTransitionEnd','ms':'MSTransitionEnd'};return t[v]})(),S=function(e,l){var i,n,p,t;this.wrapper=typeof e=='string'?d.querySelector(e):e;this.options={text:null,numberOfPages:3,snapThreshold:null,hastyPageFlip:false,loop:true};for(i in l)this.options[i]=l[i];this.wrapper.style.overflow='hidden';this.wrapper.style.position='relative';this.masterPages=[];n=d.createElement('div');n.id=this.wrapper.parentElement.id+'-slider';n.style.cssText='position:absolute;top:0;height:100%;width:100%;'+c+'transition-duration:0;'+c+'transform:translateZ(0);'+c+'transition-timing-function:ease-out';this.wrapper.appendChild(n);this.slider=n;this.refreshSize();for(i=-1;i<2;i++){n=d.createElement('div');n.id=this.wrapper.parentElement.id+'-masterpage-'+(i+1);n.style.cssText=c+'transform:translateZ(0);position:absolute;top:0;height:100%;width:100%;left:'+i*100+'%';if(!n.dataset)n.dataset={};t=i==-1?this.options.numberOfPages-1:i;n.dataset.pageIndex=t;n.dataset.upcomingPageIndex=t;if(!this.options.loop&&i==-1)n.style.visibility='hidden';this.slider.appendChild(n);this.masterPages.push(n)}p=this.masterPages[1].className;this.masterPages[1].className=!p?'swipeview-active':p+' swipeview-active';w.addEventListener(r,this,false);this.wrapper.addEventListener(s,this,false);this.wrapper.addEventListener(o,this,false);this.wrapper.addEventListener(q,this,false);this.slider.addEventListener(y,this,false);if(v=='O')this.slider.addEventListener(y.toLowerCase(),this,false);this._bPerformInitialSizeCheck=true};S.prototype={currentMasterPage:1,x:0,page:0,pageIndex:0,customEvents:[],onFlip:function(e){this.wrapper.addEventListener('swipeview-flip',e,false);this.customEvents.push(['flip',e])},onMoveOut:function(e){this.wrapper.addEventListener('swipeview-moveout',e,false);this.customEvents.push(['moveout',e])},onMoveIn:function(e){this.wrapper.addEventListener('swipeview-movein',e,false);this.customEvents.push(['movein',e])},onTouchStart:function(e){this.wrapper.addEventListener('swipeview-touchstart',e,false);this.customEvents.push(['touchstart',e])},destroy:function(){while(this.customEvents.length){this.wrapper.removeEventListener('swipeview-'+this.customEvents[0][0],this.customEvents[0][1],false);this.customEvents.shift()}w.removeEventListener(r,this,false);this.wrapper.removeEventListener(s,this,false);this.wrapper.removeEventListener(o,this,false);this.wrapper.removeEventListener(q,this,false);this.slider.removeEventListener(y,this,false);this.fnLoadingCallback=null},refreshSize:function(){this.wrapperWidth=this.wrapper.clientWidth;this.wrapperHeight=this.wrapper.clientHeight;this.pageWidth=this.wrapperWidth;this.maxX=-this.options.numberOfPages*this.pageWidth+this.wrapperWidth;this.snapThreshold=this.options.snapThreshold===null?Math.round(this.pageWidth*0.15):/%/.test(this.options.snapThreshold)?Math.round(this.pageWidth*this.options.snapThreshold.replace('%','')/100):this.options.snapThreshold},updatePageCount:function(n){this.options.numberOfPages=n;this.maxX=-this.options.numberOfPages*this.pageWidth+this.wrapperWidth},goToPage:function(p){var i;this.masterPages[this.currentMasterPage].className=this.masterPages[this.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/,'');for(i=0;i<3;i++){className=this.masterPages[i].className;/(^|\s)swipeview-loading(\s|$)/.test(className)||(this.masterPages[i].className=!className?'swipeview-loading':className+' swipeview-loading');if(this.fnLoadingCallback){this.fnLoadingCallback.call(undefined,i,true)}}p=p<0?0:p>this.options.numberOfPages-1?this.options.numberOfPages-1:p;this.page=p;this.pageIndex=p;this.slider.style[f]='0s';this.__pos(-p*this.pageWidth);this.currentMasterPage=(this.page+1)-Math.floor((this.page+1)/3)*3;this.masterPages[this.currentMasterPage].className=this.masterPages[this.currentMasterPage].className+' swipeview-active';if(this.currentMasterPage===0){this.masterPages[2].style.left=this.page*100-100+'%';this.masterPages[0].style.left=this.page*100+'%';this.masterPages[1].style.left=this.page*100+100+'%';this.masterPages[2].dataset.upcomingPageIndex=this.page===0?this.options.numberOfPages-1:this.page-1;this.masterPages[0].dataset.upcomingPageIndex=this.page;this.masterPages[1].dataset.upcomingPageIndex=this.page==this.options.numberOfPages-1?0:this.page+1}else if(this.currentMasterPage==1){this.masterPages[0].style.left=this.page*100-100+'%';this.masterPages[1].style.left=this.page*100+'%';this.masterPages[2].style.left=this.page*100+100+'%';this.masterPages[0].dataset.upcomingPageIndex=this.page===0?this.options.numberOfPages-1:this.page-1;this.masterPages[1].dataset.upcomingPageIndex=this.page;this.masterPages[2].dataset.upcomingPageIndex=this.page==this.options.numberOfPages-1?0:this.page+1}else{this.masterPages[1].style.left=this.page*100-100+'%';this.masterPages[2].style.left=this.page*100+'%';this.masterPages[0].style.left=this.page*100+100+'%';this.masterPages[1].dataset.upcomingPageIndex=this.page===0?this.options.numberOfPages-1:this.page-1;this.masterPages[2].dataset.upcomingPageIndex=this.page;this.masterPages[0].dataset.upcomingPageIndex=this.page==this.options.numberOfPages-1?0:this.page+1}this.__flip()},next:function(){if(!this.options.loop&&this.pageIndex===this.options.numberOfPages-1)return;this.initialSizeCheck();this.directionX=-1;this.x-=1;this.__checkPosition()},prev:function(){if(!this.options.loop&&this.pageIndex===0)return;this.initialSizeCheck();this.directionX=1;this.x+=1;this.__checkPosition()},handleEvent:function(e){switch(e.type){case s:this.__start(e);break;case o:this.__move(e);break;case u:case q:this.__end(e);break;case r:break;case y:case'otransitionend':if(e.target==this.slider&&!this.options.hastyPageFlip)this.__flip();break}},initialSizeCheck:function(){if(this._bPerformInitialSizeCheck){this.refreshSize();this._bPerformInitialSizeCheck=false}},__pos:function(x){this.x=x;this.slider.style[b]='translate('+x+'px,0)'+m},__resize:function(){this.refreshSize();this.slider.style[f]='0s';this.__pos(-this.page*this.pageWidth)},__start:function(e){if(!!e.originalEvent&&!!e.originalEvent._sapui_handledByControl){return}if(this.initiated)return;var p=g?e.touches[0]:e;this.initiated=true;this.moved=false;this.thresholdExceeded=false;this.startX=p.pageX;this.startY=p.pageY;this.pointX=p.pageX;this.pointY=p.pageY;this.stepsX=0;this.stepsY=0;this.directionX=0;this.directionLocked=false;this.slider.style[f]='0s';this.__event('touchstart')},__move:function(e){if(!this.initiated)return;var p=g?e.touches[0]:e,i=p.pageX-this.pointX,l=p.pageY-this.pointY,n=this.x+i,t=Math.abs(p.pageX-this.startX);this.moved=true;this.pointX=p.pageX;this.pointY=p.pageY;this.directionX=i>0?1:i<0?-1:0;this.stepsX+=Math.abs(i);this.stepsY+=Math.abs(l);if(this.stepsX<10&&this.stepsY<10){return}if(!this.directionLocked&&this.stepsY>this.stepsX){this.initiated=false;return}e.preventDefault();this.directionLocked=true;if(!this.options.loop&&(n>0||n<this.maxX)){if(!!sap.ui.Device.os.ios){n=this.x+(i/2)}else{if(n>0){n=0}else{n=this.maxX}}}if(!this.thresholdExceeded&&t>=this.snapThreshold){this.thresholdExceeded=true;this.__event('moveout')}else if(this.thresholdExceeded&&t<this.snapThreshold){this.thresholdExceeded=false;this.__event('movein')}this.__pos(n)},__end:function(e){if(!this.initiated)return;var p=g?e.changedTouches[0]:e,i=Math.abs(p.pageX-this.startX);this.initiated=false;if(!this.moved)return;var M=false;if(!this.options.loop&&(this.x>0||this.x<this.maxX)){this.__event('movein');M=true}if(M||i<this.snapThreshold){this.slider.style[f]=Math.floor(100*i/this.snapThreshold)+'ms';this.__pos(-this.page*this.pageWidth);return}this.__checkPosition()},__checkPosition:function(){var p,e,i;if(this.options.loop){if(this.options.numberOfPages===1){this.goToPage(0)}else if(this.options.numberOfPages===2){if(this.directionX<0){if(this.page===1){this.goToPage(0)}}else{if(this.page===0){this.goToPage(1)}}}}this.masterPages[this.currentMasterPage].className=this.masterPages[this.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/,'');if(this.directionX>0){this.page=-Math.ceil(this.x/this.pageWidth);this.currentMasterPage=(this.page+1)-Math.floor((this.page+1)/3)*3;this.pageIndex=this.pageIndex===0?this.options.numberOfPages-1:this.pageIndex-1;p=this.currentMasterPage-1;p=p<0?2:p;this.masterPages[p].style.left=this.page*100-100+'%';e=this.page-1}else{this.page=-Math.floor(this.x/this.pageWidth);this.currentMasterPage=(this.page+1)-Math.floor((this.page+1)/3)*3;this.pageIndex=this.pageIndex==this.options.numberOfPages-1?0:this.pageIndex+1;p=this.currentMasterPage+1;p=p>2?0:p;this.masterPages[p].style.left=this.page*100+100+'%';e=this.page+1}i=this.masterPages[this.currentMasterPage].className;/(^|\s)swipeview-active(\s|$)/.test(i)||(this.masterPages[this.currentMasterPage].className=!i?'swipeview-active':i+' swipeview-active');i=this.masterPages[p].className;/(^|\s)swipeview-loading(\s|$)/.test(i)||(this.masterPages[p].className=!i?'swipeview-loading':i+' swipeview-loading');if(this.fnLoadingCallback){this.fnLoadingCallback.call(undefined,p,true)}e=e-Math.floor(e/this.options.numberOfPages)*this.options.numberOfPages;this.masterPages[p].dataset.upcomingPageIndex=e;newX=-this.page*this.pageWidth;this.slider.style[f]=Math.floor(500*Math.abs(this.x-newX)/this.pageWidth)+'ms';if(!this.options.loop){this.masterPages[p].style.visibility=newX===0||newX==this.maxX?'hidden':''}if(this.x==newX){this.__flip()}else{this.__pos(newX);if(this.options.hastyPageFlip)this.__flip()}},__flip:function(){this.initialSizeCheck();this.__event('flip');for(var i=0;i<3;i++){this.masterPages[i].className=this.masterPages[i].className.replace(/(^|\s)swipeview-loading(\s|$)/,'');this.masterPages[i].dataset.pageIndex=this.masterPages[i].dataset.upcomingPageIndex}},__event:function(t){var e=d.createEvent("Event");e.initEvent('swipeview-'+t,true,true);this.wrapper.dispatchEvent(e)}};function z(e){if(v==='')return e;e=e.charAt(0).toUpperCase()+e.substr(1);return v+e}return S})(window,document);
