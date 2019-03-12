from django.db import models

# Create your models here.
# 账号密码表
class User(models.Model):
    uname = models.CharField(max_length=30)
    uemail = models.EmailField()
    upwd = models.CharField(max_length=20)
    uphone = models.CharField(max_length=11)
    realname = models.CharField(max_length=30, null=True)
    age = models.IntegerField(null=True)
    sex = models.CharField(max_length=10)
    city = models.CharField(max_length=20, null=True)
    hobby = models.CharField(max_length=100, null=True)
    icon = models.CharField(max_length=100, null=True)
    time = models.CharField(max_length=30)

    def __str__(self):
        return self.uname

    class Meta:
        db_table = "user"
# 文章类型表
class textType(models.Model):
    title = models.CharField(max_length=30)

    def __str__(self):
        return self.title

    class Meta:
        db_table = "texttype"

# 文章表
class Texts(models.Model):
    title = models.CharField(max_length=100)
    picture = models.ImageField(upload_to="static/upload/text",null=True)
    content = models.TextField()
    texttype = models.ForeignKey(textType)
    user = models.ForeignKey(User)
    time = models.CharField(max_length=30)
    isActive = models.BooleanField(default=True)
    isDelete= models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def todic(self):
        dic = {
            "title":self.title,
            "id":self.id,
        }
        return dic

    class Meta:
        db_table = "texts"

# 文章点赞，评论，浏览
class Comment(models.Model):
    text = models.ForeignKey(Texts)
    like = models.IntegerField(null=True)
    page_view = models.IntegerField(null=True)

    def __str__(self):
        return self.text

    class Meta:
        db_table = "comment"

#文章评论
class Pinlun(models.Model):
    text = models.ForeignKey(Texts)
    load = models.TextField(null=True)
    comment_user = models.CharField(max_length=30)
    time = models.CharField(max_length=30)

    def __str__(self):
        return self.text

    class Meta:
        db_table = "pinlun"


#关注
class Focus(models.Model):
    focus_id = models.IntegerField()
    user = models.ForeignKey(User)

    def __str__(self):
        return self.focus_id

    class Meta:
        db_table = "focus"

