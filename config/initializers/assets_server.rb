AssetsServer = Sprockets::Environment.new(Rails.root) do |env|
  assets =  ["javascripts", "stylesheets", "images", "fonts"]
  paths =   ["app/assets/", "lib/assets/", "vendor/assets/" ].map{|path| assets.map{|folder| "#{path}#{folder}" } }.flatten
 
  paths.each{ |path| env.append_path path }
end
