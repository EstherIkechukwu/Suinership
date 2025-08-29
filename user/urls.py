from django.urls import path

from .views import register_user, LoginTokenView, LoginTokenRefreshView

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', LoginTokenView.as_view(), name='login'),
    path('login/refresh/', LoginTokenRefreshView.as_view(), name='login_token_refresh'),

]