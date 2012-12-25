/*
	The following is related with facebook Request 
	Made by Blue chen 
*/

function fn_focus_comment(count) {
	count = count.toString();
	document.getElementById('txtfb_description' + count).value = '';
	document.getElementById('txtfb_description' + count).focus();
}
function fbcomment_change_value(count) {
	if(document.getElementById('txtfb_description' + count).value == document.getElementById('hncomment_text').value) document.getElementById('txtfb_description' + count).value = '';
}
function fbcommen_reset_value(count) {
	if(document.getElementById('txtfb_description' + count).value == '') document.getElementById('txtfb_description' + count).value = document.getElementById('hncomment_text').value;
}
function fbcomment_change_pub(wish_id) {
	if(document.getElementById('txtfb_description' + wish_id).value == document.getElementById('hncomment_pub_text').value) document.getElementById('txtfb_description' + wish_id).value = '';
}
function fbcommen_reset_pub(wish_id) {
	if(document.getElementById('txtfb_description' + wish_id).value == '') document.getElementById('txtfb_description' + wish_id).value = document.getElementById('hncomment_pub_text').value;
}
function submitenter(access_token,post_id,e, count) {
	count = count.toString();
	var keycode;
	if(window.event) keycode = window.event.keyCode;
	else if(e) keycode = e.which;
	else return true;
	//alert(keycode);
	if(keycode == 13) {
		if(document.getElementById('txtfb_description' + count).value == '' || document.getElementById('txtfb_description' + count).value == document.getElementById('hncomment_text').value) {
			return false;
		}
		var fbcomment = document.getElementById('txtfb_description' + count).value;
		access_token = access_token.toString();
		post_id = post_id.toString();
		$.ajax({
			type: 'POST',
			url: 'https://graph.facebook.com/' + post_id + '/comments?message='+fbcomment,
			data: "access_token=" + access_token
		});
		return getFbComments();
		return false;
	} 
	else return true;
}

function subenter_msg(e, wish_id) {
	var keycode;
	if(window.event) keycode = window.event.keyCode;
	else if(e) keycode = e.which;
	else return true;
	if(keycode == 13) {
		if(document.getElementById('txtfb_description' + wish_id).value == '' || document.getElementById('txtfb_description' + wish_id).value == document.getElementById('hncomment_pub_text').value) {
			return false;
		}
		document.forms["FacebookPostMessageForm" + wish_id].submit();
		document.getElementById('txtfb_description' + wish_id).value = document.getElementById('hncomment_pub_text').value;
		return false;
	} else return true;

}
function toggleCommentscontent(comments_count,userpost_id){
	html += '<div class="all_comms"><a id="toggleCommentscheckpoint" href="javascript:void(0);" onclick="toggleComments('+comments_count+',\''+userpost_id+'\');" class="fb_comment_open_btn">View all '+comments_count+' comments</a></div>';
}
function toggleComments(comments_count,userpost_id){
	if (toggleCommentsVisability == 0){
		toggleCommentsVisability = 1
		console.log('1'+comments_count);
		return fn_show_commentdiv(comments_count,userpost_id,1)
	}else{
		toggleCommentsVisability = 0;
		console.log('2'+comments_count);
		return fn_show_commentdiv(comments_count,userpost_id,0)
	}
}

function fn_show_commentdiv(count, userpost_id,check) {
	if(check == 1){
		for(var i = 1; i <= count; i++) {
			var divid = userpost_id + '_' + i;
			document.getElementById(divid).style.display = 'block';
		}
		return toggleCommentscontent(count,userpost_id);
	}else{
		for(var i = 1; i <= count; i++) {
			var divid = userpost_id + '_' + i;
			document.getElementById(divid).style.display = 'none';
		}
		return toggleCommentscontent(count,userpost_id);
	}
}
function fn_show_commentdiv_close(count, user_post_id) {
	for(var i = 1; i <= count - 2; i++) {
		var divid = user_post_id + '_' + i;
		document.getElementById(divid).style.display = 'none';
	}
}

