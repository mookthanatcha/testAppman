import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Service from './service.js';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      cats: [],
      data: null,
      isLoading: false,
      status: "SUCCESS",
      loading: "",
      color: ""

    };
  }
  myChangeHandler = (event) => {
    this.setState({ number: event.target.value });


  }
  mySubmitHandler = (event) => {
    this.setState({ isLoading: false, loading: "LOADING...", color: "orange" })
    event.preventDefault();
    var results = Service.getImageItems(this.state.number)
    results
      .then(data => {
        console.log(data)
        this.setState({ cats: data, isLoading: true, status: "SUCCESS", color: "green", loading: "" })

      }).catch(error => {
        this.setState({ cats: [], isLoading: true, status: "FAILED", color: "red", loading: "" })

      });


  }
  render() {


    const myStyle = {
      color: this.state.color
    }
    const { cats } = this.state;
    const isLoading = this.state.isLoading;

    return (

      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Cat Gallery</h2>
          <br></br>
          {this.state.loading == "" ? <div><form onSubmit={this.mySubmitHandler}>
            <input type="number" onChange={this.myChangeHandler}></input>
            <input type="Submit" value="Submit"></input>
          </form> </div> : <div className="blur"><form onSubmit={this.mySubmitHandler}>
            <input type="number" onChange={this.myChangeHandler}></input>
            <input type="Submit" value="Submit"></input>
          </form></div>}


        </div>
        <br></br>
        <br></br>
        <br></br>
        <div>
          {isLoading ? (
            <div>
              <p style={myStyle}>{this.state.status}</p>
              <div className="grid-container">
                {cats.map(hit =>
                  <div>
                    <p key={hit.id}>
                      <img src={hit.image} className="img-1" width="200" height="200"></img>
                      <p>{hit.label}</p>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) :
            (
              <div><p style={myStyle}>{this.state.loading}</p></div>

            )}
        </div>

      </div>
    );
  }
}

export default App;
