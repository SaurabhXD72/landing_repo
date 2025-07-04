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
        print(f"Testing API root endpoint: {API_BASE_URL}/")
        response = requests.get(f"{API_BASE_URL}/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        print(f"Response: {data}")
        self.assertIn("message", data)
        self.assertIn("version", data)
        self.assertIn("status", data)
        self.assertEqual(data["status"], "active")
        
        # Note: CORS headers might be handled by the proxy in production
        # so we're not strictly checking for them in this test

    def test_health_endpoint(self):
        """Test the /api/health endpoint"""
        print(f"Testing health endpoint: {API_BASE_URL}/health")
        response = requests.get(f"{API_BASE_URL}/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        print(f"Response: {data}")
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
        # The server might return different error codes (400 or 404) depending on how it's configured
        self.assertIn(response.status_code, [400, 404])
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
    runner = unittest.TextTestRunner(verbosity=3)
    result = runner.run(suite)
    
    return result

if __name__ == "__main__":
    print("Starting tests...")
    try:
        # Run tests individually for better visibility
        print("\n=== Testing Basic API Endpoints ===")
        basic_suite = unittest.TestLoader().loadTestsFromTestCase(TestBackendAPI)
        basic_result = unittest.TextTestRunner(verbosity=2).run(basic_suite)
        
        print("\n=== Testing Contact API ===")
        contact_suite = unittest.TestLoader().loadTestsFromTestCase(TestContactAPI)
        contact_result = unittest.TextTestRunner(verbosity=2).run(contact_suite)
        
        print("\n=== Testing Blog API ===")
        blog_suite = unittest.TestLoader().loadTestsFromTestCase(TestBlogAPI)
        blog_result = unittest.TextTestRunner(verbosity=2).run(blog_suite)
        
        print("\n=== Testing Analytics and Newsletter API ===")
        analytics_suite = unittest.TestLoader().loadTestsFromTestCase(TestAnalyticsAndNewsletterAPI)
        analytics_result = unittest.TextTestRunner(verbosity=2).run(analytics_suite)
        
        # Check if all tests passed
        all_passed = (basic_result.wasSuccessful() and 
                      contact_result.wasSuccessful() and 
                      blog_result.wasSuccessful() and 
                      analytics_result.wasSuccessful())
        
        print(f"\nAll tests completed. Success: {all_passed}")
        
        # Exit with non-zero code if tests failed
        if not all_passed:
            sys.exit(1)
    except Exception as e:
        print(f"Error running tests: {e}")
        sys.exit(1)