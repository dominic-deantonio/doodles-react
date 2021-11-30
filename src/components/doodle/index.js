import React from 'react';
import { getFormattedDate, getHandoffLink } from '../../services';

class Doodle extends React.Component {

    changeColor = () => {
        console.log("Change color here");
    }

    render() {
        return (
            <div className="card m-2 shadow-lg" style={{ width: "18rem" }}>
                <img className="card-img-top" src={this.props.url} alt="Card cap" />
                <div className="d-flex align-items-end justify-content-center card-body">
                    <div className="w-100 d-flex flex-column align-items-center">
                        <h5 className="text-center card-title">{this.props.title}</h5>
                        <p className="text-center card-text">{getFormattedDate(this.props.selectedDate, this.props.run_date_array)}</p>
                        <div className="d-flex justify-content-center">
                            <a href={getHandoffLink(this.props.name)} target='_blank' rel="noreferrer">
                                <button className='btn btn-primary' onMouseEnter={this.changeColor}>What in the doodle?</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Doodle;