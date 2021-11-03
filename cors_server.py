# !/usr/bin/env python3
# from http.server import HTTPServer, SimpleHTTPRequestHandler, test, ThreadingHTTPServer
import sys
import socketserver

# class CORSRequestHandler (SimpleHTTPRequestHandler):
    # def end_headers (self):
        # self.send_header('Access-Control-Allow-Origin', '*')
        # SimpleHTTPRequestHandler.end_headers(self)

# if __name__ == '__main__':
    #test(CORSRequestHandler, HTTPServer, port=int(sys.argv[1]) if len(sys.argv) > 1 else 8000)
    # PORT=int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    
    # handler_cors = CORSRequestHandler
    
    # my_server = socketserver.TCPServer(("", PORT), handler_cors)


    # Star the server
    # my_server.serve_forever()


from threading import Thread
from socketserver import ThreadingMixIn
from http.server import HTTPServer, BaseHTTPRequestHandler, SimpleHTTPRequestHandler

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

class ThreadingHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

def serve_on_port(port):
    print('serve in port: %d' % port)
    server = ThreadingHTTPServer(("localhost",port), CORSRequestHandler)
    server.serve_forever()

Thread(target=serve_on_port, args=[8000]).start()
#serve_on_port(8000)