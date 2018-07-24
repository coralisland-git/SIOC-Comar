import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col, Button} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {requestDwellings} from '../../actions';

import ImgPropiedad from '../../../public/images/330x220.png';
import {Dwelling} from "../../model";
import moment from "moment/moment";

class Search extends Component {
    static propTypes = {
        requestDwellings: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        dwellings: PropTypes.arrayOf(PropTypes.shape({}))
    };
    static defaultProps = {
        dwellings: []
    };

    componentDidMount() {
        this.props.requestDwellings();
    }

    renderContent() {
        return (
            <Row>
                <Col sm="12">
                    <Row>
                        {this.props.dwellings.map(dwelling => (
                            <Col sm="6" md={4} key={dwelling._id}>
                                <div className="highlight-box">
                                    <div className="prop-detail-btns">
                                        <Button className="like"><FontAwesome name="heart" size="lg"/></Button>
                                    </div>
                                    <img
                                        src={dwelling.images[0] !== undefined
                                            ? dwelling.images[0].secure_url.replace('/upload/', '/upload/w_400,q_auto,f_auto/')
                                            : 'http://via.placeholder.com/330x220'}
                                        alt=""
                                    />
                                    <Row className="highlight-body">
                                        <Col sm={12}>
                                            {dwelling.price ?
                                                <h3>
                                                    <small>{dwelling.currency}</small>
                                                    {dwelling.price}
                                                </h3>
                                                : <h3>Consulte</h3>}
                                            <h4 className="primary">
                                                {dwelling.publicationType}, {dwelling.subtype}, {dwelling.address.streetName}, {dwelling.address.city}, {dwelling.address.state}
                                            </h4>
                                        </Col>
                                        <Col sm={12}>
                                            <span className="pull-left">
                                                Subido {moment(dwelling.createdAt).startOf('minutes').fromNow()}</span>
                                            <span className="pull-right">#{dwelling.siocId}</span>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>))}
                    </Row>
                </Col>
            </Row>
        );
    }


    render() {
        return (
            <Container fluid className="animated fadeIn highlights">
                <Row>
                    <Col sm="12" className="text-center">
                        <hr/>
                        <h3>Presentamos las últimas novedades del <b>SIOC</b> en tiempo real!</h3>
                        <hr/>
                    </Col>
                </Row>
                {this.props.dwellings && this.renderContent()}
                <Row>
                    <Col sm={12} className="text-right">
                        <Button
                            size="lg"
                            color="light"
                            onClick={() => this.props.history.push('/dwellings/latest')}
                        > Ver más <FontAwesome name="angle-right"/>
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(connect(
    state => ({
        dwellings: state.dwelling.dwellings
    }),
    dispatch => ({
        requestDwellings: () => dispatch(requestDwellings())
    })
)(Search));

