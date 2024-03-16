import React, { Component } from 'react';
import { TextField, Select, MenuItem, FormControl } from '@mui/material';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';


class Search extends Component {
    state = {
        searchText: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api/',
        apiKey: process.env.REACT_APP_PIXABAY_API_KEY,
        images: []
    }

    onTextChange = e => {
        const val = e.target.value;
        this.setState({ [e.target.name]: val }, () => {
            if(val === '') {
                this.setState({images: []})
            } else {
                axios
                    .get(
                        `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`
                        )
                        .then(res => this.setState({images: res.data.hits}))
                        .catch(err => console.log(err));
            }

            
        });

    }

    onAmountChange = (e, index, value) => this.setState({amount: e.target.value});

    render() {
        return (
            <FormControl fullWidth>
                <br />
                <TextField 
                    name="searchText"
                    id="search-text"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    label="Search For Images"
                    fullWidth
                />
                <br />
                <Select
                    name="amount"
                    labelId="amount-label"
                    id="amount-select"
                    label="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={50}>50</MenuItem>

                </Select>
                <br />
                {this.state.images.length > 0 ? (<ImageResults images={this.state.images}/>) : null}

            </FormControl>
        )
    }
}

export default Search
