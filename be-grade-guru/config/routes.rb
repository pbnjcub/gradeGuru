Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # resources :teachers do
  #   get 'students', on: :member
  # end
  resources :teachers, only: [] do
    resources :students, only: [:show] do 
      resources :feedbacks, only: [:create, :update, :destroy]
    end
  end

  # resources :feedbacks
  get '/teachers/:id', to: 'teachers#get_students'
  post '/login', to: 'sessions#create'
  get '/current-user', to: 'users#get_current_user'
  post '/signup', to: 'users#create'
  delete '/logout', to: 'sessions#destroy'


end
