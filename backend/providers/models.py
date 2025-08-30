from django.db import models

class Provider(models.Model):
    JOB_TYPES = [
        ('plumbing', 'Plumbing'),
        ('electrical', 'Electrical'),
        ('handyman', 'Handyman'),
        ('mechanic', 'Mechanic'),
        ('locksmith', 'Locksmith'),
        ('carpenter', 'Carpenter')
    ]
    
    provider_id = models.CharField(max_length=50, unique=True)
    provider_name = models.CharField(max_length=200)
    job_type = models.CharField(max_length=50, choices=JOB_TYPES)
    eta = models.CharField(max_length=100)  # Estimated time of arrival
    hourly_rate = models.DecimalField(max_digits=8, decimal_places=2)
    is_available = models.BooleanField(default=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    
    def __str__(self):
        return f"{self.provider_name} - {self.job_type}"
    
    class Meta:
        ordering = ['-rating', 'provider_name']
