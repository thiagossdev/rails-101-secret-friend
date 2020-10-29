require 'rails_helper'

RSpec.describe MembersController, type: :controller do
  
  login_user

  before(:each) do
    request.env["HTTP_ACCEPT"] = 'application/json'

    @current_campaign = create(:campaign, user: @current_user)
  end

  describe "POST #create" do
    before(:each) do
      @member_attributes = attributes_for(:member, campaign: @current_campaign)
      post :create, params: {member: @member_attributes}
    end

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "Create member with right attributes" do
      expect(Member.last.campaign).to eql(@current_campaign)
      expect(Member.last.name).to eql(@member_attributes[:name])
      expect(Member.last.email).to eql(@member_attributes[:email])
    end
  end

  describe "DELETE #destroy" do
    context "User is the Campaign Owner" do
      it "returns http success" do
        member = create(:member, campaign: @current_campaign)
        delete :destroy, params: {id: member.id}
        expect(response).to have_http_status(:success)
      end
    end

    context "User isn't the Campaign Owner" do
      it "returns http forbidden" do
        member = create(:member)
        delete :destroy, params: {id: member.id}
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe "PUT #update" do
    before(:each) do
      @new_member_attributes = attributes_for(:member)
    end

    context "User is the Campaign Owner" do
      before(:each) do
        member = create(:member, campaign: @current_campaign)
        put :update, params: {id: member.id, member: @new_member_attributes}
      end

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "Member have the new attributes" do
        expect(Member.last.name).to eq(@new_member_attributes[:name])
        expect(Member.last.email).to eq(@new_member_attributes[:email])
      end
    end

    context "User isn't the Campaign Owner" do
      it "returns http forbidden" do
        member = create(:member)
        put :update, params: {id: member.id, member: @new_member_attributes}
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
