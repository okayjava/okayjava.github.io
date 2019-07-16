$body = $("body");
var boUseAjaxLoadBar = true;


// sleep 사용법
//sleep(500).then(() => {
//    // 실행 할 명령어
//});
function sleep(ms) {
//    return new Promise(resolve => setTimeout(resolve, ms));
}


// url : 실행할 URL , method : GET/POST, rtype : 전문형식 , turl : 처리 후 이동할 페이지
function CallProc(url,formName, method,rtype, turl){ 
    
        $.ajax({
            type : method //"POST", "GET"
            , async : false //true, false
            , url : url //Request URL
            , dataType :  rtype //전송받을 데이터의 타입
            , timeout : 50000 //제한시간 지정
            , cache : false  //true, false
            , data : $("#" + formName).serialize() //서버에 보낼 파라메터
            , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            , error : function(request, status, error) {
             //통신 에러 발생시 처리
                alert("통신 오류가 발생 하였습니다. 잠시 후 다시 시도해 주세요"   + status  + " request [" + request  + "] error[" + error +"]");
            }
            , success : function(response, status, request) {
                 //통신 성공시 처리
                 __aSyncResult = response;
                 //$('#resultDIV').val(response); 
//                   history.back();
//                   goPage(turl , bul_c,dc);
                return response;
                 
             
            }
            , beforeSend: function() {
             //통신을 시작할때 처리
             $('#fountainG').show().fadeIn('fast'); 
            }
            , complete: function() {
             //통신이 완료된 후 처리
             $('#fountainG').fadeOut();
            }
        });
        
}

function CallProcForm(url,formData , _async, _callback , _callback_fail){
    var async = true;
    if ( _async ) async = _async; 
    
    $.ajax({
        type : "POST" //"POST", "GET"
        , async : async //true, false
        , url : url //Request URL
        , dataType :  'json' //전송받을 데이터의 타입
        , timeout : 50000 //제한시간 지정
        , cache : false  //true, false
        , data : formData //서버에 보낼 파라메터
        , contentType: false // "application/x-www-form-urlencoded; charset=UTF-8"
        , processData : false
        //, contentType: "application/json; charset=UTF-8"
        , error : function(request, status, error) {
         //통신 에러 발생시 처리
            if (typeof _callback_fail === 'function' ) {
//              progress_stop( _NoClose );
                _callback_fail(request, status, error);
           } else {
               alert("통신 오류가 발생 하였습니다. 잠시 후 다시 시도해 주세요");
           }
        }
        , success : function(response, status, request) {
             //통신 성공시 처리
            //alert(">> statut : " + response);
            __aSyncResult = response;
            //alert(">> statut : " + response);
            if (typeof _callback === 'function' ) {
//               progress_stop( _NoClose );
                _callback(response, status, request);
            }
            return true;
        }
        , beforeSend: function() {
            //통신을 시작할때 처리
            $('#fountainG').show();
       }
       , complete: function() {
           //통신이 완료된 후 처리
           $('#fountainG').fadeOut();
       }
    });        
}
function CallProcJson(url,jsonstring, _sync, _callback, _callback_fail){ 
    var async = true;
    if ( _sync == null || _sync == true ) {
        async = false; 
    } else {
        async = true;  
        
    }

    $.ajax({
        type : "POST" //"POST", "GET"
        , async : async //true, false
        , url : url //Request URL
        , dataType :  'json' //전송받을 데이터의 타입
        , timeout : 50000 //제한시간 지정
        , cache : false  //true, false
        , data : jsonstring //서버에 보낼 파라메터
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        //, contentType: "application/json; charset=UTF-8"
        , error : function(request, status, error) {
         //통신 에러 발생시 처리
            if (typeof _callback_fail === 'function' ) {
                //progress_stop();
                _callback_fail(request, status, error);
             } else {
                 alert("통신 오류가 발생 하였습니다. 잠시 후 다시 시도해 주세요"   + request  + " responseText [" + request.responseText  + "] error[" + error +"]");
             }

        }
        , success : function(response, status, request) {
             //통신 성공시 처리
            __aSyncResult = response;
//            if ( typeof response.header.result  != 'undefined' && typeof response.body.rep.need_login != 'undefined'  )
//            {
//                if ( response.header.result == false && response.body.rep.need_login == true)
//                {
//                   alert(response.body.rep.msg);
//                   location.href = response.body.rep.url;
//                   return;
//                }
//            }
            if (typeof _callback === 'function' ) {
                //progress_stop();
                _callback(response, status, request);
             }
            return true;
        }
        , beforeSend: function() {
             //통신을 시작할때 처리
            $('#fountainG').show();
        }
        , complete: function() {
            //통신이 완료된 후 처리

        }
    });
    
}
function CallGetUrlJson(url, async, _callback, _callback_fail){ 
    $.ajax({
        type : "GET" //"POST", "GET"
        , async : async //true, false
        , url : url //Request URL
        , dataType :  'json' //전송받을 데이터의 타입
        , timeout : 50000 //제한시간 지정
        , cache : false  //true, false
        , data : '' //서버에 보낼 파라메터
        , contentType: "application/json; charset=UTF-8"
        , error : function(request, status, error) {
            if (typeof _callback_fail === 'function' ) {
                _callback_fail(request, status, error);
            } else  if (typeof _callback === 'function' ) {
                _callback(request, status, error);
           } else {
               alert("통신 오류가 발생 하였습니다. 잠시 후 다시 시도해 주세요");
           }
        }
        , success : function(response, status, request) {
             //통신 성공시 처리
            __aSyncResult = response;
            if (typeof _callback === 'function' ) {
            	_callback(response, status, request);
           } else {
               alert("통신 오류가 발생 하였습니다. 잠시 후 다시 시도해 주세요");
           }
			return __aSyncResult;
        }
        , beforeSend: function() {
             //통신을 시작할때 처리
        	if ( boUseAjaxLoadBar )
        	{
        		$('.loding').show();
        	}
        }
        , complete: function() {
            //통신이 완료된 후 처리
        	if ( boUseAjaxLoadBar )
        	{
        		$('.loding').hide();
        	}

        }
    });
    
}


