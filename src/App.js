import React from 'react';
import './App.css';
import DateChanger from './components/dateChanger';
import Doodle from './components/doodle';
import Title from './components/title';
import { getTodayByYear } from './services';

class App extends React.Component {
  state = {
    hideLoader: false,
    doodles: [],
    selectedDate: new Date(),
  }

  async componentDidMount() {
    this.setState({
      doodles: await getTodayByYear(this.state.selectedDate, true, this.showLoader),
    });
  }

  incrementDate = async (amount) => {
    const newDate = new Date(this.state.selectedDate.setDate(this.state.selectedDate.getDate() + amount));
    this.setState({
      doodles: []
    })
    this.setState({
      selectedDate: newDate,
      doodles: await getTodayByYear(newDate, false, this.showLoader)
    });
  }

  showLoader = (shouldShow) => {
    this.setState({ hideLoader: !shouldShow });
  }

  render() {
    return (
      <div className="container d-flex flex-column align-items-center" >
        <Title />
        <DateChanger date={this.state.selectedDate} incrementDate={this.incrementDate} showLoader={this.showLoader} />
        <img src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" hidden={this.state.hideLoader} alt=''></img>
        <div id='doodle-container' className='d-flex flex-row flex-wrap justify-content-center'>
          {this.state.doodles.map((doodleData, i) => <Doodle {...doodleData} selectedDate={this.state.selectedDate} key={i} />)}
        </div>
      </div>
    );
  }
}

export default App;
