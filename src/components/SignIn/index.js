/* global window */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Row, Col, Button, Form, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import {Label, Input} from 'reactstrap';
import {delay} from 'lodash';
import FontAwesome from 'react-fontawesome';
import SignInService from '../../services/signIn';
import StorageService from '../../services/storage';

import {requestSaveUser} from '../../actions';

import {User} from '../../model';

import LoadingButton from '../common/LoadingButton';

class SignIn extends Component {
    static propTypes = {
        requestSaveUser: PropTypes.func.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string
            })
        }).isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        user: PropTypes.instanceOf(User),
        saving: PropTypes.bool
    };

    static defaultProps = {
        user: new User(),
        saving: false
    };

    constructor(props) {
        super(props);
        this.state = {
            user: new User(),
            email: '',
            password: '',
            clock: null,
            register: false
        };
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await SignInService.login(this.state.email, this.state.password);
            if (result.token) {
                StorageService.setAuthToken(result.token);
                window.location = '/home';
            } else {
                this.setState({invalidLogin: true});
            }
        } catch (ex) {
            this.setState({invalidLogin: true});
            clearTimeout(this.state.clock);
            this.setState({clock: delay(() => this.setState({invalidLogin: false}), 3500)});
        }
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    handleUser({target: {id, value}}) {
        this.setState(
            state => ({
                user: new User(Object.assign(state.user, {[id]: value}))
            })
        );
    }

    handleRegister() {
        this.setState({register: true});
    }

    handleBack() {
        this.setState({register: false});
    }

    handleRegisterSubmit() {
        const {user} = this.state;
        this.props.requestSaveUser(user);
    }

    render() {
        const {saving} = this.props;
        const {user} = this.state;
        console.log(user);
        return (
            <Grid>
                {!this.state.register ?
                    <Row>
                        <Col>
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <FormGroup>
                                    <h1><FontAwesome name="chevron-circle-right"/> Iniciar sesión</h1>
                                </FormGroup>
                                <FormGroup controlId="email">
                                    <FormControl
                                        type="text"
                                        value={this.state.email}
                                        placeholder="email"
                                        required
                                        onChange={e => this.handleChange(e)}
                                    />
                                </FormGroup>
                                <FormGroup controlId="password">
                                    <FormControl
                                        type="password"
                                        value={this.state.password}
                                        placeholder="Password"
                                        required
                                        onChange={e => this.handleChange(e)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit" bsStyle="primary">
                                        <FontAwesome name="power-off"/> Ingresar
                                    </Button>
                                </FormGroup>
                                {this.state.invalidLogin &&
                                <FormGroup className="text-center text-danger">
                                    <span>El Usuario o la Contraseña son inválidos</span>
                                </FormGroup>}
                            </Form>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Button onClick={() => this.handleRegister()}>
                                    <FontAwesome name="plus-square"/> Registrarme
                                </Button>
                            </FormGroup>
                        </Col>

                    </Row>
                    :
                    <Row>
                        <Col>
                            <FormGroup controlId="email">
                                <ControlLabel>E-mail</ControlLabel>
                                <FormControl
                                    type="email"
                                    value={user.email}
                                    maxLength={50}
                                    onChange={e => this.handleUser(e)}
                                />
                            </FormGroup>
                            <FormGroup controlId="password">
                                <ControlLabel>Contraseña</ControlLabel>
                                <FormControl
                                    type="password"
                                    value={user.password}
                                    maxLength={16}
                                    onChange={e => this.handleUser(e)}
                                />
                            </FormGroup>
                            <FormGroup controlId="name">
                                <ControlLabel>Nombre</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={user.name}
                                    maxLength={50}
                                    onChange={e => this.handleUser(e)}
                                />
                            </FormGroup>
                            <FormGroup controlId="surname">
                                <ControlLabel>Apellido</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={user.surname}
                                    maxLength={50}
                                    onChange={e => this.handleUser(e)}
                                />
                            </FormGroup>
                            <FormGroup controlId="whatsapp">
                                <ControlLabel>whatsapp</ControlLabel>
                                <FormControl
                                    type="number"
                                    value={user.whatsapp}
                                    onChange={e => this.handleUser(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Fecha de Nacimiento</Label>
                                <Input
                                    type="date"
                                    name="date"
                                    id="birthdate"
                                    placeholder=""
                                    onChange={e => this.handleUser(e)}
                                />
                            </FormGroup>
                            {saving && <LoadingButton/>}
                            {!saving &&
                            <Button
                                bsStyle="primary"
                                onClick={() => this.handleRegisterSubmit()}
                                className="btn-group-justified margin-top-h2 ta-save"
                            >
                                <FontAwesome name="floppy-o"/> Guardar
                            </Button>}
                            <Button onClick={() => this.handleBack()}>
                                <FontAwesome name="plus-square"/> Atras
                            </Button>
                        </Col>
                    </Row>
                }
            </Grid>
        );
    }
}

export default connect(
    state => ({
        user: state.user.user,
        saving: state.user.saving
    }),
    dispatch => ({
        requestSaveUser: user => dispatch(requestSaveUser(user))
    })
)(SignIn);
