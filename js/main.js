var loading='<div class="loading">'+
    '<img src="images/load.gif"/>'+
    '</div>';
var nextIng='<div class="nextIng">'+
    '<img src="images/refresh.gif"/>'+
    '</div>';
function loadHtml(mode) {
    $.ajax({
        url: 'htmls/' + mode + '.html',
        success: function (data) {
            $('.view-cont').html(data);
            loadJS(mode);
        }

    })
}

function loadJS(mode){
    $.ajax({
        url: 'js/'+mode+'.js',
        dataType:'script'
    })
}
(function(){
    loadHtml('home');
    $('body').swipeLeft(function(){
        alert("swipeLeft");//ok
    });
    $('body').swipeRight(function(){
        alert('swipeRight');//ok
    });

})();