function fn_focus_comment(count) {
	count = count.toString();
	document.getElementById('txtfb_description' + count).value = '';
	document.getElementById('txtfb_description' + count).focus();
}

function fbUnlikeAjax(access_token, post_id) {
	post_id = post_id.toString();
	access_token = access_token.toString();
	$.ajax({
		type: 'POST',
		url: 'https://graph.facebook.com/' + post_id + '/likes?method=delete',
		data: {
			"access_token": access_token,
			"_method": "delete"
		}
	});
	return getFbComments();
}

function fblikeAjax(access_token, post_id) {
	access_token = access_token.toString();
	post_id = post_id.toString();
	$.ajax({
		type: 'POST',
		url: 'https://graph.facebook.com/' + post_id + '/likes',
		data: "access_token=" + access_token
	});
	return getFbComments();
}
function fbpostcommentAjax(access_token, post_id,fbcomment) {
	access_token = access_token.toString();
	post_id = post_id.toString();
	$.ajax({
		type: 'POST',
		url: 'https://graph.facebook.com/' + post_id + '/comments',
		data: {"access_token=":access_token,"message=":fbcomment}
	});
	return getFbComments();
}

function fbpostlikeornot(message_like, access_token, userpost_id) {
	if(message_like != '') {
		html += '<a href="javascript:void(0);" onclick="fbUnlikeAjax(\'' + access_token + '\',\'' + userpost_id + '\');">Unlike</a>';
	} else {
		html += '<a href="javascript:void(0);" onclick="fblikeAjax(\'' + access_token + '\',\'' + userpost_id + '\');">Like</a>';
	}
}

function fbcommentlikeornot(comment_likes, access_token, comment_object_id) {
	if (comment_likes == 1){
		html += '<a href="javascript:void(0);" onclick="fbUnlikeAjax(\'' + access_token + '\',\'' + comment_object_id + '\');">Unlike</a>';
		html +='&nbsp;&nbsp;';
		html += '<img src="/theme/2/img/thumb_up.gif"/>';
		html += '&nbsp; 1 person';
	}else{
		html += '<a href="javascript:void(0);" onclick="fblikeAjax(\'' + access_token + '\',\'' + comment_object_id + '\');">like</a>';
	}
}
function fbloadingview(toggle){
	if (toggle==1){
		document.getElementById('canvasloader-container').display='block';
	}
	else{
		document.getElementById('canvasloader-container').display='none';
	}
}
/*
	The following is show fb's post and comment datetime.
	Made by Blue chen 
*/
function fb_date_time(comment_created_time){
	var created_time = fnstrtotime(comment_created_time),
		diff_time,
		hours_ago,
		elapsed_time;
	diff_time = fntime() - created_time;
	hours_ago = Math.floor(diff_time/3600);
	if (hours_ago<=1 ) elapsed_time = Math.round(diff_time/60)+' minutes ago';
	else if (hours_ago < 36) elapsed_time = '1 day ago';
	else if(hours_ago < 168) elapsed_time = Math.round(hours_ago/24)+ ' days ago';
	else elapsed_time = fngmdate('F j, Y', created_time);
	return elapsed_time;
}

