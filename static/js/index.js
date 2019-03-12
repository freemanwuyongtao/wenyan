function check_login() {
	// console.log(2);
	$.get('/check_login',function (data) {
		// console.log("22"+data.uname);
		// console.log(3);
		if(data.uname=="none") {
            // $("#mysharli3").html('<a href="/register">注册</a>');
            // $(".hide").html('<a href="/login">登录</a>');
			$(".add_article").html('<a href="javascript:void(0);" onclick="login1()" title="文章发布" >文章发布</a>');
            $(".decline").html('<a style="color: #EAEAEA" href="javascript:void(0);" onclick="login1()" title="文章发布" >文章发布</a>');
            console.log(123);
            $("#submit_cls").html('<a id="article_comment_btn_no_login" class="comment-btn" href="javascript:void(0)" onclick="login();"><span>回复</span></a>');
            console.log(111);
        }else{
		    $(".login_id").html(data.id);

            $(".login_upwd").html('<input type="hidden" name="userid" value="'+data.id+'">');

            $(".other").html('<a href="" class="hide">用户中心</a>' +
                '<ul>' +
                '<li class="edit"><a href="javascript:void(0);" onclick="login($(\'.login_id\').text())">基本信息</a></li>' +
                '<li class="edit"><a href="/page">个人主页</a></li>'+
                '<li class="edit"><a href="/modify">修改密码</a></li>' +
                '<li class="edit"><a href="/logout">退出登录</a></li>' +
                '</ul>');

		    $(".mysharli2").html('<a href="">'+data.uname+'</a>');

            $(".add_article").html('<a href="/release" title="文章发布">文章发布</a>');

            $(".decline").html('<a href="/release" title="文章发布" style="color: #EAEAEA">文章发布</a>');
            $("#submit_cls").html('<a id="article_comment_btn_no_login" class="comment-btn"><span>回复</span></a>');

            $(".other1").html('<a href="" class="hide">我的消息</a>' +
                '<ul> ' +
                '<li class="edit"><a href="/private_message">我的私信</a></li>'+
                '<li class="edit"><a href="">收到回复</a></li>' +
                '<li class="edit"><a href="">收到问题</a></li>' +
                '<li class="edit"><a href="">文章收藏</a></li>' +
                '<li class="edit"><a href="">新增粉丝</a></li>' +
                '<li class="edit"><a href="/members">站内信息</a></li>' +
                '</ul>');
            $("#titlename").html(data.uname)

            $("#userpic").html('<img src="'+data.pic+ '">')
        }
    },"json")
}
$(function () {
	//调用check_login检查登录状态
	check_login();
});
