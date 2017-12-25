import React, { Component } from 'react';
import fetch from 'node-fetch';
import {getBreedName, modifyPath} from "./functions"
import {Image} from "./Image"

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
                this.setState({
                    pic: json.message,
                    breed: getBreedName(json.message)
                });
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
        let textCenter = {'textAlign':'center'};
        return (
            <div style={textCenter}>
                <p><b>Порода:</b>&nbsp;
                    <select name="breedSelect" onChange={this.handleChange} value={this.state.breed}>
                        {this.state.breeds ? this.state.breeds.map(breed=><option value={breed} key={breed}>{breed.charAt(0).toUpperCase() + breed.slice(1)}</option>) : '<option value="">loading...</option>'}
                    </select>
                </p>
                <Image src={this.state.pic} breed={this.state.breed}/>
            </div>
        );
    }
}
