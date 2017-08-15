class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def login!(user)
    @current_user = user
    session[:session_token] = user.reset_token!
    user.reset_token!
  end

  def logout!
    current_user.reset_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def logged_in?
    !!current_user
  end

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def require_logged_in!
    render json: {base: ['invalid credentials']}, status: 401 if !current_user
  end
end
