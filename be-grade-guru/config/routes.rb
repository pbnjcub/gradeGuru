Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # resources :teachers do
  #   get 'students', on: :member
  # end

  resources :users, only: [:index, :update]


  # resources :feedbacks
  patch '/teachers/:teacher_id/students/:student_id/feedbacks/:id', to: 'feedbacks#update'
  get '/teachers/:id', to: 'teachers#get_students'
  post '/login', to: 'sessions#create'
  get '/current-user', to: 'users#get_current_user'
  post '/signup', to: 'users#create'
  delete '/logout', to: 'sessions#destroy'

  resources :teachers, only: [] do
    resources :students, only: [:show] 
  end
end
