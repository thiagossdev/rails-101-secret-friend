class RegistrationsController < Devise::RegistrationsController
  def account_update_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password)
  end

  private
  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end