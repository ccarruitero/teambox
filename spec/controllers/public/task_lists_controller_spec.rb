# -*- encoding : utf-8 -*-
require 'spec_helper'

describe Public::TaskListsController do

  before do
    @project = Factory(:project, public: true)
    @user = Factory(:mislav)
    @task_list = Factory(:task_list, project: @project, user: @user)
  end

  describe '#index' do
    it 'should show task lists in the project' do
      get :index, project_id: @project.permalink
      response.should be_success
    end
  end

  describe '#show' do
    it 'should show task list' do
      get :show, project_id: @project.permalink, id: @task_list.id
      response.should be_success
    end
  end
end
