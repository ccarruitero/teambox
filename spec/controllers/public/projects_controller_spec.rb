# -*- encoding : utf-8 -*-
require 'spec_helper'

describe Public::ProjectsController do
  render_views

  before do
    @public_project = Factory(:project, public: true)
  end

  describe '#index' do
    it 'should show all public projects' do
      get :index
      response.should be_success
    end
  end

  describe '#show' do
    it 'should show public project' do
      get :show, id: @public_project.permalink
      response.should be_success
      response.should have_selector 'title', content: @public_project.name
    end
  end
end
