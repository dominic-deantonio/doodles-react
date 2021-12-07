import React from 'react';
import './App.css';
import LoginStatusBar from './components/loginStatusBar';

import { getTodayByYear } from './services/doodleApi';
import { fetchFavorites } from './services/api';
import DayView from './components/views/dayView';
import FavoritesView from './components/views/favoritesView';

class App extends React.Component {
  didFetchFaves = false;
  state = {
    isFetching: true,
    doodles: [],
    selectedDate: new Date(),
    favorites: [],
    showFavorites: false,
  }

  showFavorites = async () => {
    if (this.props.authState.isAuthenticated) {
      await this.setFavorites();
      this.setState({ showFavorites: true });

    } else {
      console.log('Not authenticated - will not fetch faves');
    }
  }

  setFavorites = async () => {
    const { user } = this.props.authState;
    const faves = await fetchFavorites(user.name);
    this.setState({ favorites: faves });
  }

  async componentDidMount() {
    while (this.props.authState.isLoading) {
      await this.waitFor(200); // wait for the login to be complete, then fetch the favorites
      console.log('Waiting for auth...');
    }
    await this.setFavorites();
    this.setState({
      doodles: await getTodayByYear(this.state, true, this.showLoader, this.clearDoodles),
    });
  }


  incrementDate = async (amount) => {
    const newDate = new Date(this.state.selectedDate.setDate(this.state.selectedDate.getDate() + amount));
    this.setState({
      selectedDate: newDate,
      doodles: await getTodayByYear(this.state, false, this.showLoader, this.clearDoodles)
    });
  }
  waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

  getSpecificDate = async (date) => {
    // Setting them separately to show the user the date was accepted.
    // If not, it looks like it freezes
    this.setState({ selectedDate: date, });
    await this.waitFor(100); // Was executing too fast and the new date was not avail in state
    this.setState({
      doodles: await getTodayByYear(this.state, false, this.showLoader, this.clearDoodles)
    });
  }

  clearDoodles = () => this.setState({ doodles: [] });

  showLoader = (shouldShow) => {
    this.setState({ isFetching: shouldShow });
  }

  goToDayView = async () => {
    this.setState({ showFavorites: false })
    await this.waitFor(50);
    this.setState({
      doodles: await getTodayByYear(this.state, true, this.showLoader, this.clearDoodles),
    });
  }

  render() {
    return (
      <>
        <LoginStatusBar
          {...this.state}
          authState={this.props.authState}
          getFavorites={this.showFavorites}
          goToDayView={this.goToDayView} />
        <div className="d-flex flex-column align-items-center" >
          {!this.state.showFavorites &&
            <DayView
              {...this.state}
              {...this.props}
              incrementDate={this.incrementDate}
              getSpecificDate={this.getSpecificDate}
            />}
          {this.state.showFavorites &&
            <FavoritesView
              {...this.state}
              {...this.props}
              showFavorites={this.showFavorites} />}
        </div>
      </>

    );
  }
}

export default App;
