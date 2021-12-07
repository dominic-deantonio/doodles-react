import React from 'react';
import { getFormattedDate3, getHandoffLink } from '../../services/doodleApi';
import Heart from "react-heart";
import { saveFavorite } from '../../services/api';

class Doodle extends React.Component {

    state = {
        isFavorite: this.props.doodle.isFavorite
    }

    setFavorite = async () => {
        const success = await saveFavorite(this.props);
        if (success) {
            if (this.props.doodle.isFavorite) {
                if (this.props.showFavorites) {
                    await this.props.showFavorites();
                } else {
                    this.setState({ isFavorite: false });
                }
                this.props.doodle.isFavorite = false;
            } else {
                this.props.doodle.isFavorite = true;
                this.setState({ isFavorite: true });
            }

        } else {
            console.log('Saving favorite failed');
        }
    }

    render() {
        const { authState, doodle } = this.props;
        return (
            <div className="card m-2 shadow-lg" style={{ width: "18rem" }}>
                <img className="card-img-top" src={doodle.url} alt="Card cap" />
                <div className="d-flex align-items-end justify-content-center card-body">
                    <div className="w-100 d-flex flex-column align-items-center">
                        <h5 className="text-center card-title">{doodle.title}</h5>
                        <p className="text-center card-text">{getFormattedDate3(doodle.run_date_array)}</p>
                        <div className="d-flex justify-content-center align-items-center">
                            <a href={getHandoffLink(doodle.name)} target='_blank' rel="noreferrer">
                                <button className='btn btn-primary'>What in the doodle?</button>
                            </a>
                            {authState.isAuthenticated &&
                                <div className='m-2' style={{ width: "1.8rem" }}>
                                    <Heart isActive={this.state.isFavorite} onClick={this.setFavorite} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Doodle;