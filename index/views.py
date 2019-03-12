import datetime
import json
import os

from django.core import serializers
from django.views.decorators.csrf import csrf_exempt, csrf_protect

from .models import *
from django.http import HttpResponse
from django.shortcuts import render, redirect


# Create your views here.
#首页
def index_views(request):
    return render(request,"index.html")

#登录页面
@csrf_exempt
def login_views(request):
    if request.method=="GET":
        url = request.META.get("HTTP_REFERER", '/')
        print(url)
        resp = render(request, "login.html")
        resp.set_cookie("url", url)
        return resp
    else:
        name = request.POST['uname']
        upwd = request.POST["password"]
        user1 = User.objects.filter(uname=name)
        user2 = User.objects.filter(uemail=name)
        user3 = User.objects.filter(uphone=name)
        url = request.COOKIES.get("url", "/")
        resp = redirect(url)
        resp.delete_cookie("url")
        if user1:
            if upwd == user1[0].upwd:
                request.session["uid"] = user1[0].id
                request.session['uphone'] = user1[0].uphone
                return resp
        elif user2:
            if upwd == user2[0].upwd:
                request.session["uid"] = user2[0].id
                request.session['uphone'] = user2[0].uphone
                return resp

        elif user3:
            if upwd == user3[0].upwd:
                request.session["uid"] = user3[0].id
                request.session['uphone'] = user3[0].uphone
                return resp
        return render(request,"login.html")

#注册页面
def register_views(request):
    if request.method == "GET":
        url = request.META.get("HTTP_REFERER", '/')
        resp = render(request,"register.html")
        resp.set_cookie("url",url)
        return resp
    else:
        uname = request.POST['uname']
        uemail = request.POST['email']
        upwd = request.POST['password']
        uphone = request.POST['mobile']
        time =datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(time)
        user = User()
        user.uphone = uphone
        user.upwd = upwd
        user.uname = uname
        user.uemail = uemail
        user.time = time
        user.icon = '/static/img/boy.jpg'
        user.save()
        request.session["uid"] = user.id
        request.session['uphone'] = user.uphone
        # return HttpResponse("ok")
        url = request.COOKIES.get("url","/")
        resp = redirect(url)
        resp.delete_cookie("url")
        return resp


#发送博客
def release_views(request):
    if request.method == "GET":
        url = request.META.get("HTTP_REFERER", '/')
        resp = render(request, "release.html")
        resp.set_cookie("url",url)
        return resp
    else:
        userid = request.POST['userid']
        title = request.POST['author']
        time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        typeid = request.POST['type']
        isActive = request.POST['list']
        content = request.POST['content']
        f1 = request.FILES.get('picture')
        basedir = os.path.dirname(os.path.dirname(__file__))
        path = os.path.join(basedir, 'static/img/textimg', f1.name)
        with open(path, 'wb') as pic:
            for p in f1.chunks():
                pic.write(p)
        text = Texts()
        text.picture = "/static/img/textimg/" + f1.name
        text.time = time
        text.content = content
        text.texttype_id = typeid
        text.user_id = userid
        text.isActive = isActive
        text.title = title
        text.save()
        url = request.COOKIES.get('url','/')
        resp = redirect(url)
        resp.delete_cookie("url")
        return resp


#浏览文章
def info_views(request):
    return render(request,"info.html")

#忘记密码
def forget_views(request):
    return render(request,"forget.html")

#个人主页
def page_views(request):
    userid = request.session.get("uid")
    texts = Texts.objects.filter(user_id=userid ,isDelete=False)
    return render(request,'page.html',locals())

#查看别人主页
def homepage_views(request):
    return render(request,"homepage.html")

#个人主页同城交友
def city_views(request):
    return render(request,"city.html")

#修改密码
def modify_views(request):
    url = request.META.get("HTTP_REFERER", '/')
    resp = render(request,'modify.html')
    resp.set_cookie("url", url)
    return resp

#粉丝页面
def fans_views(request):
    return render(request,"fans.html")

#栏目文章
def showclass_views(request):
    return render(request,"showclass.html")

#站内消息
def members_views(request):
    return render(request,'members.html')

#查看私信
def private_message_views(request):
    return render(request,"private_message.html")

#查看发送的私信
def send_message_views(request):
    return render(request,"send_message.html")

#查看收到的私信


#编写基本信息
@csrf_exempt
def information_views(request):
    if request.method=="GET":
        pass
    else:
        url = request.META.get("HTTP_REFERER", '/')
        name = request.POST["uname"]
        age = request.POST['uage']
        sex = request.POST['gender']
        city = request.POST["city"]
        userid = request.POST['userid']
        f1 = request.FILES.get('uimg')
        if f1:
            basedir = os.path.dirname(os.path.dirname(__file__))
            path = os.path.join(basedir,'static/img/upload',f1.name)
            with open(path, 'wb') as pic:
                for p in f1.chunks():
                    pic.write(p)
            print(url, name, age, sex, city, f1.name,userid)
            print(type(userid))
            info = User.objects.get(id =userid)
            info.realname = name
            info.age = age
            info.sex = sex
            info.city = city
            info.icon = "/static/img/upload/"+f1.name
            info.save()
        else:
            info = User.objects.get(id=userid)
            info.realname = name
            info.age = age
            info.sex = sex
            info.city = city
            info.save()
    return redirect(url)


