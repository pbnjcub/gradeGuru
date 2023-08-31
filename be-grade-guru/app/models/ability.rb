# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    puts "user in ability class:"
    puts user.inspect
    raise "user is nil" unless user
    # return unless user
    if user.teacher?
      can :read, User
      # can :read, Unit, teacher_id: user.id
      can :manage, [Feedback, Unit, Skill, Grade]
      can :read, [Student, Family, Parent, Teacher]
      # can :index_students, User, id: user.id
    elsif user.admin?
      can :manage, :all
    elsif user.student?
      can :read, User, id: user.id
      can :read, Unit
      can :read, Skill
      can :read, Feedback, student_id: user.id
      can :read, Grade, student_id: user.id      
    elsif user.parent?
      can :read, User
      can :read, Unit
      can :read, Skill
      can :read, Feedback
      can :read, Grade
    end
  end
end

    
   


   # Define abilities for the user here. For example:
    #
    #   return unless user.present?
    #   can :read, :all
    #   return unless user.admin?
    #   can :manage, :all
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, published: true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/blob/develop/docs/define_check_abilities.md