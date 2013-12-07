# -*- encoding : utf-8 -*-
class Public::TaskListsController < Public::PublicController

  def index
    if @project.public?
      @public_task_lists = @project.task_lists
    end

    respond_to do |f|
      f.rss { render layout: false }
      f.html
    end
  end
end
