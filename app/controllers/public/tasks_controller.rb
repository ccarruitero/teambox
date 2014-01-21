# -*- encoding : utf-8 -*-
class Public::TasksController < Public::PublicController
  before_filter :load_public_task

  def show
  end

  private

  def load_public_task
    @public_task = @project.tasks.find params[:id]
  end
end
