from rest_framework import permissions

class DebugIsAuthenticated(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        print("Request user:", request.user)
        print("Request user authenticated:", request.user.is_authenticated)
        return super().has_permission(request, view)
