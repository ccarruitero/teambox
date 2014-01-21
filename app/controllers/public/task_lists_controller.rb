# -*- encoding : utf-8 -*-
class Public::TaskListsController < Public::PublicController

  def index
    @public_task_lists = @project.task_lists

    respond_to do |f|
      f.rss { render layout: false }
      f.html
    end
  end

  def show
    @public_task_list = @project.task_lists.find(params[:id])
  end
end
