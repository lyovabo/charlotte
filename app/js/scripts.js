
function loadScript(scriptName,href){
  if($('#'+scriptName).length == 0){
    console.log('load ',scriptName);
    var s = document.createElement('script');
    s.id = scriptName;
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'assets/js/'+href+'/'+scriptName+'.js';
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
  }
}
 

var module = angular.module('charlotte', ['ngRoute']);


