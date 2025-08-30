from django.core.management.base import BaseCommand
from django.core.files import File
from providers.models import Provider
import os

class Command(BaseCommand):
    help = 'Upload 4 photos and distribute them across all mock providers'

    def add_arguments(self, parser):
        parser.add_argument('photo1', type=str, help='Path to the first photo')
        parser.add_argument('photo2', type=str, help='Path to the second photo')
        parser.add_argument('photo3', type=str, help='Path to the third photo')
        parser.add_argument('photo4', type=str, help='Path to the fourth photo')

    def handle(self, *args, **options):
        photo_paths = [
            options['photo1'],
            options['photo2'],
            options['photo3'],
            options['photo4']
        ]
        
        # Validate all photo paths exist
        for i, photo_path in enumerate(photo_paths, 1):
            if not os.path.exists(photo_path):
                self.stdout.write(
                    self.style.ERROR(f'Photo {i} not found: {photo_path}')
                )
                return
        
        # Get all providers
        providers = Provider.objects.all().order_by('provider_id')
        
        if not providers.exists():
            self.stdout.write(
                self.style.ERROR('No providers found. Please run populate_providers first.')
            )
            return
        
        self.stdout.write(f'Found {providers.count()} providers')
        
        # Distribute photos across providers
        for i, provider in enumerate(providers):
            # Cycle through the 4 photos
            photo_index = i % 4
            photo_path = photo_paths[photo_index]
            
            # Get filename and create a unique name for this provider
            original_filename = os.path.basename(photo_path)
            name, ext = os.path.splitext(original_filename)
            unique_filename = f"{provider.provider_id}_{name}{ext}"
            
            # Upload the photo
            with open(photo_path, 'rb') as img_file:
                provider.profile_picture.save(unique_filename, File(img_file), save=True)
            
            self.stdout.write(
                self.style.SUCCESS(f'Uploaded {original_filename} as {unique_filename} for {provider.provider_name} ({provider.provider_id})')
            )
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully uploaded photos to all {providers.count()} providers!')
        )
