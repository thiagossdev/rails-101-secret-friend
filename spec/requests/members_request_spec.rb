require 'rails_helper'

RSpec.describe "Members", type: :request do

  describe "GET /create" do
    it "returns http success" do
      get "/members/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/members/destroy"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/members/update"
      expect(response).to have_http_status(:success)
    end
  end

end
