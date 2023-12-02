# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# from django.conf.urls import url
# from . import consumers

# websocket_urlpatterns = [
#     url(r'^ws/chat$', consumers.ChatConsumer.as_asgi()),
# ]

# application = ProtocolTypeRouter({
#     'websocket': AuthMiddlewareStack(
#         URLRouter(
#             websocket_urlpatterns
#         )
#     ),
# })


# from django.urls import re_path as url
# from chat_channel import consumers

# websocket_urlpatterns = [
#     url(r'ws/chat/', consumers.ChatConsumer.as_asgi()),
# ]

# from rest_framework.routers import SimpleRouter
# from .consumers import ChatConsumer


# routes = SimpleRouter()

# routes.register(r'^ws/chat$', ChatConsumer, basename='chat')

# urlpatterns = [
#     *routes.urls
# ]