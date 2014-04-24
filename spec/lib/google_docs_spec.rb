# -*- encoding : utf-8 -*-
require 'spec_helper'

describe GoogleDocs do
  let(:consumer) { OAuth::Consumer.new('key', 'secret', GoogleDocs::RESOURCES) }
  let(:docs)     { GoogleDocs.new("key", "secret", consumer) }

  before :each do
    stub_request(:get,  GoogleDocs::RESOURCES[:list]).to_return(status: 200, body: File.open("#{Rails.root}/spec/fixtures/google_docs_response.atom").read)
    stub_request(:post, GoogleDocs::RESOURCES[:create]).to_return(status: 201, body: File.open("#{Rails.root}/spec/fixtures/google_docs_response.atom").read)
    stub_request(:post, GoogleDocs::RESOURCES[:authorize_url]).to_return(status: 201, body: '')
  end

  describe "when creating a new entry" do
    it "should generate a valid atom entry when sent generate atom" do
      atom_entry = docs.send(:generate_atom, "example document", "document")

      document = Nokogiri::XML(atom_entry)
      namespace = {"atom" => "http://www.w3.org/2005/Atom"}
      entry = document.xpath("//atom:entry", namespace).first
      entry.xpath("./atom:category", namespace).first["scheme"].should == "http://schemas.google.com/g/2005#kind"
      entry.xpath("./atom:category", namespace).first["term"].should == "http://schemas.google.com/docs/2007#document"
      entry.xpath("./atom:title", namespace).first.text.should == "example document"
    end

    it "should require a title and document_type" do
      lambda do
        docs.create()
      end.should raise_error(ArgumentError)
    end

    it "should not raise an error when passed a title and document_type" do
      options = HashWithIndifferentAccess.new('title' => 'test', 'document_type' => 'spreadsheet')
      lambda do
        docs.create(options)
      end.should_not raise_error
    end
  end

  describe "when modifying an ACL entry" do
    it "should generate a valid atom entry when sent generate acl atom" do
      atom_entry = docs.send(:generate_acl_atom, 'new_writer@example.com', 'user', :writer)

      document = Nokogiri::XML(atom_entry)
      namespace = {"atom" =>"http://www.w3.org/2005/Atom", "gAcl" => "http://schemas.google.com/acl/2007"}
      entry = document.xpath("//atom:entry", namespace).first
      entry.xpath("./gAcl:role", namespace).first["value"].should == "writer"
      entry.xpath("./gAcl:scope", namespace).first["type"].should == "user"
      entry.xpath("./gAcl:scope", namespace).first["value"].should == "new_writer@example.com"
    end

    it "should accept valid google role values" do
      [:writer, :reader, :owner].each do |role|
        lambda do
          atom_entry = docs.add_permission(GoogleDocs::RESOURCES[:authorize_url], 'new_writer@example.com', :user, role)
        end.should_not raise_error
      end
    end

    it "should reject invalid google role values" do
      lambda do
        atom_entry = docs.add_permission(GoogleDocs::RESOURCES[:authorize_url], 'new_writer@example.com', :user, :fuuuu)
      end.should raise_error(ArgumentError)
    end

    it "should accept valid google scope values" do
      [:user, :group, :domain, :default].each do |scope|
        lambda do
          atom_entry = docs.add_permission(GoogleDocs::RESOURCES[:authorize_url], 'new_writer@example.com', scope, :reader)
        end.should_not raise_error
      end
    end

    it "should reject invalid google scope values" do
      lambda do
        atom_entry = docs.add_permission(GoogleDocs::RESOURCES[:authorize_url], 'new_writer@example.com', :fuuuu, :reader)
      end.should raise_error(ArgumentError)
    end
  end

  it "should parse an atom_entry correctly when sent #parse_entry" do
    atom = File.read(File.expand_path(File.join(File.dirname(__FILE__), '..', 'fixtures', 'google_docs_response.atom')))
    list = docs.send(:parse_list, atom)

    list.class.name.should == "Array"
    entry = list.first
    entry[:document_id].should == "0AtkQLCU4Kem5sZy1WdXc"
    entry[:document_type].should == "spreadsheet"
    entry[:url].should == "https://spreadsheets.google.com/ccc?key=0AtkQLCU4Kem5sZy1WdXc&hl=en"
    entry[:edit_url].should == "https://docs.google.com/feeds/default/private/full/folder%3A0B9kQLCiMjI4N2Y2/contents/spreadsheet%3A0AtkQLCU4Kem5sZy1WdXc"
    entry[:acl_url].should == "https://docs.google.com/feeds/default/private/full/spreadsheet%3A0AtkQLCU4Kem5sZy1WdXc/acl"
  end
end
