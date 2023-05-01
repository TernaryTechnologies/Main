class DebugAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION", "None")
        print("Auth header:", auth_header)
        response = self.get_response(request)
        return response
