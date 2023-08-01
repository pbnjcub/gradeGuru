class SessionsController < ApplicationController
  skip_before_action :confirm_authentication, only: [:create]
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]
  
  def create
    @user = User.find_by(email: params[:email].downcase)
    if @user && @user.authenticate(params[:password])
      login_user
      render json: @user, status: :ok
    else
        render json: { error: 'Invalid email or password.' }, status: 400
    end
  end

  def destroy
    session.clear
  end
end 