#页面显示用户登录情况
def check_login_views(request):
    if "uid" in request.session and "uphone" in request.session:
        id = request.session['uid']
        uname = User.objects.get(id=id).uname
        pic = User.objects.get(id=id).icon
        dic = {
            "uname": uname,
            "id":id,
            "pic":pic,
        }
        return HttpResponse(json.dumps(dic))
    else:
        dic = {
            "uname": 'none',
            "id":""
        }
        return HttpResponse(json.dumps(dic))

#验证用户名
def check_name_views(request):
    name = request.GET['name']
    user1 = User.objects.filter(uname = name)
    user2 = User.objects.filter(uemail=name)
    user3 = User.objects.filter(uphone = name)
    if user1:
        return HttpResponse("<img src='/static/img/ico-success.png'>")
    elif user2:
        return HttpResponse("<img src='/static/img/ico-success.png'>")
    elif user3:
        return HttpResponse("<img src='/static/img/ico-success.png'>")
    else:
        return HttpResponse("<img src='/static/img/ico-error.png'>")

#退出登录
def logout_views(request):
    url = request.META.get("HTTP_REFERER", '/')
    if 'uid' in request.session and 'uphone' in request.session:
        del request.session['uid']
        del request.session['uphone']
    # 构建响应对象, 哪发的退出请求，则返回到哪去
    return redirect(url)


#登录状态中修改密码
def modify_upwd_views(request):
    if request.method == "GET":
        pass
    else:
        userid = request.POST['userid']
        upwd = request.POST['new_password']
        user = User.objects.get(id = userid)
        user.upwd = upwd
        user.save()
        url = request.COOKIES.get("url", "/")
        print(url)
        resp = redirect(url)
        resp.delete_cookie("url")
        del request.session['uid']
        del request.session['uphone']
        return resp


#登录状态中修改，密码验证
def check_upwd_views(request):
    userid = request.GET["userid"]
    upwd = request.GET["upwd"]
    cupwd = User.objects.get(id=userid).upwd
    if upwd == cupwd:
        return HttpResponse("<img src='/static/img/ico-success.png'>")
    else:
        return HttpResponse("密码不正确")


#查看自己发表的文章 id 文章编号
def bass_views(requset,id):
    print("data",id)
    text = Texts.objects.get(id = id)
    user = text.user
    icon = user.icon
    time = text.time
    name = user.uname
    city = user.city
    return render(requset,"selfread.html",locals())

#删除自己一发表的文章
def delete_views(request,id):
    text = Texts.objects.get(id = id)
    text.isDelete = True
    text.save()
    return redirect("/page/")

#查看回收站
def recycle_views(request):
    user_id = request.GET['userid']
    texts = Texts.objects.filter(user_id=user_id,isDelete=True)
    list = []
    for text in texts:
        list.append(text.todic())
    print(list)
    return HttpResponse(json.dumps(list))
    # text_json = serializers.serialize("json", texts)
    # return HttpResponse(text_json)

#修改文章
def modify_text_views(request,id):
    url = request.META.get("HTTP_REFERER", '/')
    text = Texts.objects.get(id=id)
    list = json.dumps(text.content)
    resp = render(request, "modify_text.html",locals())
    resp.set_cookie("url", url)
    return resp


#修改文章后保存
def modify_text_after_views(request):
    text_id = request.POST['text_id']
    time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    title = request.POST['author']
    typeid = request.POST['type']
    isActive = request.POST['list']
    content = request.POST['content']
    f1 = request.FILES.get('picture')
    basedir = os.path.dirname(os.path.dirname(__file__))
    path = os.path.join(basedir, 'static/img/textimg', f1.name)
    with open(path, 'wb') as pic:
        for p in f1.chunks():
            pic.write(p)
    text = Texts.objects.get(id=text_id)
    text.picture = "/static/img/textimg/" + f1.name
    text.time = time
    text.content = content
    text.texttype_id = typeid
    text.isActive = isActive
    text.title = title
    text.save()
    url = request.COOKIES.get("url", "/")
    resp = redirect(url)
    resp.delete_cookie("url")
    return resp


#发表评论
@csrf_exempt
def reply_views(request):
    if request.method == "GET":
        pass
    else:
        userid = request.POST["userid"]
        textid = request.POST['textid']
        content = request.POST['content']
        time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        pinlun = Pinlun()
        pinlun.load = content
        pinlun.time = time
        pinlun.text_id = textid
        pinlun.comment_user = userid
        pinlun.save()
        name = User.objects.get(id=userid).uname
        icon = User.objects.get(id=userid).icon
        dic = {
            "name":name,
            "time":time,
            "content":content,
            "icon": icon,
        }
        return HttpResponse(json.dumps(dic))