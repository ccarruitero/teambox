# -*- encoding : utf-8 -*-
When /^(?:|I )fill in the comment box with "([^\"]*)"(?: within "([^\"]*)")?$/ do |value, selector|
  with_scope(selector) do
    find(:xpath, '//textarea[contains(@name, \'[body]\')]').set(value)
  end
end

When /^I fill in the comment box with line breaks$/ do
  text = "Text with\na break"
  find(:xpath, '//textarea[contains(@name, \'[body]\')]').set(text)
end

When /^I fill in the comment box with underscored words and links$/ do
  text = "_Text_ with an underscored_long_word and a link:\nhttp://crewmate.org or an email: jordi@crewmate.org"
  find(:xpath, '//textarea[contains(@name, \'[body]\')]').set(text)
end
