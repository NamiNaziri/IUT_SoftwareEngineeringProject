"""GDM_API URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from gdm_app import views
from django.conf.urls import url
from allauth.account.views import confirm_email
from rest_framework_nested import routers

router = routers.DefaultRouter()
router.register(r'projects', views.ProjectView, 'Project')
task_router = routers.NestedDefaultRouter(router,r'projects',lookup='project')
task_router.register(r'tasks',views.TaskView,'Task')
task_router_single = routers.DefaultRouter()
task_router_single.register(r'tasks', views.TaskView, 'Task')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/',include(task_router.urls)),
    path('api/',include(task_router_single.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^account/', include('allauth.urls')),
    url(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email'),
]
