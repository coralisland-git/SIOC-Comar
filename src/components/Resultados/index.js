/* global window */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import MapWithSearchBox from '../Maps/MapWithSearchBox';
import {requestFindDwellings} from '../../actions/index';

class Resultados extends Component {
    static propTypes = {
        requestFindDwellings: PropTypes.func.isRequired,
        dwellings: PropTypes.arrayOf(PropTypes.shape({})),
        searchParams: PropTypes.shape({}),
        currentPosition: PropTypes.shape({})
    };

    static defaultProps = {
        dwellings: null,
        searchParams: null,
        currentPosition: undefined
    };

    constructor(props) {
        super(props);
        this.state = {
            searchParams: {},
            height: 0
        };
        if (this.props.searchParams) {
            this.state = {
                searchParams: this.props.searchParams
            };
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({height: window.innerHeight});
    }

    handleSubmit(searchParams) {
        this.props.requestFindDwellings(searchParams);
    }

    renderMap() {
        return (
            <MapWithSearchBox dwellings={this.props.dwellings} selectedRef={this.props.currentPosition}/>
        );
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                {this.renderMap()}
            </div>
        );
    }
}

export default connect(
    state => ({
        dwellings: state.dwelling.searchedDwellings,
        searchParams: state.dwelling.searchParams,
        currentPosition: state.map.currentPosition
    }),
    dispatch => ({
        requestFindDwellings: searchParams => dispatch(requestFindDwellings(searchParams))
    })
)(Resultados);

