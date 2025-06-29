#!/usr/bin/env python3
import requests
import unittest
import json
import os
import sys
from datetime import datetime

# Get the backend URL from the frontend .env file
def get_backend_url():
    with open('/app/frontend/.env', 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                return line.strip().split('=')[1].strip('"\'')
    raise ValueError("Could not find REACT_APP_BACKEND_URL in frontend/.env")

BACKEND_URL = get_backend_url()
API_BASE_URL = f"{BACKEND_URL}/api"

print(f"Testing backend API at: {API_BASE_URL}")

class TestBackendAPI(unittest.TestCase):
    """Test suite for the personal website backend API"""

    def test_api_root(self):
        """Test the /api/ endpoint"""
        response = requests.get(f"{API_BASE_URL}/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("message", data)
        self.assertIn("version", data)
        self.assertIn("status", data)
        self.assertEqual(data["status"], "active")
        
        # Note: CORS headers might be handled by the proxy in production
        # so we're not strictly checking for them in this test

    def test_health_endpoint(self):
        """Test the /api/health endpoint"""
        response = requests.get(f"{API_BASE_URL}/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("status", data)
        self.assertIn("timestamp", data)
        self.assertIn("database", data)
        self.assertEqual(data["status"], "healthy")
        self.assertEqual(data["database"], "connected")

class TestContactAPI(unittest.TestCase):
    """Test suite for the contact form API endpoints"""
    
    def test_contact_form_submission(self):
        """Test the /api/contact POST endpoint"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Testing Contact Form",
            "message": "This is a test message from the contact form."
        }
        
        response = requests.post(f"{API_BASE_URL}/contact", json=contact_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("success", data)
        self.assertIn("message", data)
        self.assertIn("id", data)
        self.assertTrue(data["success"])
        
        # Store the ID for later retrieval test
        self.contact_id = data["id"]
        
        return self.contact_id
    
    def test_contact_messages_retrieval(self):
        """Test the /api/contact/messages GET endpoint"""
        # First submit a contact form to ensure there's data
        contact_id = self.test_contact_form_submission()
        
        # Now retrieve the messages
        response = requests.get(f"{API_BASE_URL}/contact/messages")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        
        # Verify our submitted message is in the list
        found = False
        for message in data:
            if message.get("id") == contact_id:
                found = True
                self.assertEqual(message["name"], "Test User")
                self.assertEqual(message["email"], "test@example.com")
                self.assertEqual(message["subject"], "Testing Contact Form")
                break
        
        self.assertTrue(found, "Submitted contact message not found in retrieved messages")

class TestBlogAPI(unittest.TestCase):
    """Test suite for the blog API endpoints"""
    
    def test_blog_posts_endpoint(self):
        """Test the /api/blog/posts GET endpoint"""
        response = requests.get(f"{API_BASE_URL}/blog/posts")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("message", data)
        self.assertIn("migration_ready", data)
        self.assertTrue(data["migration_ready"])

class TestAnalyticsAndNewsletterAPI(unittest.TestCase):
    """Test suite for analytics and newsletter API endpoints"""
    
    def test_analytics_event_tracking(self):
        """Test the /api/analytics/event POST endpoint"""
        event_data = {
            "event": "page_view",
            "page": "/blog",
            "user_agent": "test"
        }
        
        response = requests.post(f"{API_BASE_URL}/analytics/event", json=event_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("success", data)
        self.assertIn("message", data)
        self.assertTrue(data["success"])
    
    def test_newsletter_subscription(self):
        """Test the /api/newsletter/subscribe POST endpoint"""
        email_data = {
            "email": "newsletter@test.com"
        }
        
        response = requests.post(f"{API_BASE_URL}/newsletter/subscribe", json=email_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("success", data)
        self.assertIn("message", data)
        self.assertTrue(data["success"])
    
    def test_newsletter_subscription_error(self):
        """Test error handling for /api/newsletter/subscribe POST endpoint"""
        # Missing email should return an error
        email_data = {}
        
        response = requests.post(f"{API_BASE_URL}/newsletter/subscribe", json=email_data)
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertIn("detail", data)

def run_tests():
    """Run all the test cases"""
    # Create a test suite
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    # Add test cases
    suite.addTests(loader.loadTestsFromTestCase(TestBackendAPI))
    suite.addTests(loader.loadTestsFromTestCase(TestContactAPI))
    suite.addTests(loader.loadTestsFromTestCase(TestBlogAPI))
    suite.addTests(loader.loadTestsFromTestCase(TestAnalyticsAndNewsletterAPI))
    
    # Run the tests
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    return result

if __name__ == "__main__":
    result = run_tests()
    
    # Exit with non-zero code if tests failed
    if not result.wasSuccessful():
        sys.exit(1)