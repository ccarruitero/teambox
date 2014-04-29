# -*- encoding : utf-8 -*-
require 'spec_helper'

describe Person do
  it "clears the assigned user on tasks when destroyed" do
    task = Factory :task
    person = task.project.people.first

    task.assign_to task.project.user
    task.assigned.should == person

    person.destroy

    task.reload.assigned_id.should be_nil
  end

  it "should recover the person when joining if the relation exists and is deleted" do
    project = Factory :project
    user = Factory :user
    project.add_user(user)

    person_id = project.people.find_by_user_id(user).id
    project.remove_user(user)

    project.reload.people.map(&:id).include?(person_id).should_not == true

    project.add_user(user)
    project.reload.people.map(&:id).include?(person_id).should == true
  end

  it "should be created" do
    @user = Factory(:user)
    @project1 = Factory(:project)
    @project2 = Factory(:project)
    @user.projects(true).should be_empty
    @project1.add_user(@user)
    @project2.add_user(@user)
    @user.projects(true).should include(@project1, @project2)
  end

  describe '.user_names_from_projects' do
    let!(:project1) { Factory(:project) }
    let!(:project2) { Factory(:project) }
    let!(:user1)    { project1.user }
    let!(:user2)    { project2.user }
    let!(:user3)    { Factory(:user) }

    before :each do
      project1.add_user(user3)
    end

    subject(:user_names) { Person.user_names_from_projects(project1) }

    its 'size should be 2' do
      user_names.size.should eql 2
    end

    it 'should contain user1 and user3' do
      user_names.map(&:user_id).should include(user1.id, user3.id)
    end

    it 'should not contain user2' do
      user_names.map(&:user_id).should_not include user2.id
    end

    it 'should contain project1' do
      user_names.map(&:project_id).should include project1.id
    end

    it 'should not contain project2' do
      user_names.map(&:project_id).should_not include project2.id
    end

    its 'ids should not include project2\' ids' do
      user_names.map(&:id).should_not include Person.user_names_from_projects(project2).map(&:id)
    end

    it 'should not contain project2' do
      user_names.map(&:project_id).should_not include project2.id
    end

    context 'his first result' do
      subject(:user_name) { user_names.first }
      it { should respond_to(:project_id, :login, :first_name, :last_name, :user_id, :id) }
    end

  end
end
