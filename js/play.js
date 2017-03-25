var mp3='';
var musicTime='';
var musicCurrent='';
var timer;
var _this;
for(var i=0; i<$('.songs').length; i++){
    $('.songs').eq(i).singleTap(selectMusic);
}

//  选中播放条目
function selectMusic(){
    $('.bottom audio').get(0).pause();
    _this=$(this);
    console.log(_this.attr('data-nub'));
    var songId=_this.attr("id");
    if($('.nextIng').length>0){
        $('.nextIng').css({display:'block'});
    }else{
        $('.view-cont').append(nextIng);
        $('.nextIng').css({display:'block'});
    }
    getMusicList.getMusic(songId,function(data){
        mp3=data.url;
        $('.bottom').css({display:'block'});
        $('.bottom').animate({bottom:'0',opacity:'1'});
        $('.bottom audio').prop('src',mp3);
        $('.bottom audio').on('play',function(){
            $('.nextIng').css({display:'none'});
            $('.bottom .Currentline').css({'width':'0'});
            //  歌名
            $('.name .song').html(_this.find('.music').html());
            $('.name .singer').html(_this.find('.singer').html());
            // 选中播放样式
            _this.siblings().removeClass('playing');
            _this.addClass('playing');
             // 进度条
            console.log('_this'+_this.attr('data-nub'));
            musicing(_this.attr('data-nub'));
        })

    })
}

// 播放下一曲
function nextPlay(index){
    console.log('index:'+index);
    $('.songs').eq(index).trigger('singleTap');
}
// 播放进度条
function musicing(eq){
    console.log('eq'+eq)
    clearInterval(timer);
    musicTime=$('#listen').get(0).duration;
    timer=setInterval(function(){
        musicCurrent=$('#listen').get(0).currentTime;
        $('.bottom .Currentline').css({'width':(musicCurrent/musicTime)*100+'%'});
        console.log('playing'+_this.attr('data-nub'));

        if(musicCurrent===musicTime ){
            nextPlay(parseInt(eq)+1);
            clearInterval(timer);
        }
    },500);
}

// 点击播放下一曲
$('.glyphicon-step-forward').singleTap(function(){
    clearInterval(timer);
    nextPlay(parseInt(_this.attr('data-nub'))+1);
});

//   播放、暂停
$('.bottom .onoff').singleTap(function(){
    if($('.bottom audio').get(0).paused){
        $('.bottom audio').get(0).play();
        musicing();
        $(this).prop('class','glyphicon glyphicon-pause onoff')
    }else{
        $('.bottom audio').get(0).pause();
        clearInterval(timer);
        $(this).prop('class','glyphicon glyphicon-play onoff')
    }
});

// 返回home页面
$('.title>span').on('click',function(){
    loadHtml('home')
});

// 下拉加载更多歌单
document.addEventListener('touchmove',function(event) {
    event.preventDefault();
})
$('body').swipeLeft(function(){
    alert("swipeLeft");//ok
});
$('body').swipeRight(function(){
    alert('swipeRight');//ok
});
