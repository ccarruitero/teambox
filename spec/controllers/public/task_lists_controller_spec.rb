# -*- encoding : utf-8 -*-
require 'spec_helper'

describe Public::TaskListsController do

  before do
    @project = Factory(:project, public: true)
  end

  describe '#index' do
    it 'show task lists in the project' do
      get :index, project_id: @project.name
      response.should be_success
    end
  end
end
