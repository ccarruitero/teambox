# -*- encoding : utf-8 -*-
require 'spec_helper'

describe Public::TaskListsController do
  render_views

  before do
    @project = Factory(:project, public: true)
    @user = Factory(:mislav)
    @task_list = Factory(:task_list, project: @project, user: @user)
  end

  describe '#index' do
    it 'should show task lists in public project' do
      get :index, format: 'rss',  project_id: @project.permalink
      response.should be_success
      response.should render_template('public/task_lists/index')
      response.content_type.should eq('application/rss+xml')
    end
  end

  describe '#show' do
    it 'should show task list' do
      get :show, project_id: @project.permalink, id: @task_list.id
      response.should be_success
      response.should have_selector 'title', content: @task_list.name
    end
  end
end
