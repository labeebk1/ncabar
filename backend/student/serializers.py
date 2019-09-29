from rest_framework import serializers
from student.models import *

class StudentSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()

    def get_first_name(self, student):
        return student.user.first_name
    
    def get_last_name(self, student):
        return student.user.last_name

    class Meta:
        model = Student
        fields = [
            'first_name',
            'last_name',
            'number_of_posts'
        ]
        

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'name'
        ]

class CourseEnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseEnrollment
        fields = [
            'student',
            'course',
            'expiry_date',
            'enrolled'
        ]