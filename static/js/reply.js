
  $(function () {
         $("#article_comment_btn").click(function () {
             var textid = $("#member_standpoint_hidden").val();
             var userid = $(".login_id").text();
             var content = $("#article_comment").val();
             var html = "";
             $.post('/reply/',{"textid":textid,"userid":userid,"content":content},function (data) {
                    html +=' <div class="box-contant" id="box_contant_28777">'+
                '<div class="pic"><a href="http://www.manshijian.com/members/member_detail/71209.html" title="data.name"><img src="'+data.icon+'" width="50px" height="50px"></a></div>'+
                '<div class="text_contant"><dl><dt class="re_author"><span>'+
            '<a target="_blank" href="http://www.manshijian.com/members/member_detail/71209.html">'+data.name+'</a> 发表于'+ data.time +'</span><span class="tanda"></span></dt>'+
            '<dd class="re_detail">'+data.content+'</dd><div class="box-contant_in"><div class="text_contan_in">'+
                    '</dl></div></div><form action="" method="post" accept-charset="utf-8" id="article_comment_reply_add_form"><div class="comment-post" id="reply_comment_28777" style="display:none">'+
                '<div class="txt" id="reply_face_28777">'+
                    '<textarea id="reply_comment_content_28777" name="reply_comment_content_28777" class="reply_comment_content_28777" style="line-height: 20px; padding:5px; outline: medium none; width:610px; float:left; height:50px; overflow:auto; border:1px solid #DDDDDD; margin-top:5px;"></textarea> <div style="float:left;"> <a href="javascript:void(0)"> <img src="http://www.manshijian.com//scripts/emotions/emotions/1.gif" alt="表情" id="re_message_28777"> </a> </div> </div> <div class="w_review_botton"> <a id="article_comment_reply_btn_28777" class="comment-btn" href="javascript:void(0);">提交</a>&nbsp; <a id="article_detail_comment_reply_close_28777" class="comment-btn" href="javascript:void(0);">关闭</a> </div> <div class="clear"></div> <div id="uploadify_hidden_28777"> <input type="hidden" id="hidden_img_28777" iidd_28777="0" name="hidden_img_28777" value=""> <input type="hidden" id="simgname_28777" name="simgname_28777" value=""></div> </div> <input type="hidden" name="comment_id_28777" id="comment_id_28777" value="RDBpOFVIVzhqUGxmYWhpNHZtUXlHWjZZeXhGRVF3UmhsQjZjdXpxeGc3MD0="> </form> <dd class="re_mark"><span class="mark"> <a href="javascript:void(0);" id="article_comment_reply_link_28777">回复</a>&nbsp;&nbsp; <a href="javascript:void(0);" id="article_comment_reply_link_del_28777" onclick="article_comment_delete(28777)">删除</a> </span> </dd></dl> </div> <div class="clear"></div> </div> </div>';
                 $("#n_content").append(html)
             },"json")
         });
     });