require 'json'
require 'net/http'

module Persona

  def authenticate(assertion, audience)
    server = 'https://verifier.login.persona.org/verify'
    assertion_params = {
      assertion: assertion,
      audience: audience
    }
    request = Net::HTTP::Post.new(server)
    request.set_form_data(assertion_params)
    response = Net::HTTP.start(server.hostname, server.port) do |http|
      http.use_ssl = true
      JSON.parse(http.request(request))
    end
    puts reponse

    if response['status'] == 'okay'
      response
    else
      {status: 'error'}.to_json
    end
  end
end
