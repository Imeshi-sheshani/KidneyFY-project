function toggle_value(input){
		var curr_val, tog_val1 , tog_val2 , span;
		curr_val = input.getAttribute('value');
		tog_val1 = input.getAttribute('data-tog-val-1');
		tog_val2 = input.getAttribute('data-tog-val-2');
		if (curr_val != tog_val1){
			input.value = tog_val1;
		}		
		else{
			input.value = tog_val2;
		}
		
		span = input.parentElement.children;
		span[1].classList.toggle('input_toggle_val_span2');	
	try{
		check_nxtbtn(input.getAttribute("data-sbid"));
	}catch(err){}
}
//Control Element Select Option==========================================================================================
document.getElementsByTagName('body')[0].addEventListener("click", function(e){
if (!(e.target.className == "sf_select_opener sf_select_opener_hide" || e.target.className == "sf_select_opt")){close_all_sf_selections();}
else if (!(e.target.className != "account_setting_cont_trigger")){header_close(1);}
});

var li_delay = .03;
var li_hie = 40;

function open_sf_select(opener){
	close_all_sf_selections();
	opener.classList.add('sf_select_opener_hide');	
	var ul, li,len, i;	
	ul = opener.parentElement;
	ul.classList.add('sf_select_visible');
	li  =ul.children;
	len =li.length - 2;
	ul.style.height = li_hie*len+'px';
	for ( i = 0; i<len; i++){
		li[i].style.transform ='translateY('+li_hie*i+'px)' ;
		li[i].style.opacity = 1;					
		li[i].style.transitionDelay= li_delay*i+'s';									
	}
	li[li.length - 1].classList.add('sf_select_glow_visible');
	li[li.length - 1].style.top = li_hie*len +'px';
	li[li.length - 1].style.transitionDelay = (li_delay*len + .5)+'s';
}

function close_sf_select(opt){
	var ul, li,len, i;	
	ul = opt.parentElement;
	ul.classList.remove('sf_select_visible');
	li=ul.children;
	len=li.length - 2;
	
	ul.style.height = li_hie+'px';

	for (i = 0; i<len; i++){
		li[i].style.transform ='translateY(0px)' ;
		li[i].style.opacity = 0;			
	}
	li[li.length - 2].classList.remove('sf_select_opener_hide');
	li[li.length - 1].classList.remove('sf_select_glow_visible');
	li[li.length - 1].style.top ='0px';
	li[li.length - 1].style.transitionDelay='0s';
}

function close_all_sf_selections(){
	var i , list;
	list = document.getElementsByClassName('sf_select_opener');
	for (i = 0; i<list.length ; i++){
		close_sf_select(list[i]);
	}
}

function ul_select_opt(opt){
	close_sf_select(opt);
	var val,o_input,ih, att;
	val =  opt.getAttribute("data-value");
	ih = opt.innerHTML;
	opt.parentElement.children[opt.parentElement.children.length -2].innerHTML =ih; 
	o_input = opt.parentElement.parentElement.children[0];
	o_input.value = val;
	if(opt.getAttribute('data-ev-1')){
		att= document.createAttribute('data-ev-1');
		att.value = (opt.getAttribute('data-ev-1'));
		o_input.setAttributeNode(att);
	}	
	if(opt.getAttribute('data-ev-2')){
		att= document.createAttribute('data-ev-2');
		att.value = (opt.getAttribute('data-ev-2'));
		o_input.setAttributeNode(att);
	}	
	if(opt.getAttribute('data-ev-3')){
		att= document.createAttribute('data-ev-3');
		att.value = (opt.getAttribute('data-ev-3'));
		o_input.setAttributeNode(att);
	}	
	try{
		o_input.setAttribute("data-tval",1);
		o_input.setAttribute("data-valid-input",1);		
		check_nxtbtn(o_input.getAttribute("data-sbid"));
		chsubtn_trval(o_input.getAttribute("data-svcb"));		
	}catch(err){return false}
	
}
var list, i;
	list = document.getElementsByTagName('select');
	for (i = 0; i < list.length ; i++){
		create_sf_select(list[i]);
	}	
function create_sf_select(select){
	select.style.display = 'none';
	var opt,select_id, select_showing_name, cont, ul, i, val, label, li, span1, span2 ;
	select_id = select.getAttribute('id');
	cont = select.parentElement;
	ul = document.createElement('ul');
	ul.setAttribute('class', 'sf_select');
	ul.setAttribute('data-select-id', select_id);
		ul.setAttribute('onmouseOver', 'close_sf_select(opt)');	
	cont.appendChild(ul);
	opt = select.children;
	for (i = 1 ; i<opt.length; i++){
		val = opt[i].getAttribute('value');
		label = opt[i].innerHTML;
		li = document.createElement('li');
		li.setAttribute('class' , 'sf_select_opt');
		li.setAttribute('onclick' , 'select_opt(this)');
		li.setAttribute('data-value' , val);
		li.innerHTML = label;
		ul.appendChild(li);
	}
	select_showing_name = opt[0].getAttribute('data-select_showing_name')
	span1 = document.createElement('span');
	span1.setAttribute('class', 'sf_select_opener');
	span1.setAttribute('onClick', 'open_sf_select(this)');
	span1.innerHTML = 'SELECT ' + select_showing_name;
	ul.appendChild(span1);
	span2 = document.createElement('span');
	span2.setAttribute('class', 'sf_select_glow');
	ul.appendChild(span2);
}

function select_opt(opt){
	close_sf_select(opt);
	var val , ul, span, ori_select, li;
	val =  opt.innerHTML;
	ul = opt.parentElement; 
	li = ul.children;
	span = li[li.length -2 ] ;
	span.innerHTML = val;
	ori_select = ul.getAttribute('data-select-id');
	document.getElementById(ori_select).value = val;	
	document.getElementById(ori_select).setAttribute("data-tval",1);	
	chsubtn_trval(document.getElementById(ori_select).getAttribute("data-svcb"));	
}	

function checkbox(ele){
	var v, sb;
	v = ele.getAttribute("data-tval");	
	if(v==1){ele.setAttribute("data-tval",0)}
	else{ele.setAttribute("data-tval",1)}
	sb = ele.getAttribute("data-svcb");
	chsubtn_trval(sb)
	
}

function get_sf_select(eid){
	var ele,v,i;
	ele = document.getElementById(eid);
	v=ele.value;
	i=ele.parentElement.children[1].children[ele.parentElement.children[1].children.length - 2].innerHTML;
	return v+","+i;
}
function set_sf_select(eid,v,i,vi=2){
	var ele;
	ele = document.getElementById(eid);
	ele.value=v;
	ele.parentElement.children[1].children[ele.parentElement.children[1].children.length - 2].innerHTML=i;
	if(vi!=2){ele.setAttribute("data-valid-input",vi)}
}