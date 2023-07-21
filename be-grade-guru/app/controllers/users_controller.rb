class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def create
        @user = User.new(user_params)
        authorize! :create, @user

        if @user.save
            login_user
            render json: @user, status: :created
        else
            render json: { error: 'Not authorized.' }, status: 400
        end
    end

    

end
