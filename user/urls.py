from django.urls import path

from .views import register_user, LoginTokenView, LoginTokenRefreshView, request_password_reset, reset_password, \
    GoogleAuthRedirectView, GoogleAuthCallbackView, GoogleLoginCallbackView, GoogleLoginAuthRedirectView, \
    RequestOTPView

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', LoginTokenView.as_view(), name='login'),
    path('login/refresh/', LoginTokenRefreshView.as_view(), name='login_token_refresh'),
    path('password-reset/request/', request_password_reset, name='password_reset_request'),
    path('password-reset/confirm/', reset_password, name='password_reset_confirm'),
    path('auth/google/', GoogleAuthRedirectView.as_view(), name='google_redirect'),
    path('auth/google/callback/', GoogleAuthCallbackView.as_view(), name='google-auth-callback'),
    path('auth/google/login/', GoogleLoginAuthRedirectView.as_view(), name='google_login_redirect'),
    path('auth/google/login/callback/', GoogleLoginCallbackView.as_view(), name='google-auth-login-callback'),
    path('auth/google/login/requestOtp/', RequestOTPView.as_view(), name='request_otp'),


]