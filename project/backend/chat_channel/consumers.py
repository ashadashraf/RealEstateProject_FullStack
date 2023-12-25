from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from authentication.models import User
from .models import Message
import asyncio
from django.db.models import Q


class ChatConsumer(AsyncWebsocketConsumer):

    @database_sync_to_async
    def get_user(self, user_id):
        user = User.objects.get(id=user_id)
        return user

    async def init_chat(self, data):
        user_id = data['user_id']
        user = await self.get_user(user_id)
        content = {
            'command': 'init_chat'
        }
        if not user:
            content['error'] = 'Unable to get User with userID: ' + user_id
            await self.send_message(content)
            return
        content['success'] = 'Chatting in with success with username: ' + user.username
        await self.send_message(content)

    async def get_first_property_image(self, property_id):
        from data.models import Documents
        try:
            image = await database_sync_to_async(
                lambda: Documents.objects.filter(property_id=property_id).order_by('created_at').first()
            )()
            return image.image.url if image else None
        except Exception as e:
            print(f"Error getting first property image: {e}")
            return None

    async def get_message_details(self, user):
        from data.models import Property
        from .models import Message
        user_properties = await database_sync_to_async(Property.objects.filter)(user_id=user)
        message_details = await database_sync_to_async(
            lambda: list(
                Message.objects.filter(Q(author=user) | Q(receiver=user))
                .values('property__id', 'property__property_name', 'author__id', 'author__username')
                .exclude(author=user)
                .distinct()
            )
        )()
        for detail in message_details:
            property_id = detail['property__id']
            image = await self.get_first_property_image(property_id)
            detail['property_image'] = image
            property_owner_id = await self.get_property_owner(property_id)
            detail['property_owner_id'] = property_owner_id
        return message_details


    async def fetch_messages(self, data):
        # query_string = self.scope['query_string'].decode('utf-8')
        # query_params = dict(qp.split("=") for qp in query_string.split("&") if "=" in qp)
        current_user = data['current_user']
        property_id = data['property_id']
        receiver = data['receiver_id']
        if property_id == 'all' or current_user == 'all' or receiver == 'all':
            print('fetch messages', property_id, current_user, receiver)
            return
        
        print('enters here')
        messages = await self.last_50_messages(current_user, receiver, property_id)
        
        content = {
            'command': 'messages',
            'messages': await self.messages_to_json(messages)
        }
        print(1, content)
        await self.send_message(content)

    @database_sync_to_async
    def last_50_messages(self, author, receiver, property):
        from .models import Message
        print('model', author, receiver, property)
        messages = Message.objects.filter(
            Q(author=author, receiver=receiver) | Q(author=receiver, receiver=author),
            property=property
        ).order_by('-created_at').all()[:50]
        print(messages)
        return list(messages)  # Convert QuerySet to list


    
    async def fetch_all_clients(self, data):
        print('entered for fetch all clients')
        current_user = data['current_user']
        property_id = data['property_id']
        receiver = data['receiver_id']
        message_details = []
        if current_user:
            message_details = await self.get_message_details(current_user)
            print('sss',message_details)
            if message_details:
                for detail in message_details:
                    property_id = detail['property__id']
                    property_name = detail['property__property_name']
                    property_owner_id = detail['property_owner_id']
                    property_image = detail['property_image']
                    author_id = detail['author__id']
                    author_name = detail['author__username']
                    print(f"Property ID: {property_id}, Property Name: {property_name}, Property Image: {property_image}, Author ID: {author_id}, Author Name: {author_name}")
            else:
                if property_id != 'all' and receiver != 'all':
                    print('else')
                    property_instance = await self.get_property(property_id)
                    user_instance = await self.get_user(receiver)
                    property_image = await self.get_first_property_image(property_instance.id)
                    property_owner_id = await self.get_property_owner(property_id)
                    message_details = {
                        'property__id': property_instance.id,
                        'property__property_name': property_instance.property_name,
                        'property_owner_id': property_owner_id,
                        'property_image': property_image,
                        'author__id': user_instance.id,
                        'author__username': user_instance.username
                    }
                    print('message details', message_details)

        else:
            message_details = 'No registered user'
        content = {
            'command': 'all_client_messages',
            'message': message_details
        }
        await self.send_message(content)
        

    @database_sync_to_async
    def create_message(self, author, receiver, text, property):
        from .models import Message
        return Message.objects.create(author=author, receiver=receiver, content=text, property=property)
    
    @database_sync_to_async
    def get_property(self, property_id):
        from data.models import Property
        return Property.objects.get(id=property_id)
    
    @database_sync_to_async
    def get_property_owner(self, property_id):
        from data.models import Property
        property_instance = Property.objects.get(id=property_id)
        property_owner = User.objects.get(email=property_instance.user_id)
        return property_owner.id

    async def new_message(self, data):
        author = data['from']
        receiver = data['to']
        text = data['text']
        property_id = data['property']
        author_instance = await self.get_user(author)
        receiver_instance = await self.get_user(receiver)
        property_instance = await self.get_property(property_id)
        message = await self.create_message(author_instance, receiver_instance, text, property_instance)
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        await self.send_chat_message(content)

    # async def last_50_messages(self, current_user, receiver, property):
    #     print(current_user, receiver, property) 
    #     message = await Message.last_50_messages(author=current_user, receiver=receiver, property=property)
    #     print(2, message)

    @database_sync_to_async
    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        print('message to json', message)
        return {
            'id': str(message.id),
            'author': message.author.username,
            'content': message.content,
            'created_at': str(message.created_at)
        }

    commands = {
        'init_chat': init_chat,
        'fetch_messages': fetch_messages,
        'new_message': new_message,
        'fetch_all_clients': fetch_all_clients,
        'messages': fetch_messages,
    }

    async def connect(self):
        query_string = self.scope['query_string'].decode('utf-8')
        query_params = dict(qp.split("=") for qp in query_string.split("&") if "=" in qp)

        print('params', query_params)
        current_user = query_params.get('current_user')
        property_id = query_params.get('property_id')
        property_user = query_params.get('property_user')

        self.room_name = 'room'
        self.room_group_name = f'chat_{self.room_name}_property{property_id}_owner{property_user}_customer{current_user}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # leave group room
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # async def receive(self, text_data):
    #     data = json.loads(text_data)
    #     await self.commands[data['command']](self, data)

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            await self.commands[data['command']](self, data)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
        except Exception as e:
            print(f"Error handling message: {e}")


    async def send_message(self, message):
        cleaned_message = await self.clean_message(message)
        await self.send(text_data=json.dumps(cleaned_message))

    async def clean_message(self, message):
        cleaned_message = {
            key: await value if asyncio.iscoroutine(value) else value
            for key, value in message.items()
        }
        return cleaned_message

    async def send_chat_message(self, message):
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        await self.send(text_data=json.dumps(message))