/*
	The following is simulated with php strtotime,date,time function.
	Made by Blue chen 
*/
function fnstrtotime(text){
	var now = new Date();
  	now = now.getTime() ;
	if (!text)
	  return null;
	// Unecessary spaces
	text = text.trim()
	  .replace(/\s{2,}/g, ' ')
	  .replace(/[\t\r\n]/g, '')
	  .toLowerCase();

	var parsed;

	if (text === 'now')
	  return now === null || isNaN(now) ? new Date().getTime() / 1000 | 0 : now | 0;
	else if (!isNaN(parse = Date.parse(text)))
	  return parse / 1000 | 0;
	if (text == 'now')
	  return new Date().getTime() / 1000; // Return seconds, not milli-seconds
	else if (!isNaN(parsed = Date.parse(text)))
	  return parsed / 1000;

	var match = text.match(/^(\d{2,4})-(\d{2})-(\d{2})(?:\s(\d{1,2}):(\d{2})(?::\d{2})?)?(?:\.(\d+)?)?$/);
	if (match) {
	  var year = match[1] >= 0 && match[1] <= 69 ? +match[1] + 2000 : match[1];
	  return new Date(year, parseInt(match[2], 10) - 1, match[3],
	      match[4] || 0, match[5] || 0, match[6] || 0, match[7] || 0) / 1000;
	}

	var date = now ? new Date(now * 1000) : new Date();
	var days = {
	  'sun': 0,
	  'mon': 1,
	  'tue': 2,
	  'wed': 3,
	  'thu': 4,
	  'fri': 5,
	  'sat': 6
	};
	var ranges = {
	  'yea': 'FullYear',
	  'mon': 'Month',
	  'day': 'Date',
	  'hou': 'Hours',
	  'min': 'Minutes',
	  'sec': 'Seconds'
	};

	function lastNext(type, range, modifier) {
	  var day = days[range];

	  if (typeof(day) !== 'undefined') {
	      var diff = day - date.getDay();

	      if (diff === 0)
	          diff = 7 * modifier;
	      else if (diff > 0 && type === 'last')
	          diff -= 7;
	      else if (diff < 0 && type === 'next')
	          diff += 7;

	      date.setDate(date.getDate() + diff);
	  }
	}
	function process(val) {
	  var split = val.split(' ');
	  var type = split[0];
	  var range = split[1].substring(0, 3);
	  var typeIsNumber = /\d+/.test(type);

	  var ago = split[2] === 'ago';
	  var num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

	  if (typeIsNumber)
	      num *= parseInt(type, 10);

	  if (ranges.hasOwnProperty(range))
	      return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
	  else if (range === 'wee')
	      return date.setDate(date.getDate() + (num * 7));

	  if (type === 'next' || type === 'last')
	      lastNext(type, range, num);
	  else if (!typeIsNumber)
	      return false;

	  return true;
	}

	var regex = '([+-]?\\d+\\s' +
	  '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' +
	  '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' +
	  '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)|(last|next)\\s' +
	  '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' +
	  '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' +
	  '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))(\\sago)?';

	match = text.match(new RegExp(regex, 'gi'));
	if (!match)
	  return false;

	for (var i = 0, len = match.length; i < len; i++)
	  if (!process(match[i]))
	      return false;
	// ECMAScript 5 only
	//if (!match.every(process))
	// return false;
	return (date.getTime() / 1000);
}
function fntime(){
    return (new Date()).getTime() / 1000;
}
function fndate(format,time){
    var _temp = (time != null) ? new Date(time*1000) : new Date();
    var _return = '';
    if(/Y-m-d/.test(format)){
        var _day = [_temp.getFullYear(),addzero(1 + _temp.getMonth()),addzero(_temp.getDate())];
        _return = _day.join('-');
    }
    if(/H:i:s/.test(format)){
        var _time = [addzero(_temp.getHours()),addzero(_temp.getMinutes()),addzero(_temp.getSeconds())];
        _return += ' ' +_time.join(':');
    }
    return _return;
    function addzero(i){
        if(i<=9){
            return '0' + i;
        }else{
            return i;
        }
    }
}
function fngmdate (format, timestamp) {
  var dt = typeof timestamp === 'undefined' ? new Date() : // Not provided
      typeof timestamp === 'object' ? new Date(timestamp) : // Javascript Date()
      new Date(timestamp * 1000); // UNIX timestamp (auto-convert to int)
  timestamp = Date.parse(dt.toUTCString().slice(0, -4)) / 1000;
  return this.date(format, timestamp);
}

