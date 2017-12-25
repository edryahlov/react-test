import React, { Component } from 'react';
import {List} from './List.js'
import './index.css'

class App extends Component {
    render() {
        let txtCenter = {'textAlign':'center'};
        return (
            <div className="App">
                <h1 style={txtCenter}>Welcome to dogs pics website on React! :)</h1>
                <List/>
            </div>
        );
    }
}

export default App;
