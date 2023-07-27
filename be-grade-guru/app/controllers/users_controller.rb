class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def index
        users = User.all
        render json: users
    end

    def create
        @user = User.new(user_params)
      
        if @user.save
          login_user
          render json: @user, status: :created
        else
          puts @user.errors.full_messages # Log the errors to the console
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end
      

    def get_current_user
        if logged_in?
            render json: current_user, status: :ok
        else
            render json: { errors: 'There is currently no user logged in.' }, status: 400
        end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :last_name, :first_name, :role)
    end
    

    

end
