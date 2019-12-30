/**
options = {
  url: "",
  method: "",
  headers: {}, 
  data: "",
  success: function(result) {},  // 请求成功后调用此方法
  fail: function(error) {}    // 请求失败或出错后调用此方法
}
**/
  window.ajax = function (options) {
    options = options || {};
    options.method = options.method.toUpperCase() || "GET";
    options.data = options.data || {};
    //1.创建xhr对象
    var xhr = new XMLHttpRequest();
    //2.设置监听函数(如果成功的话，会过来执行)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status <300) {
          console.log(JSON.parse(xhr.responseText));
          options.success(JSON.parse(xhr.responseText));
        }
        else {
          options.error(JSON.parse(xhr.responseText));
        }
      }
    }
    //3.调用open()方法 
    xhr.open(options.method,options.url,true);
    //4.设置请求头部
    //5.调用send()
    if (options.method === 'POST' || options.method === 'PUT') {
      xhr.setRequestHeader("Content-type","application/json");
      xhr.send(JSON.stringify(options.data));     
    }
    xhr.send(options.data);
    // switch (options.method) {
    //   case "GET":
    //     xhr.send(null);
    //     break;
    //   case "POST":
    //     xhr.setRequestHeader("Content-type","application/json");
    //     xhr.send(JSON.stringify(options.data));
    //     break;
    //   case "PUT":
    //     xhr.setRequestHeader("Content-type","application/json");
    //     xhr.send(JSON.stringify(options.data));
    //     break;
    //   case "DELETE":
    //     xhr.send(null);
    //     break;
    //   default:
    //     break;
    // }
  }
