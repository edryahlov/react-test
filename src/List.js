import React, { Component } from 'react';
import fetch from 'node-fetch';
import {modifyPath} from "./functions"

export class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            breed: '',
            pic: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    //при выборе породы
    handleChange(event) {
        this.setState({breed: event.target.value});
        fetch('https://dog.ceo/api/breed/' + modifyPath(event.target.value) + '/images/random').then(res => res.json()).then(json => {
            this.setState({pic:json.message});
        });
    }
    componentDidMount() {
        //ставим дефолтную картинку
        if (!this.state.pic) {
            fetch('https://dog.ceo/api/breeds/image/random').then(res => res.json()).then(json => {
                this.setState({pic:json.message});
            });
        }
        //добываем список пород
        let breeds=[];
        fetch('https://dog.ceo/api/breeds/list/all').then(res => res.json()).then(json => {
            for (let breed in json.message) {
                breeds.push(breed);
                if (json.message[breed].length > 0) json.message[breed].map(d=>breeds.push(breed+'-'+d));
            }
            this.setState({breeds});
        });
    }
    render() {
        return (
            <div>
                <select name="breedSelect" onChange={this.handleChange} value={this.state.breed}>
                    {this.state.breeds ? this.state.breeds.map(breed=><option value={breed}>{breed}</option>) : '<option value="">loading...</option>'}
                </select>
                <p>Порода: {this.state.breed}</p>
                <img src={this.state.pic}/>
            </div>
        );
    }
}
