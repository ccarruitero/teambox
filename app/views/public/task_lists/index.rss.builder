xml.instruct! :xml, :version => "1.0" 
xml.rss :version => "2.0" do
  xml.channel do
    xml.title "Task Lists"

    for task_list in @public_task_lists
      xml.item do
        xml.title task_list.name
        xml.link public_project_task_list_url(@project, task_list)
      end
    end
  end
end
