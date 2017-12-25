import React, { Component } from 'react';
export class Image extends React.Component {
    state = {};

    //вытаскиваем имя породы. в ответе его нет
    getBreedName = breed => breed.replace(/(https:\/\/dog.ceo\/api\/img\/)(.*)\/(.*)/g,'$2');

    //переделывам ссылку - разные запросы на породу и под-породы
    modifyPath = path => path.match(/-/g) ? path.replace(/(\w+)-(\w+)/g,'$1\/$2') : path;

    componentDidMount() {
        let xhr = new XMLHttpRequest();
        let breeds=[], status = false;
        xhr.open("GET", "https://dog.ceo/api/breeds/list/all", true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);

                    for (let breed in data.message) {
                        breeds.push(breed);
                        if (data.message[breed].length > 0) data.message[breed].map(d=>breeds.push(breed+'-'+d));
                    }


                    status = true;
                    this.setState({ breeds });
                } else {
                    console.error(xhr.statusText);
                }
            }
        }.bind(this);
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
        };
        xhr.send(null);
    }

    render() {
        return (
            <select name="breedSelect">
                {this.state.breeds ? this.state.breeds.map(breed=><option value={breed}>{breed}</option>) : '<option value="">loading...</option>'}
            </select>
        );
    }
}