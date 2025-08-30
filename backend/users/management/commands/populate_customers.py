from django.core.management.base import BaseCommand
from users.models import Client

class Command(BaseCommand):
    help = 'Populate database with mock client data'

    def handle(self, *args, **options):
        # Clear existing clients
        Client.objects.filter(username__startswith='client_').delete()
        
        # Mock client data
        clients_data = [
            {
                'username': 'client_john',
                'password': 'password123',
                'email': 'john.smith@email.com',
                'first_name': 'John',
                'last_name': 'Smith',
                'customer_id': 'CUST001',
                'phone': '+1-555-0101',
                'address': '123 Main St, New York, NY 10001'
            },
            {
                'username': 'client_sarah',
                'password': 'password123',
                'email': 'sarah.johnson@email.com',
                'first_name': 'Sarah',
                'last_name': 'Johnson',
                'customer_id': 'CUST002',
                'phone': '+1-555-0102',
                'address': '456 Oak Ave, Los Angeles, CA 90210'
            },
            {
                'username': 'client_mike',
                'password': 'password123',
                'email': 'mike.davis@email.com',
                'first_name': 'Mike',
                'last_name': 'Davis',
                'customer_id': 'CUST003',
                'phone': '+1-555-0103',
                'address': '789 Business Blvd, Chicago, IL 60601'
            },
            {
                'username': 'client_emily',
                'password': 'password123',
                'email': 'emily.wilson@email.com',
                'first_name': 'Emily',
                'last_name': 'Wilson',
                'customer_id': 'CUST004',
                'phone': '+1-555-0104',
                'address': '321 Premium Lane, Houston, TX 77001'
            },
            {
                'username': 'client_david',
                'password': 'password123',
                'email': 'david.brown@email.com',
                'first_name': 'David',
                'last_name': 'Brown',
                'customer_id': 'CUST005',
                'phone': '+1-555-0105',
                'address': '654 Desert Rd, Phoenix, AZ 85001'
            },
            {
                'username': 'client_lisa',
                'password': 'password123',
                'email': 'lisa.garcia@email.com',
                'first_name': 'Lisa',
                'last_name': 'Garcia',
                'customer_id': 'CUST006',
                'phone': '+1-555-0106',
                'address': '987 City Center, Philadelphia, PA 19101'
            },
            {
                'username': 'client_robert',
                'password': 'password123',
                'email': 'robert.martinez@email.com',
                'first_name': 'Robert',
                'last_name': 'Martinez',
                'customer_id': 'CUST007',
                'phone': '+1-555-0107',
                'address': '147 Texas Way, San Antonio, TX 78201'
            },
            {
                'username': 'client_jennifer',
                'password': 'password123',
                'email': 'jennifer.taylor@email.com',
                'first_name': 'Jennifer',
                'last_name': 'Taylor',
                'customer_id': 'CUST008',
                'phone': '+1-555-0108',
                'address': '258 Beach Blvd, San Diego, CA 92101'
            },
            {
                'username': 'client_michael',
                'password': 'password123',
                'email': 'michael.anderson@email.com',
                'first_name': 'Michael',
                'last_name': 'Anderson',
                'customer_id': 'CUST009',
                'phone': '+1-555-0109',
                'address': '369 Big D Drive, Dallas, TX 75201'
            },
            {
                'username': 'client_amanda',
                'password': 'password123',
                'email': 'amanda.thomas@email.com',
                'first_name': 'Amanda',
                'last_name': 'Thomas',
                'customer_id': 'CUST010',
                'phone': '+1-555-0110',
                'address': '741 Tech Street, San Jose, CA 95101'
            }
        ]
        
        # Create clients
        for data in clients_data:
            Client.objects.create_user(
                username=data['username'],
                password=data['password'],
                email=data['email'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                customer_id=data['customer_id'],
                phone=data['phone'],
                address=data['address']
            )
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {len(clients_data)} clients')
        )
