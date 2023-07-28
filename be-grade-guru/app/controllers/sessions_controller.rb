class SessionsController < ApplicationController
  skip_before_action :confirm_authentication, only: [:create]
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]
  #login - creating a new session, not user.
  def create
    @user = User.find_by(email: params[:email].downcase)
    # If the user exists AND the password entered is correct.
    if @user && @user.authenticate(params[:password])
      # Save the user id inside the browser cookie.
      login_user
      render json: @user, status: :ok
    #   redirect_to '/home'
    else
        render json: { error: 'Invalid email or password.' }, status: 400
    end
  end

  def destroy
    session.clear
  end
end 