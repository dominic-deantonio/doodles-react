import Doodle from '../../doodle';
import DateChanger from '../../dateChanger';
import Title from '../../title';

function DayView(props) {
    const { isFetching, selectedDate, incrementDate, showLoader, getSpecificDate, doodles } = props;
    return (
        <>
            <Title text={'Today in Google Doodles History'} color={'alert-primary'} />
            <DateChanger
                disableIncrementers={isFetching}
                date={selectedDate}
                incrementDate={incrementDate}
                showLoader={showLoader}
                getSpecificDate={getSpecificDate}
            />
            <img
                src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
                hidden={!isFetching}
                alt=''>
            </img>
            <div
                className='d-flex flex-row flex-wrap justify-content-center'>
                {doodles.map((doodleData, i) =>
                    <Doodle
                        {...props}
                        doodle={doodleData}
                        key={i}
                    />
                )}
            </div>
        </>
    );
}
export default DayView;