# -*- encoding : utf-8 -*-
require 'spec_helper'

describe Public::PagesController do

  before do
    @project = Factory(:project)
  end

  describe '#show' do
    it 'show page in the project' do
      get :show, project_id: @project.name, id: @project.page.id 
      response.should be_success
    end
  end
end
