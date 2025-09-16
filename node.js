import com.sun.net.httpserver.HttpServer;
  import com.sun.net.httpserver.HttpHandler;
  import com.sun.net.httpserver.HttpExchange;
  import java.io.IOException;
  import java.io.OutputStream;
  import java.net.InetSocketAddress;

  public class HelloServer {
    public static void main(String[] args) throws IOException {
      HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
      server.createContext("/api/contact", new ContactHandler());
      server.setExecutor(null);
      server.start();
      System.out.println("Server started at http://localhost:8080");
    }
  }

  class ContactHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange t) throws IOException {
      if(!"POST".equals(t.getRequestMethod())){
        t.sendResponseHeaders(405, -1); return;
      }
      // read body, parse JSON, save or email
      String response = "ok";
      t.sendResponseHeaders(200, response.length());
      OutputStream os = t.getResponseBody();
      os.write(response.getBytes());
      os.close();
    }
  }