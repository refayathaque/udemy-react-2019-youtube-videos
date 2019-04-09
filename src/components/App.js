import React, { Component } from 'react';
import SearchBar from 'components/SearchBar'
import youtube from 'api/youtube'
import VideoList from 'components/VideoList'
import VideoDetail from 'components/VideoDetail'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      videos: [],
      selectedVideo: null
    };
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

  onVideoSelect = (video) => {
    console.log('From the App Component - ',video)
    this.setState({ selectedVideo: video })
  }

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                videos={this.state.videos} onVideoSelect={this.onVideoSelect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
