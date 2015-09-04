/* JCE Editor - 2.5.4 | 02 September 2015 | http://www.joomlacontenteditor.net | Copyright (C) 2006 - 2015 Ryan Demmer. All rights reserved | © Copyright, Moxiecode Systems AB | http://www.tinymce.com/license */
(function(){var each=tinymce.each,undef;tinymce.create('tinymce.plugins.AdvListPlugin',{init:function(ed,url){var t=this;t.editor=ed;function buildFormats(str){var formats=[];each(str.split(/,/),function(type){var title=type.replace(/-/g,'_');if(type==='default'){title='def';}
formats.push({title:'advlist.'+title,styles:{listStyleType:type==='default'?'':type}});});return formats;}
var numlist=ed.getParam("advlist_number_styles","default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman");if(numlist){t.numlist=buildFormats(numlist);}
var bullist=ed.getParam("advlist_bullet_styles","default,circle,disc,square");if(bullist){t.bullist=buildFormats(bullist);}
if(tinymce.isIE&&/MSIE [2-7]/.test(navigator.userAgent)){t.isIE7=true;}},createControl:function(name,cm){var t=this,btn,format,editor=t.editor;if(name=='numlist'||name=='bullist'){if(t[name]&&t[name][0].title==='advlist.def'){format=t[name][0];}
function hasFormat(node,format){var state=true;each(format.styles,function(value,name){if(editor.dom.getStyle(node,name)!=value){state=false;return false;}});return state;}
function applyListFormat(){var list,dom=editor.dom,sel=editor.selection;list=dom.getParent(sel.getNode(),'ol,ul');if(!list||list.nodeName==(name=='bullist'?'OL':'UL')||!format||hasFormat(list,format)){editor.execCommand(name=='bullist'?'InsertUnorderedList':'InsertOrderedList');}
if(format){list=dom.getParent(sel.getNode(),'ol,ul');if(list){dom.setStyles(list,format.styles);list.removeAttribute('data-mce-style');}}
editor.focus();}
if(!t[name]){btn=cm.createButton(name,{title:'advanced.'+name+'_desc','class':'mce_'+name,onclick:function(){applyListFormat();}});return btn;}
btn=cm.createSplitButton(name,{title:'advanced.'+name+'_desc','class':'mce_'+name,onclick:function(){applyListFormat();}});btn.onRenderMenu.add(function(btn,menu){menu.onHideMenu.add(function(){if(t.bookmark){editor.selection.moveToBookmark(t.bookmark);t.bookmark=0;}});menu.onShowMenu.add(function(){var dom=editor.dom,list=dom.getParent(editor.selection.getNode(),'ol,ul'),fmtList;if(list||format){fmtList=t[name];each(menu.items,function(item){var state=true;item.setSelected(0);if(list&&!item.isDisabled()){each(fmtList,function(fmt){if(fmt.id==item.id){if(!hasFormat(list,fmt)){state=false;return false;}}});if(state)
item.setSelected(1);}});if(!list)
menu.items[format.id].setSelected(1);}
editor.focus();if(tinymce.isIE){t.bookmark=editor.selection.getBookmark(1);}});menu.add({id:editor.dom.uniqueId(),title:'advlist.types','class':'mceMenuItemTitle',titleItem:true}).setDisabled(1);each(t[name],function(item){if(t.isIE7&&item.styles.listStyleType=='lower-greek')
return;item.id=editor.dom.uniqueId();menu.add({id:item.id,title:item.title,onclick:function(){format=item;applyListFormat();}});});});return btn;}},getInfo:function(){return{longname:'Advanced lists',author:'Moxiecode Systems AB',authorurl:'http://tinymce.moxiecode.com',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/advlist',version:tinymce.majorVersion+"."+tinymce.minorVersion};}});tinymce.PluginManager.add('advlist',tinymce.plugins.AdvListPlugin);})();