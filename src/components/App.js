import React, { Component } from 'react';
import SearchBar from 'components/SearchBar'
import youtube from 'api/youtube'
import VideoList from 'components/VideoList'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { videos: [] };
    this.onTermSubmit = this.onTermSubmit.bind(this)
  }

  async onTermSubmit(term) {
    console.log(term)
    const response = await youtube.get('/search', {
      params: {
        q: term
      }
    })
    const { items } = response.data
    this.setState({ videos: items })
    console.log(this.state.videos)
  }

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <VideoList videos={this.state.videos} />
      </div>
    );
  }

}

export default App;
