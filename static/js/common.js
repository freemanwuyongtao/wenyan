/**
 * 防止搜素引擎抓去
 */
function click_href(url){
    window.open(url);
}

$(document).ready(function(){
    
    $("select#article_category_search").live("change", function(){
        var  cid = $(this).val();
        if(cid>0){
            $('form#article_search_category_rank').submit();
        }
    });
    
    $("select#article_rank_search").live("change", function(){
        var  rid = $(this).val();
        if(rid>-1){
            $('form#article_search_category_rank').submit();
        }
    });

    //资讯收藏（详细页）
    $("a[id^='favourite_detail_']").click(function(){
        var article_id = $(this).attr('id');
        $.post('',{'article_id':article_id,'type':'detail'},function(msg){
            if(msg.flag == 'guest'){
                alert(msg.info);
                window.location.href='/members/login/article_' + msg.url;
            } else {
                $("#" + article_id).html(msg.info);
            }
        },"json");
    });
    
    //资讯收藏（周边生活页）
    $("a[id^='neighorhood_favourite_']").click(function(){
        var article_id = $(this).attr('id');
        $.post('/members/member_favorite_add',{'article_id':article_id,'type':'neighorhood'},function(msg){
            if(msg.flag == 'guest'){
                alert(msg.info);
                window.location.href='/members/login/n_article_' + msg.url;
            } else {
                $("#" + article_id).html(msg.info);
            }
        },"json");
    });
    
    //资讯收藏（周边生活资讯列表页）
    $("a[id^='neighorhood_list_favourite_']").click(function(){
        var article_id = $(this).attr('id');
        $.post('/members/member_favorite_add',{'article_id':article_id,'type':'neighorhood_list'},function(msg){
            if(msg.flag == 'guest'){
                alert(msg.info);
                window.location.href='/members/login/l_article_' + msg.url;
            } else {
                $("#" + article_id).html(msg.info);
            }
        },"json");
    });
    
    //喜欢此资讯（列表页）
    $('.love_2').click(function(){
        var article_id = $(this).attr('id');
        $.post('/articles/article_like',{'article_id':article_id,'type':'list'},function(msg){
            $("#" + article_id).html('赞(' + msg.info + ')');
        },"json");
    });
    
    //喜欢此资讯（详细页）
    $("a[id^='article_detail_like_']").click(function(){
        var article_id = $(this).attr('id');
        $.post('/articles/article_like',{'article_id':article_id,'type':'detail'},function(msg){
            $("#" + article_id).html(msg.info);
        },"json");
    });
    
    //资讯回复（详细页）
    $('#article_comment_btn').live('click',function(){
        var article_id = $('#article_id').val();
        var article_comment = $('#article_comment').val();
        var article_simgname = $('#simgname_').val();
		var code_count = $("#hidden_code").val();
		var captch = $("#one_captch").val();
        $('#article_comment').val('');
		$("#one_captch").val('');
		$("#change").html('点击获取验证码');
        if(article_comment != ''){
			if(code_count < 3){
				$.post('/articles/article_comment_add',{'article_id':article_id,'article_comment':article_comment,'article_simgname':article_simgname},function(msg){
					
					if(msg.flag == 'guest'){
						alert(msg.info);
						window.location.href='/members/login/article_' + article_id;
					} else if(msg.flag == 'verify'){
						alert(msg.info);
					} else {
						if(msg.number == 'yes'){
							point_message();
							//setTimeout( function () {
							$('#simgname_').val('');
							$('div#normal').load('/articles/article_reply/' + article_id + '.html');
							$.ajaxSetup({cache: false /*关闭AJAX相应的缓存*/});
							//window.location.href='/articles/article_detail/' + article_id + '.html#comment_container';
							//}, 2000)
						}else if(msg.str == 'no'){
							alert('您的评论存在非法关键字，请重新编辑！');
							$.ajaxSetup({cache: false /*关闭AJAX相应的缓存*/});
						}else{
							$('#simgname_').val('');
							$('div#normal').load('/articles/article_reply/' + article_id + '.html');
							$.ajaxSetup({cache: false /*关闭AJAX相应的缓存*/});
							//window.location.href='/articles/article_detail/' + article_id + '.html#comment_container';
							
						}
					}
				},"json");
			}else{
				if(captch == ''){
					alert("请输入验证码");
				}else{
					$.post('/articles/article_comment_add',{'article_id':article_id,'article_comment':article_comment,'article_simgname':article_simgname,'captch':captch},function(msg){
					
						if(msg.flag == 'guest'){
							alert(msg.info);
							window.location.href='/members/login/article_' + article_id;
						} else if(msg.flag == 'verify'){
							alert(msg.info);
						} else {
							if(msg.number == 'yes'){
								point_message();
								//setTimeout( function () {
									$('#simgname_').val('');
									$('div#normal').load('/articles/article_reply/' + article_id + '.html');
									$.ajaxSetup({cache: false /*关闭AJAX相应的缓存*/});
									//window.location.href='/articles/article_detail/' + article_id + '.html#comment_container';
								//}, 2000)
							}else if(msg.str == 'no'){
								alert('您的评论存在非法关键字，请重新编辑！');
								$.ajaxSetup({cache: false /*关闭AJAX相应的缓存*/});
							}else if(msg.str == 'captch_no'){
								alert('验证码错误');
								$.ajaxSetup({cache: false /*关闭AJAX相应的缓存*/});
							}else{
								$('#simgname_').val('');
								$('div#normal').load('/articles/article_reply/' + article_id + '.html');
								$.ajaxSetup({cache: false /*关闭AJAX相应的缓存*/});
								//window.location.href='/articles/article_detail/' + article_id + '.html#comment_container';
							}
						}
					},"json");
				}
			}
        }else{
            alert('请您输入回复内容');
        }
    });
    
  
    
    $("a[id^='article_comment_reply_btn_']").click(function(){
        var id = $(this).attr('id');
        id = id.substring(26,id.length);
        var comment_id = $('#comment_id_'+id).val();
        var reply_comment_content = $('#reply_comment_content_'+id).val();
        var article_id = $('#article_id').val();
        var article_simgname = $('#simgname_'+id).val();
        if(reply_comment_content != ''){
            $.post('/articles/article_comment_reply_add',{'article_id':article_id,'comment_id':comment_id,'reply_comment_content':reply_comment_content,'article_simgname':article_simgname},function(msg){
                $('simgname_'+id).val('');
                if(msg.flag == 'guest'){
                    //alert(msg.info);
                    //window.location.href='/members/login/article_' + article_id;
                } else {
					if(msg.number == 'yes'){
						point_message();
						setTimeout( function () {
							$('div#normal').load('/articles/article_reply/' + article_id + '.html');
						}, 2000)
					}else{
						$('div#normal').load('/articles/article_reply/' + article_id + '.html');
					}
                }
            },"json");
        }else{
            $('#reply_comment_content_'+id).focus();
            //alert('请您输入回复内容');
        }
        
    });
    $("a[id^='article_detail_comment_reply_close_']").live('click',function(){
        var id = $(this).attr('id');
        id = id.substring(35,id.length);
        $('#reply_comment_'+id).hide();
    });	
    
	//用户中心回复资讯
    $("a[id^='marticle_comment_reply_link_']").click(function(){
        var id = $(this).attr('id');
        id = id.substring(28,id.length);
        $('#reply_comment_'+id).show();
		$("#message_face_"+id).jqfaceedit({txtAreaObj:$("#reply_comment_content_"+id),containerObj:$('#reply_comment_'+id),textareaid: 'reply_comment_content_'+id,top:25,left:-27});
    });
    $("a[id^='marticle_comment_reply_btn_']").live('click',function(){
        var id = $(this).attr('id');
        id = id.substring(27,id.length);
        var comment_id = $('#comment_id_'+id).val();
        var reply_comment_content = $('#reply_comment_content_'+id).val();
		var article_id = $("#article_id_"+id).val();
		var type = $("#site_type_"+id).val();
        if(reply_comment_content != ''){
            $.post('/members/member_comment_reply_add',{'article_id':article_id,'comment_id':comment_id,'reply_comment_content':reply_comment_content,'type':type},function(msg){
				if(msg.info == 'no'){
					alert('您的评论存在非法关键字,请重新编辑再提交');
				}else{
					alert(msg.info);
					location.reload();
					window.location.href='/members/member_receive_comments';
				}
            },"json");
        }else{
            alert('请您输入回复内容');
        }
        
    });
    $("a[id^='article_comment_reply_close_']").click(function(){
        var id = $(this).attr('id');
        id = id.substring(28,id.length);
        $('#reply_comment_'+id).hide();
    });
	
    //喜欢此活动（列表页）
    $('.love').click(function(){
        var party_id = $(this).attr('id');
        $.post('/parties/party_like',{'party_id':party_id,'type':'list'},function(msg){
            $("#" + party_id).html('赞(' + msg.info + ')');
        },"json");
    });
    
    //喜欢此活动（详细页）
    $("a[id^='party_detail_like_']").click(function(){
        var party_id = $(this).attr('id');
        $.post('/parties/party_like',{'party_id':party_id,'type':'detail'},function(msg){
            $("#" + party_id).html(msg.info);
        },"json");
    });
    
    //活动回复（详细页）
    $('#party_comment_btn').live('click',function(){
        var party_id = $('#party_id').val();
        var party_comment_title = $('#party_comment_title').val();
        var party_comment = $('#party_comment').val();
        
        if(party_comment_title == ''){
            alert("请填写标题");
            $('#party_comment_title').focus();
            
            return false;
        } else if(party_comment == ''){
            alert("请填写内容");
            $('#party_comment').focus();
            
            return false;
        } else if(party_comment != ''){
            $.post('/parties/party_comment_add',{'party_id':party_id,'party_comment_title':party_comment_title,'party_comment':party_comment,'comment_type':'bbs'},function(msg){
				if(msg.flag == 'guest'){
                    alert(msg.info);
                    window.location.href='/members/login/party_' + party_id;
                } else {
					if(msg.number == 'yes'){
						point_message();
						setTimeout( function () {
							location.reload();
							window.location.href='/parties/party_detail/' + party_id + '.html#comment_container';
							$("#c_party_comment").val('');
							$("#party_comment_title").val('');
							$("#party_comment").val('');
						}, 2000)
					}else{
						location.reload();
						window.location.href='/parties/party_detail/' + party_id + '.html#comment_container';
						$("#c_party_comment").val('');
						$("#party_comment_title").val('');
						$("#party_comment").val('');
					}
                }
            },"json");
        }
    });
    
	//沙粒提醒获得
	function point_message()
	{
		var point = 2;
		art.dialog({
			title: '',
			time:3,
			content: '<table><tr height="40"><td width="90"><embed src="/images/slow_down/swf/hourglass.swf" type="application/x-shockwave-flash" width="75" height="75" wmode="transparent"></embed></td><td width="110">恭喜您获得'+point+'沙粒</td></tr></table>'
		});
	}
	
    //回复活动论坛回复（详细页）
    $("a[id^='party_comment_reply_link_']").click(function(){
        var id = $(this).attr('id');
        id = id.substring(25,id.length);
        $('#reply_comment_'+id).show();
		$("#re_message_"+id).jqfaceedit({txtAreaObj:$("#reply_comment_content_"+id),containerObj:$('#reply_face_'+id),textareaid: 'reply_comment_content_'+id,top:25,left:-27});
    });
    $("a[id^='party_comment_reply_btn_']").live('click',function(){
        var id = $(this).attr('id');
        id = id.substring(24,id.length);
        var parent_id = $('#comment_id_'+id).val();
        var comment_id = $('#comment_id').val();
        var reply_comment_content = $('#reply_comment_content_'+id).val();
        var party_id = $('#party_id').val();
		
        if(reply_comment_content != ''){
            $.post('/parties/party_comment_reply_add',{'party_id':party_id,'parent_id':parent_id,'comment_id':comment_id,'reply_comment_content':reply_comment_content,'comment_type':'bbs'},function(msg){
                if(msg.flag == 'guest'){
                    alert(msg.info);
                    window.location.href='/members/login/list_party_' + party_id + '_'+comment_id;
                } else {
                    location.reload();
                    window.location.href='/parties/party_detail_list/' + party_id + '/'+comment_id+'.html#normal';
                }
            },"json");
        }else{
			$('#reply_comment_content_'+id).focus();
            //alert('请您输入回复内容');
        }
        
    });
    $("a[id^='party_comment_reply_close_']").click(function(){
        var id = $(this).attr('id');
        id = id.substring(26,id.length);
        $('#reply_comment_'+id).hide();
    });
	
	
	
	//回复活动列表回复（单独）
    $("#party_comment_reply_link").click(function(){
        $('#reply_comment').show();
    });
	
	$("#party_detail_comment_reply_close").click(function(){
        $('#reply_comment').hide();
    });
	
	$("#l_party_comment_reply_btn").live('click',function(){
        var comment_id = $('#comment_id').val();
		var parent_id = $('#comment_id').val();
        var reply_comment_content = $('#reply_comment_content').val();
        var party_id = $('#party_id').val();
        if(reply_comment_content != ''){
            $.post('/parties/party_comment_reply_add',{'party_id':party_id,'comment_id':comment_id,'parent_id':parent_id,'reply_comment_content':reply_comment_content,'comment_type':'bbs'},function(msg){
                if(msg.flag == 'guest'){
                    alert(msg.info);
                    window.location.href='/members/login/list_party_' + party_id + '_'+comment_id;
                } else {
                    location.reload();
                    window.location.href='/parties/party_detail_list/' + party_id + '/'+comment_id+'.html#normal';
                }
            },"json");
        }else{
            alert('请您输入回复内容');
        }
    });

	//回复活动列表回复（快速回复）(论坛)
	$("#q_party_comment_btn").live('click',function(){
        var comment_id = $('#comment_id').val();
		var parent_id = 0;
        var reply_comment_content = $('#q_party_comment').val();
        var party_id = $('#party_id').val();
		
        if(reply_comment_content != ''){
            $.post('/parties/party_comment_reply_add',{'party_id':party_id,'comment_id':comment_id,'parent_id':parent_id,'reply_comment_content':reply_comment_content,'comment_type':'bbs'},function(msg){
                if(msg.flag == 'guest'){
                    alert(msg.info);
                    window.location.href='/members/login/list_party_' + party_id + '_'+comment_id;
                } else {
                    location.reload();
                    window.location.href='/parties/party_detail_list/' + party_id + '/'+comment_id+'.html#normal';
                }
            },"json");
        }else{
            alert('请您输入回复内容');
        }
    });
	
	//活动列表回复（回复）
    $("#c_party_comment_btn").click(function(){    
		var parent_id = 0;
        var comment_content = $('#c_party_comment').val();
        var party_id = $('#party_id').val();
		var party_simgname = $('#simgname_').val();
		var code_count = $("#hidden_code").val();
		var captch = $("#one_captch").val();
        $('#c_party_comment').val('');
		$("#one_captch").val('');
		$("#change").html('点击获取验证码');
        if(comment_content != ''){
			if(code_count < 3){
				$.post('/parties/party_comment_comment_add',{'party_id':party_id,'parent_id':parent_id,'comment_content':comment_content,'comment_type':'comment','party_simgname':party_simgname},function(msg){
				   $("#c_party_comment").val('');
				   $("#simgname_").val('');
				   if(msg.flag == 'guest'){
						alert(msg.info);
						window.location.href='/members/login/comment_list_party_' + party_id;
					} else {
						if(msg.number == 'yes'){
							point_message(); 
							$('div#normal').load('/parties/party_reply/' + party_id + '.html');
							$.ajaxSetup({cache: false /*关闭AJAX相应的缓存*/});
							$("#party_comment_title").val('');
							$("#party_comment").val('');
						 
						}else if(msg.str == 'no'){
							alert('您的评论存在非法关键字，请重新编辑！');
							$.ajaxSetup({cache: false /*关闭AJAX相应的缓存*/});
						}else{
							$('div#normal').load('/parties/party_reply/' + party_id + '.html');
							$.ajaxSetup({cache: false /*关闭AJAX相应的缓存*/});
							$("#party_comment_title").val('');
							$("#party_comment").val('');
						}
					}
				},"json");
			}else{
				if(captch == ''){
					alert("请输入验证码");
				}else{
					$.post('/parties/party_comment_comment_add',{'party_id':party_id,'parent_id':parent_id,'comment_content':comment_content,'comment_type':'comment','party_simgname':party_simgname,'captch':captch},function(msg){
					    $("#c_party_comment").val('');
					    $("#simgname_").val('');
					    if(msg.flag == 'guest'){
							alert(msg.info);
							window.location.href='/members/login/comment_list_party_' + party_id;
						} else {
							if(msg.number == 'yes'){
								point_message(); 
								$('div#normal').load('/parties/party_reply/' + party_id + '.html');
								$.ajaxSetup({cache: false /*关闭AJAX相应的缓存*/});
								$("#party_comment_title").val('');
								$("#party_comment").val('');
							 
							}else if(msg.str == 'no'){
								alert('您的评论存在非法关键字，请重新编辑！');
								$.ajaxSetup({cache: false /*关闭AJAX相应的缓存*/});
							}else if(msg.str == 'captch_no'){
								alert('验证码错误');
								$.ajaxSetup({cache: false /*关闭AJAX相应的缓存*/});
							}else{
								$('div#normal').load('/parties/party_reply/' + party_id + '.html');
								$.ajaxSetup({cache: false /*关闭AJAX相应的缓存*/});
								$("#party_comment_title").val('');
								$("#party_comment").val('');
							}
						}
					},"json");
				}
			}
        }else{
            alert('请您输入回复内容');
        }
    });
	
    //参加活动
    $('#join_party').click(function(){
        var party_id = $('#party_id').val();
        $.post('/parties/party_join',{'party_id':party_id},function(msg){          
            window.location.href='/parties/party_join_form/' + msg.info;       
        },"json");
    });
    $('#join_party_disable').click(function(){
        //$(this).html('已经结束');
        var party_id = $('#party_id').val();
        $.post('/parties/party_join',{'party_id':party_id},function(msg){          
            if(msg.flag == 'guest'){
                alert(msg.info);
                window.location.href='/members/login/party_' + party_id;
            } else {
                window.location.href='/parties/party_join_form/' + msg.info;
            }        
        },"json");
    });
    
    //慢发现
    $('.digg').click(function(){
        var article_id = $(this).attr('id');
        $.post('/articles/article_like',{'article_id':article_id,'type':'list'},function(msg){
            $("#" + article_id).html('<em><strong>' + msg.info + '</strong></em>');
        },"json");
    });
    
    //关注会员
    $('#member_follow').click(function(){
        var member_follow_id = $("input[name='member_follow_id']").val();
        
        $.post('/members/member_follow',{'member_follow_id':member_follow_id},function(msg){
            if(msg.flag == 'guest'){
                alert(msg.info);
                window.location.href='/members/login/member_detail_' + member_follow_id;
            } else if(msg.flag == 'not_follow'){
                alert(msg.info);
            } else {
                $('#member_follow a').html(msg.info);
            }
        },"json");
    });
    
    //取消关注
    $('#member_follow_remove').click(function(){
        var member_follow_id = $("input[name='member_follow_id']").val();
        
        $.post('/members/member_follow_remove',{'member_follow_id':member_follow_id},function(msg){
            if(msg.flag == 'guest'){
                alert(msg.info);
                window.location.href='/members/login/member_detail_' + member_follow_id;
            } else {
                $('#member_follow_remove a').html(msg.info);
            }
        },"json");
    });
	
	//用户中心关注
	$("[id^='member_follow_add_']").click(function(){
        var id = $(this).attr('id');
        fans_id = id.substring(18,id.length);
        var member_id = $("#member_id").val();

		$.post('/members/member_fans_follow',{'fans_id':fans_id,'member_id':member_id},function(msg){
			$("#"+id).html(msg.info);
		},"json")
    });
	
	//用户中心取消关注
	$("[id^='member_follow_remove_']").click(function(){
        var id = $(this).attr('id');
        fans_id = id.substring(21,id.length);
        var member_id = $("#member_id").val();

		$.post('/members/member_fans_follow_remove',{'fans_id':fans_id,'member_id':member_id},function(msg){
			$("#"+id).html(msg.info);
		},"json")
    });
	
	//取消关注
	$("[id^='member_follow_delete_']").click(function(){
        var id = $(this).attr('id');
        fans_id = id.substring(21,id.length);
        var member_id = $("#member_id").val();
		
		$.post('/members/member_remove_follow',{'fans_id':fans_id,'member_id':member_id},function(msg){
			$("#"+id).html(msg.info);
		},"json")
    });
	
	//关注其他会员的fans
	$("[id^='member_track_other_']").click(function(){
        var id = $(this).attr('id');
        fans_id = id.substring(19,id.length);
		var member_id = $("#member_id").val();
		
		$.post('/members/member_follow_other',{'fans_id':fans_id},function(msg){
			if(msg.flag == 'guest'){
                alert(msg.info);
                window.location.href='/members/login/member_fans_' + member_id;
            } else {
                $("#"+id).html(msg.info);
            }
		},"json")
    });
	
	//取消关注会员里面的粉丝
	$("[id^='member_track_deleteother_']").click(function(){
        var id = $(this).attr('id');
        fans_id = id.substring(25,id.length);
		
		$.post('/members/member_follow_deleteother',{'fans_id':fans_id},function(msg){
			$("#"+id).html(msg.info);
		},"json")
    });
	
	//用户中心回复私信
    $("a[id^='message_reply_link_']").click(function(){
        var id = $(this).attr('id');
        id = id.substring(19,id.length);
        $('#reply_message_'+id).show();
    });
    $("a[id^='message_reply_btn_']").click(function(){
        var id = $(this).attr('id');
        id = id.substring(18,id.length);
        var message_id = $('#message_id_'+id).val();
        var reply_message_content = $('#reply_message_content_'+id).val();
		var from_member_id = $("#from_member_id_"+id).val();
		var article_id = $(this).attr('title');
		
        if(reply_message_content != ''){
            $.post('/members/message_reply_add',{'message_id':message_id,'reply_message_content':reply_message_content,'from_member_id':from_member_id,'article_id':article_id},function(msg){
				alert(msg.info);
				window.location.href='/members/member_receive_message';
            },"json");
        }else{
            alert('请您输入回复内容');
        }
        
    });
    $("a[id^='message_reply_close_']").click(function(){
        var id = $(this).attr('id');
        id = id.substring(20,id.length);
        $('#reply_message_'+id).hide();
    });
    
    //活动上传图片
    $("#party_photo_upload_btn").click(function(){
        var party_id = $('#party_id').val();
        
        $.post('/parties/member_party_check',{'party_id':party_id},function(msg){
            if(msg.flag == 'guest'){
                alert(msg.info);
                window.location.href='/members/login/party_' + party_id;
            } else if(msg.flag == 'no'){
                alert(msg.info);
                window.location.href='#';
            } else if(msg.flag == 'yes') {
                window.location.href = msg.info;
            }
        },"json");
    });
	
	//论坛js
	//回复主帖
	$("#post_detail_reply").click(function(){
		$("#post_detail_comment").show();
	});
	$("#post_detail_btn").live('click',function(){
        var auto_id = $('#post_detail_auto_id').val();
        var category_id = $('#post_detail_category_id').val();
        var comment = $('#post_detail_comment_content').val();
		
        if(comment != ''){
            $.post('/bbs/post_detail_comment_reply_add',{'auto_id':auto_id,'category_id':category_id,'comment':comment},function(msg){
                if(msg.flag == 'guest'){
					
                } else {
                    location.reload();
                    window.location.href='/bbs/post_detail/' + auto_id + '.html';
                }
            },"json");
        }else{
            $('#post_detail_comment_content').focus();
        }
	})
	$("#post_detail_comment_close").click(function(){
		$("#post_detail_comment").hide();
	});
	
	//单独回复
	$("#post_separate_reply_btn").live('click',function(){
        var auto_id = $('#post_detail_auto_id').val();
        var category_id = $('#post_detail_category_id').val();
        var comment = $('#post_separate_reply').val();
		
        if(comment != ''){
            $.post('/bbs/post_comment_reply_add',{'auto_id':auto_id,'category_id':category_id,'parent_id':'0','comment':comment},function(msg){
                if(msg.flag == 'guest'){
					
                } else {
                    location.reload();
                    window.location.href='/bbs/post_detail/' + auto_id + '.html';
                }
            },"json");
        }else{
            $('#post_separate_reply').focus();
        }
	})
	
	//回复帖子下面的跟帖
	$("a[id^='post_reply_']").click(function(){
		var id = $(this).attr('id');
		id = id.substring(11,id.length);
		$('#post_comment_'+id).show();
		$("#post_message_face_"+id).jqfaceedit({txtAreaObj:$("#post_comment_content_"+id),containerObj:$('#post_comment_'+id),textareaid: 'post_comment_content_'+id,top:25,left:-27});
	});
	
	$("input[id^='post_btn_']").live('click',function(){
        var id = $(this).attr('id');
        id = id.substring(9,id.length);
        var category_id = $('#post_category_id_'+id).val();
        var auto_id = $('#post_auto_id_'+id).val();
        var comment = $('#post_comment_content_'+id).val();
		var parent_id = id;
		
        if(comment != ''){
            $.post('/bbs/post_comment_reply_add',{'auto_id':auto_id,'category_id':category_id,'parent_id':parent_id,'comment':comment},function(msg){
				if(msg.flag == 'guest'){
					
                } else {
                    location.reload();
                    window.location.href='/bbs/post_detail/' + auto_id + '.html';
                }
            },"json");
        }else{
            alert('请您输入回复内容');
        }
        
    });
	
	$("input[id^='post_comment_close_']").click(function(){
        var id = $(this).attr('id');
        id = id.substring(19,id.length);
        $('#post_comment_'+id).hide();
    });

    //论坛关注
	$("div[id^='follow_member_']").click(function(){
        var id = $(this).attr('id');
        id = id.substring(14,id.length);
		var member_id = $('#member_id_'+id).val();
		
		$.post('/bbs/member_follow',{'member_id':member_id},function(msg){
			if(msg.flag == 'guest'){
				
			} else {
				$('#follow_member_'+id).html(msg.info);
			}
		},"json");
    });
	
	$("#detail_follow_member").live('click',function(){
		var member_id = $('#members').val();
		$.post('/bbs/member_follow',{'member_id':member_id},function(msg){
			if(msg.flag == 'guest'){
				
			} else {
				$('#detail_follow_member').html(msg.info);
			}
		},"json");
    });
	
	//发送私信
	$("div[id^='send_message_']").click(function(){
        var id = $(this).attr('id');
        id = id.substring(13,id.length);
		var member_id = $('#member_id_'+id).val();
		$('#send_message').click(function(){
			var message = $("#message_content").val();
			if(message != ''){
				$.post('/bbs/message_add',{'member_id':member_id,'message':message},function(msg){
					if(msg.flag == 'guest'){
						
					} else {
						alert(msg.info);
						$(".aui_state_focus").remove();
					}
				},"json");
			}else{
				alert('请您输入私信内容');
			}
		})
    });
	
	$("#detail_send_message").live('click',function(){
		var member_id = $('#members').val();
		$('#send_message').click(function(){
			var message = $("#message_content").val();
			if(message != ''){
				$.post('/bbs/message_add',{'member_id':member_id,'message':message},function(msg){
					if(msg.flag == 'guest'){
						
					} else {
						alert(msg.info);
						$(".aui_state_focus").remove();
					}
				},"json");
			}else{
				alert('请您输入私信内容');
			}
		})
    });
    //话题慢聊修改图片描述
    $("input[id^=online_desc_img_]").change(function(){
         var id = $(this).attr('id');
         id = id.substring(16,id.length);
         var val = $(this).val();
         if(val==''){
             alert('描述不能为空');
             $(this).focus(); 
         }else{
            $.post('/online/online_feedback_imgdesc',{'id':id,'image_name':val},function(msg){
                if(msg.flag == 'guest'){
                    alert(msg.info);
                } else if(msg.flag=='error') {
                    alert(msg.info);
                    $(this).focus();
                }
            },"json");
         } 
    });
    
     //活动推荐修改图片描述
    $("textarea[id^=mparty_desc_img_]").change(function(){
         //去描述的编号和值
         var id = $(this).attr('id');
         id = id.substring(16,id.length);
         var val = $(this).val();
         //取隐藏的值
         var is_private = $(this).next().val();
         
         if(val==''){
             alert('描述不能为空');
             $(this).focus(); 
         }else{
            $.post('/members/party_feedback_imgdesc',{'id':id,'image_name':val,'is_private':is_private},function(msg){
                if(msg.flag == 'guest'){
                    alert(msg.info);
                } else if(msg.flag=='error') {
                    alert(msg.info);
                    $(this).focus();
                }
            },"json");
         } 
    });
    $("select[id^=party_image_is_private_]").change(function(){
         //取描述的值
         var image_name = $(this).prev().prev().val();
         //取隐藏的编号和值
         var id = $(this).attr('id');
         id = id.substring(23,id.length);
         var val = $(this).val();
         
         if(val==''){
             alert('描述不能为空');
             $(this).focus(); 
         }else{
            $.post('/members/party_feedback_imgdesc',{'id':id,'image_name':image_name,'is_private':val},function(msg){
                if(msg.flag == 'guest'){
                    alert(msg.info);
                } else if(msg.flag=='error') {
                    alert(msg.info);
                    $(this).focus();
                }
            },"json");
         } 
    });
    
	$("#change").live('click',function(){
    	$.post('/toupiao/get_captcha',{},function(msg){
    		$("#change").html(msg);
    	});
    })

    $("span[id^='captch_change_']").live('click',function(){
        var id = $(this).attr('id');
        id = id.substring(14,id.length);
    	$.post('/toupiao/get_captcha',{},function(msg){
    		$("#captch_change_"+id).html(msg);
    	});
    })
    
});

