class UsersController < ApplicationController

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
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def get_current_user
        if logged_in?
            render json: current_user, status: :ok
        else
            render json: { error: 'Not authorized.' }, status: 400
        end
    end

    private

    def user_params
        params.permit(:email, :password, :first_name, :last_name, :role)
    end

    

end
