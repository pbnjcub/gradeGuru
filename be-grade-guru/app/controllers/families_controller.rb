class FamiliesController < ApplicationController
    skip_before_action :verify_authenticity_token
    # skip_before_action :confirm_authentication
    load_and_authorize_resource
    
    def create
        parent_id = params[:parent_id]
        student_ids = params[:student_ids]
      
        created_families = []
      
        student_ids.each do |student_id|
          family = Family.new(student_id: student_id, parent_id: parent_id)
          if family.save
            created_families << family
          else
            render json: { errors: family.errors.full_messages }, status: :unprocessable_entity
            return
          end
        end
      
        updated_parent = User.find(parent_id)  
        updated_students = User.where(id: student_ids)  
      
        render json: { families: created_families, parent: updated_parent, students: updated_students }, status: :created
      end

      private
      
      def family_params
        params.require(:family).permit(:parent_id, student_ids: [])
      end
end
