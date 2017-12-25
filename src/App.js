import React, { Component } from 'react';
import {List} from './List.js'

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Welcome to dogs pics website on React! :)</h1>
                <List/>
            </div>
        );
    }
}

export default App;