//屏蔽回车事件
function KeyDown()
{ 
    if ( event.keyCode == 13 ) 
    { 
        return false; 
    } 
}

//给选中的文字加粗体标签
var cursorPosition = {
	get: function (textarea) {
		var rangeData = {text: "", start: 0, end: 0};
	
		if (textarea.setSelectionRange) { // W3C	
			textarea.focus();
			rangeData.start= textarea.selectionStart;
			rangeData.end = textarea.selectionEnd;
			rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end): "";
		} else if (document.selection) { // IE
			textarea.focus();
			var i,
				oS = document.selection.createRange(),
				oR = document.body.createTextRange();
			oR.moveToElementText(textarea);
			
			rangeData.text = oS.text;
			rangeData.bookmark = oS.getBookmark();
			
			for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i ++) {

				if (textarea.value.charAt(i) == '\r' ) {
					i ++;
				}
			}
			rangeData.start = i;
			rangeData.end = rangeData.text.length + rangeData.start;
		}
		
		return rangeData;
	},
	
	set: function (textarea, rangeData) {
		var oR, start, end;
		if(!rangeData) {
			alert("You must get cursor position first.")
		}
		textarea.focus();
		if (textarea.setSelectionRange) { // W3C
			textarea.setSelectionRange(rangeData.start, rangeData.end);
		} else if (textarea.createTextRange) { // IE
			oR = textarea.createTextRange();
			if(textarea.value.length === rangeData.start) {
				oR.collapse(false);
				oR.select();
			} else {
				oR.moveToBookmark(rangeData.bookmark);
				oR.select();
			}
		}
	},

	add: function (textarea, rangeData, text) {
		var oValue, nValue, oR, sR, nStart, nEnd, st;
		this.set(textarea, rangeData);
		
		if (textarea.setSelectionRange) { // W3C
			oValue = textarea.value;
			nValue = oValue.substring(0, rangeData.start) + text + oValue.substring(rangeData.end);
			nStart = nEnd = rangeData.start + text.length;
			st = textarea.scrollTop;
			textarea.value = nValue;
			if(textarea.scrollTop != st) {
				textarea.scrollTop = st;
			}
			textarea.setSelectionRange(nStart, nEnd);
		} else if (textarea.createTextRange) { // IE
			sR = document.selection.createRange();
			sR.text = text;
			sR.setEndPoint('StartToEnd', sR);
			sR.select();
		}
	}
}

//添加到收藏夹
function AddFavorite(sURL, sTitle)
{
    try {
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}