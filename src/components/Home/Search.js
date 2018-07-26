import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col, Button} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {requestUserProfile, requestDwellings} from '../../actions';

import ImgPropiedad from '../../../public/images/330x220.png';
import {Dwelling} from "../../model";
import moment from "moment/moment";

class Search extends Component {
    static propTypes = {
        requestUserProfile: PropTypes.func.isRequired,
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
        this.props.requestUserProfile();
        this.props.requestDwellings();
    }

    renderContent() {
        return (    
            <Row className="highlights-main">
                {this.props.dwellings.map(dwelling => {
                    let img_url = dwelling.images[0] !== undefined
                                ? dwelling.images[0].secure_url.replace('/upload/', '/upload/w_400,q_auto,f_auto/')
                                : 'http://via.placeholder.com/330x220';
                    let detail_url = this.props.userProfile ? this.props.userProfile.role === 'admin' ? 
                                `/admin/dwellings/card/${dwelling._id}` : `/propiedades/${dwelling._id}` : `/propiedades/${dwelling._id}`;
                    return (
                    <Col className="prop-listing-margin-fix" sm={6} md={4} key={dwelling._id}>
                        <div 
                            className="highlight-box" 
                            onClick={() => this.props.history.push(detail_url)}
                        >
                            <div className="prop-detail-btns">
                                <Button className="like"><FontAwesome name="heart" size="lg"/></Button>
                            </div>
                            <div className="img" style={{width: '100%', height: '200px', backgroundSize: 'cover', backgroundImage: 'url("'+img_url+'")'}}></div>
                            <Row className="highlight-body">
                                <Col sm={12}>
                                    {dwelling.price ?
                                        <h4>
                                            <small>{dwelling.currency}</small>
                                            {dwelling.price}
                                        </h4>
                                        : <h4>Consulte</h4>}
                                    <h3 className="primary">
                                        {dwelling.subtype} en {dwelling.publicationType} en {dwelling.address.city}
                                    </h3>
                                </Col>
                                <Col sm={12}>
                                    <span className="pull-left">
                                        Subido {moment(dwelling.createdAt).startOf('minutes').fromNow()}</span>
                                    <span className="pull-right">#{dwelling.siocId}</span>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                )})}
            </Row>
        );
    }


    render() {
        return (
            <Container fluid className="animated fadeIn highlights">
                <Col sm={12} className="text-center">
                    
                        <hr/>
                        <h3>Presentamos las últimas novedades del <b>SIOC</b> en tiempo real!</h3>
                        <hr/>
                </Col>
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
        userProfile: state.user.userProfile, 
        dwellings: state.dwelling.dwellings
    }),
    dispatch => ({
        requestUserProfile: () => dispatch(requestUserProfile()), 
        requestDwellings: () => dispatch(requestDwellings())
    })
)(Search));

