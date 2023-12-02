from django.db import models
import uuid
from django.core.exceptions import ValidationError
from django.conf import settings
from channels.db import database_sync_to_async


# Create your models here.
User = settings.AUTH_USER_MODEL

def validate_message_content(content):
    if content is None or content == "" or content.isspace():
        raise ValidationError(
            'Content is empty/invalid',
            code='invalid',
            params={'content': content},
        )


class Message(models.Model):
    id = models.UUIDField(
        primary_key=True,
        null=False,
        default=uuid.uuid4,
        editable=False
    )
    author = models.ForeignKey(
        User,
        blank=False,
        null=False,
        related_name='author_messages',
        on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(User, null=False, blank=False, related_name='sender_messages', on_delete=models.CASCADE)
    property = models.ForeignKey('data.Property', blank=False, null=False, related_name='property_messages', on_delete=models.CASCADE)
    content = models.TextField(validators=[validate_message_content])
    created_at = models.DateTimeField(auto_now_add=True, blank=True)