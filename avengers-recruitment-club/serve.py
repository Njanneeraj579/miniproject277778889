"""
Avengers Club Recruitment Portal - Local Development & Preview Server
Run this script to launch the local web server:
    python serve.py
Then open http://localhost:8000 in your browser.
"""

import http.server
import socketserver
import os
import webbrowser

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable caching and CORS headers for smooth local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("=" * 70)
        print("  AVENGERS CLUB // CAMPUS RECRUITMENT EXPERIENCE")
        print("  S.H.I.E.L.D. Command Center Server Active")
        print(f"  Local URL: http://localhost:{PORT}")
        print("=" * 70)
        try:
            webbrowser.open(f"http://localhost:{PORT}")
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server. Transmission ended.")
