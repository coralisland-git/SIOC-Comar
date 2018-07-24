/* eslint-disable max-len */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {BeatLoader} from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Button} from 'react-bootstrap';
import {
    Container,
    Row,
    Col
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import {requestLoadMoreDwellings} from '../../../actions/index';

moment.locale('es');

class Latest extends Component {
    static propTypes = {
        requestLoadMoreDwellings: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        dwellings: PropTypes.arrayOf(PropTypes.shape({}))
    };

    static defaultProps = {
        dwellings: null
    };

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            page: {
                pageNumber: 0,
                perPage: 9
            },
            loading: true,
            hasMore: true
        };
    }

    componentDidMount() {
        this.props.requestLoadMoreDwellings({page: this.state.page});
    }

    componentWillReceiveProps(props) {
        if (props.dwellings[0] !== this.state.items[0]) {
            this.setState({
                items: this.state.items.concat(props.dwellings)
            });
            if (props.dwellings.length === 0) {
                this.setState({hasMore: false});
            }
        }
    }


    fetchMoreData = () => {
        setTimeout(() => {
            const {page} = this.state;
            page.pageNumber = this.state.page.pageNumber + 1;
            this.setState({page});
            this.props.requestLoadMoreDwellings({page: this.state.page});
        }, 500);
    };

    renderContent() {
        return (
            <div className="highlights" style={{padding: 0}}>
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<BeatLoader
                        color="#fbad1c"
                        loading={this.state.loading}
                    />}
                >
                    <Row>
                        {this.state.items.map(dwelling => (
                            <Col sm="6" md="4" key={dwelling._id}>
                                <div
                                    className="highlight-box"
                                    onClick={() => this.props.history.push(`/admin/dwellings/card/${dwelling._id}`)}
                                >
                                    <div className="prop-detail-btns">
                                        <Button className="like"><FontAwesome name="heart" size="lg"/></Button>
                                    </div>
                                    <img 
                                        src={dwelling.images[0] !== undefined 
                                            ? dwelling.images[0].secure_url.replace('/upload/', '/upload/w_400,q_auto,f_auto/') 
                                            : 'http://via.placeholder.com/330x220'}
                                    />
                                    <Row className="highlight-body">
                                        <Col sm={12}>
                                            {dwelling.price
                                            ? <h3><small>{dwelling.currency}</small>{dwelling.price}</h3>
                                            : <h3>Consulte</h3>}
                                            <h4 className="primary">
                                                {dwelling.publicationType}, {dwelling.subtype}, {dwelling.address.streetName}, {dwelling.address.city}, {dwelling.address.state}
                                            </h4>
                                        </Col>
                                        <Col sm={12}>
                                            <span className="pull-left">Subido {moment(dwelling.createdAt).startOf('minutes').fromNow()}</span>
                                            <span className="pull-right"><b>#{dwelling.siocId}</b></span>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </InfiniteScroll>
            </div>
        );
    }

    render() {
        return (
            <Container fluid className="animated fadeIn">
                <h3>Últimas Propiedades cargadas</h3>
                {this.props.dwellings && this.renderContent()}
            </Container>
        );
    }
}

export default connect(
    state => ({dwellings: state.dwelling.dwellings}),
    dispatch => ({
        requestLoadMoreDwellings: serachParams => dispatch(requestLoadMoreDwellings(serachParams))
    })
)(Latest);

