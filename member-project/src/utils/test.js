function browserVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //Edge浏览器
  var isFirefox = userAgent.indexOf("Firefox") > -1; //Firefox浏览器
  var isOpera = userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1; //Opera浏览器
  var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Edge") == -1 && userAgent.indexOf("OPR") == -1; //Chrome浏览器
  var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1 && userAgent.indexOf("Edge") == -1 && userAgent.indexOf("OPR") == -1; //Safari浏览器
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 'IE:7';
    } else if (fIEVersion == 8) {
      return 'IE:8';
    } else if (fIEVersion == 9) {
      return 'IE:9';
    } else if (fIEVersion == 10) {
      return 'IE:10';
    } else {
      return 'IE:6'; //IE版本<7
    }
  } else if (isIE11) {
    return 'IE:11';
  } else if (isEdge) {
    return 'Edge:' + userAgent.split('Edge/')[1].split('.')[0];
  } else if (isFirefox) {
    return 'Firefox:' + userAgent.split('Firefox/')[1].split('.')[0];
  } else if (isOpera) {
    return 'Opera:' + userAgent.split('OPR/')[1].split('.')[0];
  } else if (isChrome) {
    return 'Chrome:' + userAgent.split('Chrome/')[1].split('.')[0];
  } else if (isSafari) {
    return 'Safari:'; + userAgent.split('Safari/')[1].split('.')[0];
  } else {
    return -1; //不是ie浏览器
  }
}

(function () {
  var limitObj = {
    'IE': 10,
    'Edge': 12,
    'Firefox': 52,
    'Opera': 42,
    'Chrome': 56,
    'Safari': 11
  }
  var browserVersionStr = browserVersion().split(':');
  var name = browserVersionStr[0];
  var version = browserVersionStr[1];
  console.log(66,browserVersionStr, name, version)
  if (!limitObj[name] || limitObj[name] && version < limitObj[name]) {
    var str = "你的浏览器版本太低了,已经和时代脱轨了 :(";
    var str3 = "1、建议您升级浏览器版本";
    var str2 = "2、推荐使用:<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:blue;'>谷歌</a>," +
      "<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E7%81%AB%E7%8B%90%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:blue;'>火狐</a>," +
      "其他双核极速模式";
    document.writeln("<pre style='text-align:center;color:#fff; height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-index:1234'>" +
      "<h2 style='padding-top:200px;margin:0'><strong>" + str + "<br/></strong></h2><h2>" + str3 + "</h2><h2>" +
      str2 + "</h2><h2 style='margin:0'><strong>如果你使用的是双核浏览器,请切换到极速(高速)模式 / 兼容模式访问，如果仍然不能访问，请考虑以上两条建议<br/></strong></h2></pre>");
    document.execCommand("Stop");
  };
}());
