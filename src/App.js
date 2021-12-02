import React from 'react';
import './App.css';
import DateChanger from './components/dateChanger';
import Doodle from './components/doodle';
import Title from './components/title';
import { getTodayByYear } from './services';

class App extends React.Component {
  state = {
    isFetching: true,
    doodles: [],
    selectedDate: new Date(),
  }

  async componentDidMount() {
    this.setState({
      doodles: await getTodayByYear(this.state.selectedDate, true, this.showLoader, this.clearDoodles),
    });
  }

  incrementDate = async (amount) => {
    const newDate = new Date(this.state.selectedDate.setDate(this.state.selectedDate.getDate() + amount));
    this.setState({
      selectedDate: newDate,
      doodles: await getTodayByYear(newDate, false, this.showLoader, this.clearDoodles)
    });
  }

  getSpecificDate = async (date) => {
    // Setting them separately to show the user the date was accepted.
    // If not, it looks like it freezes
    this.setState({ selectedDate: date, });
    this.setState({
      doodles: await getTodayByYear(date, false, this.showLoader, this.clearDoodles)
    });
  }

  clearDoodles = () => this.setState({ doodles: [] });

  showLoader = (shouldShow) => {
    this.setState({ isFetching: shouldShow });
  }

  render() {
    return (
      <div className="container d-flex flex-column align-items-center" >
        <Title />
        <DateChanger
          disableIncrementers={this.state.isFetching}
          date={this.state.selectedDate}
          incrementDate={this.incrementDate}
          showLoader={this.showLoader}
          getSpecificDate={this.getSpecificDate}
        />
        <img
          src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
          hidden={!this.state.isFetching}
          alt=''>
        </img>
        <div
          className='d-flex flex-row flex-wrap justify-content-center'>
          {this.state.doodles.map((doodleData, i) =>
            <Doodle
              {...doodleData}
              selectedDate={this.state.selectedDate}
              key={i}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
