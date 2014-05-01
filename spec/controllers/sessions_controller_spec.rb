# -*- encoding : utf-8 -*-
require File.dirname(__FILE__) + '/../spec_helper'

describe SessionsController do

  route_matches("/login", :get, controller: "sessions", action: "new")
  route_matches("/logout", :delete, controller: "sessions", action: "destroy")
  route_matches("/session", :post, controller: "sessions", action: "create")
  route_matches("/format/m", :post, controller: "sessions", action: "change_format", f: "m")

  subject { response }
  let(:user) { Factory(:confirmed_user, password: 'dragons') }
  let(:format) { 'html' }

  describe 'sessions#new' do
    before do
      get :new, format: format
    end

    it { should render_template('sessions/new') }

    context 'when logged in' do
      before do
        login_as user
        get :new, format: format
      end
      it { should redirect_to(root_path) }

      context 'for mobile views' do
        let(:format) { 'm' }

        it { should redirect_to(activities_path) }
      end
    end
  end

  describe 'sessions#create' do
    let(:user_params) { {login: user.login, password: 'dragons', format: format } }
    before do
      post :create, user_params
    end

    it { should redirect_to(root_path) }

    context 'invalid credentials' do
      let(:user_params) { { login: 'invalid', password: 'invalid', format: format }}

      it { should render_template('sessions/new') }
      it 'remembers entered username' do
        assigns(:login).should eql('invalid')
      end
    end

    pending 'test app_link'
  end

  describe 'sessions#destroy' do

    context 'when logged in' do
      before do
        login_as user
        # session[:user_id].should eql(user.id) # sanity check
        delete :destroy
      end

      it 'deletes user session' do
        session[:user_id].should be_nil
      end
      it { should redirect_to(root_path) }
    end

  end

  describe 'session#change_format' do
    before do
      session[:format] = 'html'
    end

    it 'changes format to allowed one' do
      expect {
        get :change_format, f: 'm'
      }.to change{ session[:format] }.from('html').to('m')
    end

    it 'does not change format to unknown one' do
      expect {
        get :change_format, f: 'wat'
      }.to_not change{ session[:format] }.from('html')
    end
  end
end

