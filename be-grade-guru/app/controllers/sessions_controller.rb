class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(email: params[:email].downcase)
    # If the user exists AND the password entered is correct.
    if @user && @user.authenticate(params[:password])
      # Save the user id inside the browser cookie.
      login_user
      render json: @user, status: :ok
    #   redirect_to '/home'
    else
    # If user's login doesn't work, send them back to the login form.
    #   redirect_to '/login'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/home'
  end
end 