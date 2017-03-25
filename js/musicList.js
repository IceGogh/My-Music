var getMusicList={
    getlist:function(Id,callback){
        $.ajax({
            url:"https://api.imjad.cn/cloudmusic?type=playlist&id="+Id,
            beforeSend:function(){
                $('.view-cont').append(loading);
            },
            success:function(data){
                callback(data.playlist)
            }
        })
    },
    getMusic: function(Id, handler){
        $.ajax({
            url: "http://musicapi.duapp.com/api.php?type=url&id="+Id,
            // 设置同步加载  防止切换歌曲混乱
            async:false,
            success: function(data){
                if(data==null){
                    getMusicList.getMusic(Id, handler);
                    return;
                }
                if(data.code==200){
                    handler(data.data[0])
                }
            }
        })
    },

    listIn:function(Id){
        getMusicList.getlist(Id,function(data){
            var listdata=
            '<div class="list-head">'+
            '<div class="list-headbg"></div>'+
            '<div class="title">'+
            '<span><i class="glyphicon glyphicon-chevron-left"></i>'+
            '<span>歌单</span></span>'+
            '</div>'+
            '<div class="row">'+
            '<div class="col-xs-4 pic">'+
            '<img src="'+data.creator.avatarUrl+'"/>'+
            '</div>'+
            '<div class="col-xs-6 picname">'+
            '<p class="songname">'+data.name+'</p>'+
            '<p>'+
            '<img src="'+data.creator.backgroundUrl+'"/>'+
            '<span>'+data.creator.nickname+'</span>'+
            '</p>'+
            '</div>'+
            '</div>'+
            '</div>';
            var playall='<div class="playall">播放全部</div>';
            var songdata='';
            if(data.tracks.length>20){
                data.tracks.length=20
            }
            for(var i=0; i<data.tracks.length; i++){
                songdata+='<div class="songs" id="'+data.tracks[i].id+'" data-nub='+i+'>'+
                    '<div class="nub">'+(i+1)+'</div>'+
                    '<div class="musicname">'+
                    '<div class="music">'+data.tracks[i].name+'</div>'+
                    '<div class="singer">'+data.tracks[i].ar[0].name+'</div>'+
                    '</div>'+
                '</div>'
            }
            playall+=songdata;
            listdata+=playall;
            $('.view-cont').html(listdata);
            $('.list-headbg').css({'background':'url('+data.creator.backgroundUrl+')'});
            loadJS('play');
        })
    }
};

(function(){
    var detailId=window.location.href;
    var Idindex=detailId.indexOf('?id=')+4;
    var Id=detailId.substr(Idindex);
    getMusicList.listIn(Id)
})();