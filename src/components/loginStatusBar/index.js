import React from 'react';
import { HeartFill } from 'react-bootstrap-icons';
import LoginButton from '../loginButton';
import LogoutButton from '../logoutButton';

class LoginStatusBar extends React.Component {
    render() {
        const { authState } = this.props;
        return (
            <div className='shadow sticky-top bg-white'>
                <div className='container d-flex flex-row justify-content-between align-items-center'>
                    {authState.isAuthenticated &&
                        <button className='btn btn-danger'>
                            <HeartFill />
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