import React from 'react';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { getFormattedDate2, getRfc3339Date } from '../../services/doodleApi';

class DateChanger extends React.Component {
    state = {
        shouldShowTextField: false
    }

    showTextField = (shouldHover) => this.setState({ shouldShowTextField: shouldHover });

    updateDate = (event) => {
        const newDate = new Date(event.target.value + 'T00:00:00'); // Must append to make constructor create correct date
        this.props.getSpecificDate(newDate);
    }

    render() {
        const { date, incrementDate, disableIncrementers } = this.props;
        return (
            <>
                {!this.state.shouldShowTextField &&
                    <div className='d-flex flex-row align-items-center m-1'>

                        <button
                            disabled={disableIncrementers}
                            className='btn btn-link'
                            onClick={() => incrementDate(-1)}>
                            <div className="row align-self-center">
                                <ArrowLeft />
                            </div>
                        </button>
                        <div
                            onMouseEnter={() => this.showTextField(true)}
                            className='m-2'>{getFormattedDate2(date)}</div>
                        <button
                            disabled={disableIncrementers}
                            className='btn btn-link'
                            onClick={() => incrementDate(1)}>
                            <div className="row align-self-center">
                                <ArrowRight />
                            </div>

                        </button>


                    </div>
                }
                {this.state.shouldShowTextField &&
                    <div
                        onMouseLeave={() => this.showTextField(false)}
                        className='d-flex flex-row align-items-center'>
                        <input
                            type='date'
                            className='m-2'
                            defaultValue={getRfc3339Date(date)}
                            onChange={(e) => this.updateDate(e)}
                        />
                    </div>
                }
            </>
        );
    }
}

export default DateChanger;