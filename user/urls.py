from django.urls import path

from .views import register_user, LoginTokenView, LoginTokenRefreshView, request_password_reset, reset_password

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', LoginTokenView.as_view(), name='login'),
    path('login/refresh/', LoginTokenRefreshView.as_view(), name='login_token_refresh'),
    path('password-reset/request/', request_password_reset, name='password_reset_request'),
    path('password-reset/confirm/', reset_password, name='password_reset_confirm'),

]