function CallGetUrlHtml(url, async, _callback, _callback_fail){ 
    $.ajax({
        type : "GET" //"POST", "GET"
        , async : async //true, false
        , url : url //Request URL
        , dataType :  'html' //전송받을 데이터의 타입
        , timeout : 50000 //제한시간 지정
        , cache : false  //true, false
        , data : '' //서버에 보낼 파라메터
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , error : function(request, status, error) {
            if (typeof _callback_fail === 'function' ) {
                _callback_fail(request, status, error);
            } else  if (typeof _callback === 'function' ) {
                _callback(request, status, error);
           } else {
               alert("통신 오류가 발생 하였습니다. 잠시 후 다시 시도해 주세요");
           }
        }
        , success : function(response, status, request) {
             //통신 성공시 처리
            __aSyncResult = response;
            if (typeof _callback === 'function' ) {
            	_callback(response, status, request);
           } else {
               alert("통신 오류가 발생 하였습니다. 잠시 후 다시 시도해 주세요");
           }
			return __aSyncResult;
        }
        , beforeSend: function() {
            //통신을 시작할때 처리
	       	if ( boUseAjaxLoadBar )
	       	{
	       		//$('.loding').show();
	       		$('.custom_contents_loading').show();
	       	}
       }
       , complete: function() {
           //통신이 완료된 후 처리
	       	if ( boUseAjaxLoadBar )
	       	{
	       		//$('.loding').hide();
	       		$('.custom_contents_loading').hide();
	       	}

       }
    });
    
}   


function CallProcUrl(url){ 
    $.ajax({
        type : "POST" //"POST", "GET"
        , async : false //true, false
        , url : url //Request URL
        , dataType :  'text' //전송받을 데이터의 타입
        , timeout : 50000 //제한시간 지정
        , cache : false  //true, false
        , data : '' //서버에 보낼 파라메터
        //, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , contentType: "application/json; charset=UTF-8"
        , error : function(request, status, error) {
         //통신 에러 발생시 처리
            alert("통신 오류가 발생 하였습니다. 잠시 후 다시 시도해 주세요"   + status  + " request [" + request  + "] error[" + error +"]");
        }
        , success : function(response, status, request) {
             //통신 성공시 처리
            __aSyncResult = response;
            return __aSyncResult;
        }
        , beforeSend: function() {
             //통신을 시작할때 처리
            $('#fountainG').show();
        }
        , complete: function() {
            //통신이 완료된 후 처리
            $('#fountainG').fadeOut();
        }
    });
    
}   

