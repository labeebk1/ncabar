from django.db import models
from django.contrib.auth.models import User

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    number_of_posts = models.IntegerField(default=0)

class Course(models.Model):
    name = models.CharField(max_length=100)

class CourseEnrollment(models.Model):
    student = models.ForeignKey(User, on_delete=models.PROTECT)
    course = models.ForeignKey(Course, on_delete=models.PROTECT)
    expiry_date = models.DateField()
    enrolled = models.IntegerField(default=0)
