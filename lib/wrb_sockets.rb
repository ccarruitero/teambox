require 'socket'
require 'websocket/drivier'
require 'rack'
require 'json'

module WrbSockets

  RECV_SIZE = 1024

  HOST = 'localhost'

  def initialize(port = nil)
    @server = start_server port
  end

  def start_server port
    Socket::TCPServer.open(HOST, port || 0) # maybe can remove first word
  end

  def port
    server.addr[1]
  end

  def handle(socket)
    env = ENV['RAILS_ENV']
    #req = Rack::Request.new(env)
    # check connection is secure and redirect to ssl
    # secure = req.ssl?
    # @scheme = secure ? 'wss:' : 'ws:'

    @scheme = 'wss:'
    #puts req.host_with_port
    # @url = @scheme + '//' + req.host_with_port #env['HTTP_HOST'] + env['REQUEST_URI']
    @driver = WebSocket::Driver.server(socket)
    @clients = []

    @driver.on(:connect) do
    # in README says connect but in code only exists open
      @driver.start
      @clients << @driver
    end

    @driver.on(:message) do
      if e.type == 'comment' do
        puts 'comment received'
        conversation = Conversation.find(e.conversation_id)
        @driver.text(e.message)
        response = {type: 'update', comments: conversation.comments.to_json}
      end
    end

    @driver.on(:close) do
      puts 'connection with socket are closed'
    end

    loop do
      IO.select([socket], [], [], 30) or raise Errno::EWOULDBLOCK
      data = socket.recv(RECV_SIZE)
      break if data.empty?
      driver.parse data
    end
  end

  def listen
    loop do
      client = server.accept
      puts "Accepted connection from #{client.addr[2]}"
      Thread.new { handle client }
    end
  end

  def force_ssl
  end

  def receive_data(data)
    @driver.parse(data)
  end

  def write(data)
    @driver.write(data)
  end
end

WrbSocketServer = WrbSockets.new
# WrbSocketServer::HOST = 'mydomain.something'
WrbSocketServer.listen
