from drf_yasg import openapi

USER_REGISTER_RESPONSES = {
    201: openapi.Response(
        description="User registered successfully",
        schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "message": openapi.Schema(type=openapi.TYPE_STRING)
            },
            example={"message": "User registered successfully"}
        )
    ),
    400: "Bad request. Validation errors.",
    401: "Unauthorized. User is not allowed."
}

RESET_PASSWORD_RESPONSES = {
        200: openapi.Response(
            description="Password reset token generated",
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "token": openapi.Schema(type=openapi.TYPE_STRING),
                    "message": openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
        400: "Email is required",
        404: "User not found"
    }

RSET_PASSWORD_REQUEST_BODY = openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['email'],
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email')
        }
    )

CONFIRM_RESET_PASSWORD_RESPONSES = {
        200: openapi.Response(
            description="Password reset successful",
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "message": openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
        400: "Bad request. Validation errors.",
        404: "User not found"
    }

LOGIN_RESPONSES = {
            200: openapi.Response(
                description="User login successful",
                schema=openapi.Schema(
                 type=openapi.TYPE_OBJECT,
                 properties={
                    'access': openapi.Schema(type=openapi.TYPE_STRING, description='JWT access token'),
                    'refresh': openapi.Schema(type=openapi.TYPE_STRING, description='JWT refresh token')
                 },
            )
        ),
            400: 'Invalid credentials'
        }


