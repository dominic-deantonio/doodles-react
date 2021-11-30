import React from 'react';
import {getFormattedDate2} from '../../services';

class DateChanger extends React.Component {
    render() {
        const {date, incrementDate} = this.props;
        return (
            <div className='d-flex flex-row align-items-center'>
                <button className='btn btn-primary rounded-circle' onClick={()=>incrementDate(-1)}>&lt;</button>
                <div className='m-2'>{getFormattedDate2(date)}</div>
                <button className='btn btn-primary rounded-circle' onClick={()=>incrementDate(1)}>&gt;</button>
            </div>
        );
    }
}

export default DateChanger;