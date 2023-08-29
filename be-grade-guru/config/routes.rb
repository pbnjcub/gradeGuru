Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # resources :teachers do
  #   get 'students', on: :member
  # end


  get '/parents/:id', to: 'parents#show'
  get '/students/:id', to: 'students#get_student_data'
  post '/teachers/:teacher_id/units/create', to: 'units#create'
  patch '/teachers/:teacher_id/units/:unit_id/update', to: 'units#update'
  post '/teachers/:teacher_id/units/:unit_id/skills/create', to: 'skills#create'
  delete '/teachers/:teacher_id/units/:unit_id/skills/:skill_id/delete', to: 'skills#destroy'
  patch '/teachers/:teacher_id/units/:unit_id/skills/:skill_id/update', to: 'skills#update'
  patch '/teachers/:teacher_id/students/:student_id/grades/update', to: 'grades#update'
  patch '/teachers/:teacher_id/students/:student_id/feedbacks/:id', to: 'feedbacks#update'
  get '/teachers/:id', to: 'teachers#get_students'
  post '/login', to: 'sessions#create'
  get '/current-user', to: 'users#get_current_user'
  post '/signup', to: 'users#create'
  delete '/logout', to: 'sessions#destroy'
  delete '/users/id/delete', to: 'users#destroy'

  resources :users, only: [:index, :update]
  
  resources :teachers, only: [] do
    resources :students, only: [:show] 
  end
  resources :teachers, only: [] do
    resources :units, only: [:index, :show, :destroy]
  end
end


