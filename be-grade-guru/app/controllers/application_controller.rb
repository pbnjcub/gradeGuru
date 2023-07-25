class ApplicationController < ActionController::Base
    include ActionController::Cookies
    protect_from_forgery with: :null_session, if: ->{request.format.json?}
    include CanCan::ControllerAdditions
    rescue_from CanCan::AccessDenied, with: :render_unauthorized
    before_action :inspect_session_data
    
    def inspect_session_data
        puts "is the user logged in? #{session[:user_id] ? "yes" : "no"}}"
        puts "User data: #{User.find_by(id: session[:user_id])}"
    end
    
    def login_user
        session[:user_id] = @user.id
    end

    def logged_in?
        !!session[:user_id]
    end

    def current_user
        @current_user ||= User.find_by(id: session[:user_id])
    end
end
