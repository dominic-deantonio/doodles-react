import React from 'react';
import { HeartFill, HouseFill } from 'react-bootstrap-icons';
import LoginButton from '../loginButton';
import LogoutButton from '../logoutButton';

class LoginStatusBar extends React.Component {
    render() {
        const { authState, getFavorites, showFavorites, goToDayView } = this.props;
        return (
            <div className='shadow sticky-top bg-white p-2'>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                    {authState.isAuthenticated &&
                        <button
                            className={`btn ${showFavorites ? 'btn-primary' : 'btn-danger'}`}
                            onClick={showFavorites ? goToDayView : getFavorites}>
                            {!showFavorites && <HeartFill />}
                            {showFavorites && <HouseFill />}
                        </button>
                    }
                    {authState.isAuthenticated &&
                        <div >
                            <LogoutButton />
                            <img
                                className='rounded-circle'
                                style={{ width: "2.5rem" }}
                                src={authState.user.picture}
                                alt='Profile'
                            />
                        </div>
                    }

                    {!authState.isAuthenticated && !authState.isLoading && <div data='This pushes loginbutton to right'></div>}
                    {!authState.isAuthenticated && !authState.isLoading && <LoginButton />}

                    {authState.isLoading && <p>Logging in...</p>}

                </div>
            </div>
        );
    }
}

export default LoginStatusBar;