// second to hour to second
function formatSeconds(seconds)
{
    var date = new Date(1970,0,1);
    date.setSeconds(seconds);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}

function numberFormat(_number, _sep) {
    return _number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, _sep);
}


function formatBytes( _bytes , _precision) {
    precision = _precision ? _precision : 2;
    unit = ["B", "KB", "MB", "GB"];
    exp = parseInt(Math.floor(Math.log(_bytes) / Math.log(1024))) | 0;
    return Math.round(_bytes / (Math.pow(1024, exp) / Math.pow(10,precision))) / Math.pow(10,precision) + unit[exp];
}

//메시지 
function Msg (msg){
        alert(msg);
}


function img_resize(obj_image,max_width) {
    
    obj_image.parentNode.style.display='none';
    
//    var obj_image = document.getElementById(obj_id);

    if(obj_image.width>max_width) {
        obj_image.style.width = max_width+'px';
        obj_image.style.height = 'auto';
    } 
    
    obj_image.parentNode.style.display='inline';
//    document.getElementById('main_file_preview').parentNode.style.display='inline';
    
//    console.log(obj_image);
}

//  <input type="text" onkeydown="showKeyCode(event)">
function showKeyCode(event) {
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    if( ( keyID >=48 && keyID <= 57 ) || ( keyID >=96 && keyID <= 105 ) || keyID == 8 )
    {
        // NUMBER
    }
    else
    {

        alert("숫자만 입력 가능 합니다.");
        event.returnValue = false;
    }
    /* 48~57:일반 숫자키 코드, 96~105:숫자키패드 숫자키 코드 */
}

/* 
 * A-Z 65-90 
 * 0-9 48~57:일반 숫자키 코드, 96~105:숫자키패드 숫자키 코드
 * CapsLock : 20
 * Shift : 16
 */
function showAlphaNumKeyCode(event) {
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    if( ( keyID >=48 && keyID <= 57 ) || ( keyID >=96 && keyID <= 105 ) || ( keyID >=65 && keyID <= 90 ) || keyID == 8 || keyID == 20 || keyID == 189  || keyID == 16 )
    {
        // AlphaNumeric
    }
    else
    {

        alert("영숫자와 - 만  입력 가능 합니다.");
        event.returnValue = false;
    }
    /* 48~57:일반 숫자키 코드, 96~105:숫자키패드 숫자키 코드 */
}

function setCookie(cookieName, value, exdays){
	   var exdate = new Date();
	   exdate.setDate(exdate.getDate() + exdays);
	   var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
	   cookieValue += ";path=/"; 
	   document.cookie = cookieName + "=" + cookieValue;
	}

function deleteCookie(cookieName){
   var expireDate = new Date();
   expireDate.setDate(expireDate.getDate() - 1);
   document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

function getCookie(cookieName) {
   cookieName = cookieName + '=';
   var cookieData = document.cookie;
   var start = cookieData.indexOf(cookieName);
   var cookieValue = '';
   if(start != -1){
      start += cookieName.length;
      var end = cookieData.indexOf(';', start);
      if(end == -1)end = cookieData.length;
      cookieValue = cookieData.substring(start, end);
   }
   return unescape(cookieValue);
}

function byteCheck(txt){
    var codeByte = 0;
    for (var idx = 0; idx < txt.length; idx++) {
        var oneChar = escape(txt.charAt(idx));
        if ( oneChar.length == 1 ) {
            codeByte ++;
        } else if (oneChar.indexOf("%u") != -1) {
            codeByte += 2;
        } else if (oneChar.indexOf("%") != -1) {
            codeByte ++;
        }
    }
    return codeByte;
}
/** 
 * 숫자 콤마 추가
 * @param num
 * @returns
 */
function addComma(num) {
	  var regexp = /\B(?=(\d{3})+(?!\d))/g;
	   return num.toString().replace(regexp, ',');
	}
