class ApplicationController < ActionController::Base
    include ActionController::Cookies
    before_action :current_user
    before_action :confirm_authentication
    protect_from_forgery with: :null_session, if: ->{request.format.json?}
    include CanCan::ControllerAdditions
    rescue_from CanCan::AccessDenied, with: :render_unauthorized

    
    def login_user
        session[:user_id] = @user.id
        puts "session[:user_id] = #{session[:user_id]}"
    end

    def logged_in?
        !!session[:user_id]
    end

    def current_user
        @current_user ||= User.find_by(id: session[:user_id])
    end

    def render_unauthorized(exception)
        respond_to do |format|
          format.json { render json: { error: 'Unauthorized' }, status: :unauthorized }
          format.html { redirect_to root_path, alert: exception.message }
        end
    end
      
    def confirm_authentication
        unless session[:user_id]
            render json: {error: "You must be logged in to do that."}, status: :unauthorized
            return
        end
        @current_user ||= User.find_by(id: session[:user_id])
    end
    
end
