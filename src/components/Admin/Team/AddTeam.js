import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {requestSearchUsers, clearUsers, requestSaveAgency} from '../../../actions';
import Typeahead from '../../common/Typeahead';
import GoogleSearchBox from '../../Maps/GoogleSearchBox';
import {Agency} from '../../../model/index';

class AddTeam extends Component {
    static propTypes = {
        requestSearchUsers: PropTypes.func.isRequired,
        requestSaveAgency: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        clearUsers: PropTypes.func.isRequired,
        captainUsersOptions: PropTypes.arrayOf(PropTypes.shape({})),
        auctioneerUsersOptions: PropTypes.arrayOf(PropTypes.shape({})),
        agency: PropTypes.shape({})
    };

    static defaultProps = {
        agency: new Agency(),
        captainUsersOptions: [],
        auctioneerUsersOptions: []
    };

    constructor(props) {
        super(props);
        this.state = {
            agency: new Agency()
        };
    }

    componentDidMount() {
        this.props.clearUsers();
    }

    handleChange(user, type) {
        this.setState(
            state => ({
                agency: {
                    ...state.agency,
                    [type]: {...state.agency[type], user: user.value, label: user.label}
                }
            })
        );
    }

    handleToggle(e, id) {
        this.setState(
            state => ({
                agency: (Object.assign(state.agency, {[id]: e}))
            })
        );
    }

    handleSubmit() {
        const {agency} = this.state;
        this.props.requestSaveAgency(agency);
        this.props.history.push('/admin/team/list');
    }

    render() {
        const {auctioneerUsersOptions, captainUsersOptions} = this.props;
        const {agency} = this.state;
        return (
            <Container fluid className="animated fadeIn">
                <Row>
                    <Col sm={12}>
                        <h2>Crear Inmobiliaria</h2>
                    </Col>
                    <div className="padding-sm"></div>
                    <Col sm={12}>
                        <FormGroup>
                            <Label>Nombre de Inmobiliaria</Label>
                            <Input
                                type="text"
                                placeholder="Ingrese Nombre de la inmobiliaria"
                                value={agency.name}
                                onChange={e => this.handleToggle(e.target.value, 'name')}
                            />
                        </FormGroup>
                    </Col>
                    
                        <Col sm={3}>
                            <FormGroup>
                                Dirección
                                <GoogleSearchBox
                                    address={agency.address}
                                    onChange={e => this.handleToggle(e, 'address')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                <Label>E-mail</Label>
                                <Input
                                    type="email"
                                    placeholder="Ingrese Email de la inmobiliaria"
                                    value={agency.email}
                                    onChange={e => this.handleToggle(e.target.value, 'email')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                <Label>Whatsapp</Label>
                                <Input
                                    type="number"
                                    placeholder="Ingrese Whatsapp de la inmobiliaria"
                                    value={agency.whatsapp}
                                    onChange={e => this.handleToggle(e.target.value, 'whatsapp')}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                <Label>Teléfono</Label>
                                <Input
                                    type="phone"
                                    placeholder="Ingrese Teléfono de la inmobiliaria"
                                    value={agency.phone}
                                    onChange={e => this.handleToggle(e.target.value, 'phone')}
                                />
                            </FormGroup>
                        </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <Typeahead
                                label="Martillero"
                                control="users"
                                options={auctioneerUsersOptions}
                                onLoadOptions={term => this.props.requestSearchUsers(term, 'martillero')}
                                placeholder="Seleccione usuario"
                                value={agency.auctioneer ? agency.auctioneer : ''}
                                onChange={params => this.handleChange(params, 'auctioneer')}
                                removeSelected
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <Typeahead
                                label="Capitán"
                                control="users"
                                options={captainUsersOptions}
                                onLoadOptions={term => this.props.requestSearchUsers(term, 'capitan')}
                                placeholder="Seleccione usuario"
                                value={agency.captain ? agency.captain : ''}
                                onChange={params => this.handleChange(params, 'captain')}
                                removeSelected
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={12}>
                        Cargar Img Logo <br/>
                        ...
                    </Col>
                </Row>
                <div className="padding-sm"></div>
                <Row>
                    <Col>
                        <Button
                            className="pull-right"
                            onClick={() => this.handleSubmit()}
                        >
                            Guardar
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(
    state => ({
        loading: state.user.loading,
        auctioneerUsersOptions: state.user.auctioneerUsersOptions,
        captainUsersOptions: state.user.captainUsersOptions
    }),
    dispatch => ({
        requestSearchUsers: (term, userType) => dispatch(requestSearchUsers(term, userType)),
        requestSaveAgency: agency => dispatch(requestSaveAgency(agency)),
        clearUsers: () => dispatch(clearUsers())
    })
)(AddTeam);
