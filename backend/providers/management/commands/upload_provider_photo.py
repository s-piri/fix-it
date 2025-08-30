from django.core.management.base import BaseCommand
from django.core.files import File
from providers.models import Provider
import os

class Command(BaseCommand):
    help = 'Upload a profile picture for a specific provider'

    def add_arguments(self, parser):
        parser.add_argument('provider_id', type=str, help='Provider ID to upload photo for')
        parser.add_argument('image_path', type=str, help='Path to the image file')

    def handle(self, *args, **options):
        provider_id = options['provider_id']
        image_path = options['image_path']
        
        try:
            provider = Provider.objects.get(provider_id=provider_id)
        except Provider.DoesNotExist:
            self.stdout.write(
                self.style.ERROR(f'Provider with ID {provider_id} not found')
            )
            return
        
        if not os.path.exists(image_path):
            self.stdout.write(
                self.style.ERROR(f'Image file {image_path} not found')
            )
            return
        
        # Get the filename from the path
        filename = os.path.basename(image_path)
        
        # Open and save the image
        with open(image_path, 'rb') as img_file:
            provider.profile_picture.save(filename, File(img_file), save=True)
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully uploaded {filename} for provider {provider.provider_name}')
        )
