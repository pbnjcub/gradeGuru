class ApplicationController < ActionController::Base
    def current_user
        @current_user ||= User.find_by(id: session[:user_id])
    end

    def login_user
        session[:user_id] = @user.id
    end

    def logged_in?
        !!session[:user_id]
    end
end
