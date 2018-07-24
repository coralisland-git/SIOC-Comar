import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Container,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import {requestSearchUsers, clearUsers, requestSaveClient, requestUser} from '../../../actions';
import Typeahead from '../../common/Typeahead';
import GoogleSearchBox from '../../Maps/GoogleSearchBox';
import {Client} from '../../../model/index';

class New extends Component {
    static propTypes = {
        requestSearchUsers: PropTypes.func.isRequired,
        requestSaveClient: PropTypes.func.isRequired,
        requestUser: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        clearUsers: PropTypes.func.isRequired,
        clientUsersOptions: PropTypes.arrayOf(PropTypes.shape({})),
        client: PropTypes.shape({})
    };

    static defaultProps = {
        client: new Client(),
        clientUsersOptions: []
    };

    static getDerivedStateFromProps(props) {
        console.log(props.user);
        if (props.user) {
            return {client: props.user};
        }
        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            client: new Client(),
            user: {}
        };
    }

    componentDidMount() {
        this.props.clearUsers();
    }

    handleChange(user) {
        this.setState(
            state => ({
                user: {...state.user, user: user.value, label: user.label}
            })
        );
        this.props.requestUser(user.value);
    }

    handleInput(e, id) {
        this.setState(
            state => ({
                client: (Object.assign(state.client, {[id]: e}))
            })
        );
    }

    handleSubmit() {
        const {client} = this.state;
        this.props.requestSaveClient(client);
        this.props.history.push('/admin/clients/search');
    }

    render() {
        const {clientUsersOptions} = this.props;
        const {client, user} = this.state;
        console.log(client);
        return (
            <Container className="animated fadeIn">
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <Typeahead
                                label="Crear de Usuario Existente"
                                control="users"
                                options={clientUsersOptions}
                                onLoadOptions={term => this.props.requestSearchUsers(term, 'usuario')}
                                placeholder="Seleccione usuario"
                                value={user ? user : ''}
                                onChange={params => this.handleChange(params)}
                                removeSelected
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>Nombre</Label>
                                    <Input
                                        type="text"
                                        placeholder="Ingrese Nombre del Cliente"
                                        value={client.name}
                                        onChange={e => this.handleInput(e.target.value, 'name')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>Apellido</Label>
                                    <Input
                                        type="text"
                                        placeholder="Ingrese Apellido del Cliente"
                                        value={client.surname}
                                        onChange={e => this.handleInput(e.target.value, 'surname')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={12}>
                                <FormGroup>
                                    <Label>Fecha de Nacimiento</Label>
                                    <Input
                                        type="date"
                                        value={client.birthdate}
                                        onChange={e => this.handleInput(e.target.value, 'birthdate')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>DNI</Label>
                                    <Input
                                        type="number"
                                        placeholder="Ingrese DNI del Cliente"
                                        value={client.documentId}
                                        onChange={e => this.handleInput(e.target.value, 'documentId')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>CUIT</Label>
                                    <Input
                                        type="number"
                                        placeholder="Ingrese CUIT del Cliente"
                                        value={client.cuit}
                                        onChange={e => this.handleInput(e.target.value, 'cuit')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={12}>
                                <FormGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>Teléfono Casa</Label>
                                    <Input
                                        type="number"
                                        placeholder="Ingrese el Teléfono del Cliente"
                                        value={client.phone}
                                        onChange={e => this.handleInput(e.target.value, 'phone')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>Teléfono Trabajo</Label>
                                    <Input
                                        type="number"
                                        placeholder="Ingrese el Teléfono de Trabajo del Cliente"
                                        value={client.workPhone}
                                        onChange={e => this.handleInput(e.target.value, 'workPhone')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>Celular</Label>
                                    <Input
                                        type="number"
                                        placeholder="Ingrese el Teléfono de Celular del Cliente"
                                        value={client.cellPhone}
                                        onChange={e => this.handleInput(e.target.value, 'cellPhone')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        placeholder="Ingrese el E-mail del Cliente"
                                        value={client.email}
                                        onChange={e => this.handleInput(e.target.value, 'email')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={12}>
                                <FormGroup>
                                    <Label>Horario de contacto</Label>
                                    <Input
                                        type="text"
                                        value=""
                                        placeholder=""
                                        maxLength={50}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={12}>
                                <FormGroup>
                                    <Label>Dirección</Label>
                                    <GoogleSearchBox
                                        address={client.address}
                                        onChange={e => this.handleInput(e, 'address')}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={12}>
                        <FormGroup>
                            <Label>Observacioness</Label>
                            <Input
                                type="textarea"
                                value={client.observations}
                                onChange={e => this.handleInput(e.target.value, 'observations')}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(
    state => ({
        clientUsersOptions: state.user.clientUsersOptions,
        user: state.user.user
    }),
    dispatch => ({
        requestSearchUsers: (term, userType) => dispatch(requestSearchUsers(term, userType)),
        requestSaveClient: client => dispatch(requestSaveClient(client)),
        requestUser: user => dispatch(requestUser(user)),
        clearUsers: () => dispatch(clearUsers())
    })
)(New);
