rss_tasks_feed do |feed|
  for task in @tasks
    feed.entry task
  end
end
