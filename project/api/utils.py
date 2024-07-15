from django.http import JsonResponse
from rest_framework.status import HTTP_403_FORBIDDEN
def handler(exc, context=None):
    if exc.default_code == 'authentication_failed' or exc.default_code == 'not_authenticated':
        return JsonResponse({'error': {'code': 403, 'message': 'Login failed'}}, status=HTTP_403_FORBIDDEN)
    elif exc.default_code == 'permission_denied':
        return JsonResponse({'error': {'code': 403, 'message': 'Forbidden for you'}}, status=HTTP_403_FORBIDDEN)

