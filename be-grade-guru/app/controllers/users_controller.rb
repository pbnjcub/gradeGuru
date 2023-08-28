class UsersController < ApplicationController
    skip_before_action :confirm_authentication

    skip_before_action :verify_authenticity_token

    def index
        users = User.all
        render json: users
    end

    def create
      case user_params[:role]
        when 'student'
          create_student_user(user_params)
        when 'teacher', 'admin'
          create_faculty_user(user_params)
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
      

    def get_current_user
        if logged_in?
            render json: current_user, status: :ok
        else
            render json: { errors: 'There is currently no user logged in.' }, status: :unprocessable_entity
        end
    end

    def update
        user = User.find(params[:id])
        # authorize! :update, user

        if user.update(user_params)
            render json: user
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

  #   def destroy
  #     user = User.find(params[:id])
  #     if user
  #         user.destroy
  #         head :no_content
  #     else
  #         render json: {errors: "User not found"}
  #     end
  # end


    private

    def user_params
      params.require(:user).permit(:last_name, :first_name, :role, parent: [:last_name, :first_name, :email,:role])
      # params.permit(:email, :password, :password_confirmation, :last_name, :first_name, :role, parent: [:last_name, :first_name, :email, :password, :password_confirmation, :role])
    end

    def create_student_user(user_params)
      @student = User.new(user_params.except(:parent))
      
      if @student.save
        if user_params[:parent].present?
          @parent = User.new(user_params[:parent])
          if @parent.save
            @family = Family.new(parent_id: @parent.id, student_id: @student.id)
            if @family.save
              users = User.all
              render json: users, status: :created
            else
              @student.destroy
              @parent.destroy
              render json: { errors: @family.errors.full_messages }, status: :unprocessable_entity
            end
          else
            @student.destroy
            render json: { errors: @parent.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: @student, status: :created
        end
      else
        render json: { errors: @student.errors.full_messages }, status: :unprocessable_entity
      end
    end
    

    def create_faculty_user(user_params)
      @user = User.new(user_params.except(:parent))
    
      if @user.save
        users = User.all
        render json: users, status: :created
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end


end
