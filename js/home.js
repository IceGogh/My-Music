var home = {
   startPage : 0 ,
   loadList : function(startPage, limit, fn){
       $.ajax({
           url: "http://musicapi.duapp.com/api.php?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset="+startPage+"&limit="+limit,
           success:function(data){
               if(data==null){
                   alert('连接超时,请刷新网络');
                   home.homeload();
               }
               $('.loading').css({'display':'none'});
                fn(data.playlists)
           },
           beforeSend:function(){
               $('.view-cont').append(loading);
           },
           error:function(){
               alert('连接数据失败,请确认网络畅通')
           }
       })
   },
   homeload : function(){
       home.loadList(home.startPage, 12 , function(data){
           var homeView='';
           for(var i=0; i<12; i++){
               homeView+='<div class="col-xs-4">'+
                   '<a href="#?id='+data[i].id+'">'+
                   '<div class="pic"><img src="'+data[i].coverImgUrl+'"/></div>'+
                   '<p>'+data[i].name+'</p>'+
                   '</a>'+
                   '</div>';
                $('.main .row').html(homeView);
                home.startPage+=12;
               $('.main .row a').click(function(){
                   loadHtml('musicList');
               })
           }
       })
   }
};

(function(){
   home.homeload();
})();

