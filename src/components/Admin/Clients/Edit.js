import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import {requestSaveClient, clearClientSaved} from '../../../actions';
import Typeahead from '../../common/Typeahead';
import GoogleSearchBox from '../../Maps/GoogleSearchBox';
import {Client} from '../../../model/index';

class Edit extends Component {
    static propTypes = {
        requestSaveClient: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        client: PropTypes.shape({})
    };

    static defaultProps = {
        client: new Client()
    };

    constructor(props) {
        super(props);
        this.state = {
            client: new Client()
        };
    }

    componentDidMount() {
        let birthdate = this.props.location.state.client.birthdate ? this.props.location.state.client.birthdate.slice(0,10) : '';
        this.setState(
            state => ({
                client: (Object.assign({},this.props.location.state.client, {birthdate}))
            })
        );
    }

    handleInput(e, id) {
        this.setState(
            state => ({
                client: (Object.assign(state.client, {[id]: e}))
            })
        );
    }

    handleSubmit(event) {
        if (!event.target.checkValidity()) {
            return;
        }
        event.preventDefault();
        const {client} = this.state;
        client['deleted'] = false;
        this.props.requestSaveClient(client);
    }

    render() {
        const {saved, unsaved} = this.props;
        const {client} = this.state;

        if (saved) {
            this.props.clearClientSaved();
            this.props.history.push('/admin/clients/search');
        }

        if (unsaved) {
            this.props.clearClientSaved();
            this.setState({'unsaved': unsaved});
        }

        return (
            <Container className="animated fadeIn">
                <Form 
                    className="form" 
                    onSubmit={this.handleSubmit.bind(this)}>
                    <Row>
                        <Col sm="12">
                            <h2 className="pull-left">Editar Cliente</h2>
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
                                            required
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
                                            required
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
                                            required
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
                                        <Label>Categoría</Label>
                                        <Input
                                            type="select"
                                            required
                                            placeholder="Ingrese Categoría del Cliente"
                                            value={client.category}
                                            onChange={e => this.handleInput(e.target.value, 'category')}
                                        >
                                            <option value="interesado">interesado</option>
                                            <option value="propietario">propietario</option>
                                            <option value="inquilino">inquilino</option>
                                        </Input>
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
                                            required
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
                                            required
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
                                            required
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
                    {this.state.unsaved&&
                    <Row>
                        <Alert color="danger">
                            Email already exists
                        </Alert>
                    </Row>}
                    <Row>
                        <div className="pull-right">
                            <Button
                                type="submit"
                            >
                                Guardar
                            </Button>
                        </div>
                        <div className="pull-right">
                            <Button style={{marginLeft: '10px'}}
                                color="second"
                                onClick={() => this.props.history.push('/admin/clients/search')}
                            >
                                Volver
                            </Button>
                        </div>
                    </Row>
                </Form>
            </Container>
        );
    }
}

export default connect(
    state => ({
        saving: state.client.saving,
        saved: state.client.saved,
        unsaved: state.client.unsaved
    }),
    dispatch => ({
        requestSaveClient: client => dispatch(requestSaveClient(client)),
        clearClientSaved: () => dispatch(clearClientSaved())
    })
)(Edit);
