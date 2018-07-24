import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Container, Row, Col, ListGroup, ListGroupItem, Collapse} from 'reactstrap';
import {requestAgencies} from '../../../actions';

class ListTeam extends Component {
    static propTypes = {
        requestAgencies: PropTypes.func.isRequired,
        agencies: PropTypes.arrayOf(PropTypes.shape({}))
    };

    static defaultProps = {
        agencies: null
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.requestAgencies();
    }

    toggleCollapse(index) {
        this.setState({
            [index]: !this.state[index]
        });
    }

    renderContent() {
        const {agencies} = this.props;
        return (
            <ListGroup>
                {agencies.map((agency, index) => (
                    <ListGroupItem
                        key={agency._id}
                        active
                        tag="button"
                        action
                        onClick={() => this.toggleCollapse(index)}
                    >
                        <b>{agency.name ? agency.name : 'Inmobiliaria sin Nombre'}</b>
                        <Collapse isOpen={this.state[index]} style={{padding: '25px'}}>
                            <Row>
                                <Col sm="12">
                                    Martillero
                                    <h3>{agency.auctioneer ? agency.auctioneer.label : 'No posee'}</h3>
                                </Col>
                                <Col sm="4">
                                    Dirección
                                    <h4>{agency.address ?
                                        <Fragment>
                                            {agency.address.streetName},{ }
                                            {agency.address.streetNumber},{ }
                                            {agency.address.city}
                                        </Fragment> : 'Sin Direccion'}
                                    </h4>
                                </Col>
                                <Col sm="4">
                                    Tel
                                    <h4>{agency.phone ? agency.phone : 'Desconocido'}</h4>
                                </Col>
                                <Col sm="4">
                                    Email
                                    <h4>{agency.email ? agency.email : 'Desconocido'}</h4>
                                </Col>
                                <Col sm="12">
                                    Capitán
                                    <h4>{agency.captain ? agency.captain.label : 'No posee'}</h4>
                                </Col>
                                <Col sm="12">
                                    Vendedores
                                    <h4>Nombre 1, Nombre2, NombreN</h4>
                                </Col>
                            </Row>
                        </Collapse>
                    </ListGroupItem>

                ))}
            </ListGroup>
        );
    }

    render() {
        return (
            <Container fluid className="animated fadeIn">
                <Row>
                    <Col sm="12">
                        <h3>Inmobiliarias </h3>
                        {this.props.agencies && this.renderContent()}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(
    state => ({
        agencies: state.agency.agencies
    }),
    dispatch => ({
        requestAgencies: () => dispatch(requestAgencies())
    })
)(ListTeam);
