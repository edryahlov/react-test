import React, { Component } from 'react';
export class Image extends React.Component {
    render() {
        return (
            <img src={this.props.src} alt={this.props.breed}/>
        );
    }
}