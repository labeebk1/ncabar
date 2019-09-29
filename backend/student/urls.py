from django.urls import path, include
from rest_framework.routers import DefaultRouter
from student import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'student', views.StudentViewSet)
router.register(r'course', views.CourseViewSet)
router.register(r'courseenrollment', views.CourseEnrollmentViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]