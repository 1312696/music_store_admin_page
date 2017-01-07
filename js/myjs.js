function logout(){
  localStorage.clear();
  window.location = 'login.html';
 }
 function refreshToken(){
 	if(localStorage.getItem("refreshToken") == ""){
    window.location = 'login.html';
  }
  if(localStorage.getItem("expiredAt") <= Date.parse(new Date())){
    if (window.XMLHttpRequest)
                  {
                      // code for IE7+, Firefox, Chrome, Opera, Safari
                      xmlhttp=new XMLHttpRequest();
                  } else {
                      // code for IE6, IE5
                      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                  }

          xmlhttp.onreadystatechange=function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              getRefresh(xmlhttp.responseText);
          }
      }
      xmlhttp.open("Get", 'https://musicstore-app.herokuapp.com/api/v1/getAccessTokenFromRefreshToken?refreshToken=' + localStorage.getItem("refreshToken"), true);
      xmlhttp.send();
  }  
 }

 function getRefresh(arr){
 	var arr = JSON.parse(response);
 	console.log(arr)
    var isoDate = new Date(arr.accessToken.expiredAt).toISOString();
    localStorage.setItem("token", arr.accessToken.accessToken);
    localStorage.setItem("expiredAt", Date.parse(isoDate));
    localStorage.setItem("use", arr.email);
    localStorage.setItem("refreshToken", "");
 }