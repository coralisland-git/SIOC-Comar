/* global window */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Splash from './Splash';
import Search from './Search';
import Intro from './Intro';
import Footer from './Footer';
import DwellingService from '../../services/dwelling';
import {requestFindDwellings} from '../../actions/index';

class Home extends Component {
    static propTypes = {
        requestFindDwellings: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    };

    async handleSubmit(siocId) {
        if (!siocId) return;
        const id = await DwellingService.findSiocId(siocId);
        if (id) {
            this.props.history.push(`/propiedades/${id}`);
        }
    }

    handleSearch(searchParams) {
        if (!searchParams) return;
        this.props.requestFindDwellings(searchParams);
        this.props.history.push('/resultados/');
    }

    render() {
        return (
            <div>
                <Splash onChange={e => this.handleSubmit(e)} onSearch={e => this.handleSearch(e)}/>
                <Search/>
                <Intro/>
                <Footer/>
            </div>
        );
    }
}

export default connect(
    null,
    dispatch => ({
        requestFindDwellings: searchParams => dispatch(requestFindDwellings(searchParams))
    })
)(Home);
