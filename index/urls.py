from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^$',index_views,name="/"),
    url(r'^login/$',login_views,name="login"),
    url(r'^register/$',register_views,name="register"),
    url(r'^release/$',release_views,name='release'),
    url(r'^info/$',info_views,name="info"),
    url(r'^forget/$',forget_views,name="forget"),
    url(r'^homepage/$',homepage_views,name='homepage'),
    url(r'^city/$',city_views,name='city'),
    url(r'fans/$',fans_views,name='fans'),
    url(r'^showclass/$',showclass_views,name="showclass")
]
urlpatterns +=[
    url(r'^check_login/$',check_login_views,name='check_login'),
    url(r'^check_name/$',check_name_views,name="check_name"),
    url(r'^logout/$',logout_views,name="logout"),
    url(r'^page/$',page_views,name='page'),
    url(r'^modify/$',modify_views,name='modify'),
    url(r'^members/$',members_views,name='members'),
    url(r'^send_message/$',send_message_views,name='send_message'),
    url(r'^private_message/$',private_message_views,name='private_message'),
    url(r'^information/$',information_views,name="information"),
    url(r'^modifyupwd/$',modify_upwd_views,name='modifyupwd'),
    url(r'^check_upwd/$',check_upwd_views,name="check_upwd"),
]

urlpatterns +=[
    url(r'^bass(\d+)/$',bass_views,name="bass"),
    url(r'^delete(\d+)/$',delete_views,name='delete'),
    url(r'^recycle/$',recycle_views,name="recycle"),
    url(r'^modify_text(\d+)/$',modify_text_views,name='modify_text'),
    url(r'^modify_text/$',modify_text_after_views,name="modify_after"),
    url(r'^reply/$',reply_views,name="reply"),
]