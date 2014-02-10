class AddNotificationsOnWeekendsToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :notify_on_weekends, :boolean, :default => false
  end

  def self.down
    remove_column :users, :notify_on_weekends
  end
end
