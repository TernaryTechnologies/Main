from django.test    import SimpleTestCase
from django.urls    import reverse, resolve
from frontend.views import *

class TestUrls(SimpleTestCase):
        
    def test_index_is_resolved(self):
        url = reverse('index')
        print(resolve(url))
        
    def test_create_url_is_resolved(self):
        url = reverse('create')
        print(resolve(url))
        
    def test_test_isresolved(self):
        url = reverse('test')
        print(resolve(url))
        
# tutorial used: https://www.youtube.com/watch?v=0MrgsYswT1c
# to test, run command "python manage.py test"