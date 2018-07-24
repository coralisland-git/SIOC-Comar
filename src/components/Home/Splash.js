import React, {Component} from 'react';
import {
    InputGroup,
    FormControl,
    FormGroup,
} from 'react-bootstrap';
import {
    Container,
    Row,
    Col,
    Button,
    ButtonGroup,
    Input
} from 'reactstrap';

import {map} from 'lodash';
import PropTypes from 'prop-types';
import Select from 'react-select';
import siocLogoInicio from '../../../public/images/sonrisa-sioc.png';
import {groupedOptions} from '../../data/data';
import GoogleSearchBox from '../Maps/GoogleSearchBox';
import MultipleSearchBox from '../Maps/MultipleSearchBox';

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
};
const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '0.3rem',
    color: '#003d6f',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center'
};

const formatGroupLabel = data => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);


class Splash extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        onSearch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            siocId: '',
            searchParams: {
                price: {
                    min: undefined,
                    max: undefined

                },
                publicationType : 'Alquiler'
            }
        };
    }

    handleSubmit() {
        const {onSearch} = this.props;
        const {searchParams} = this.state;
        onSearch(searchParams);
    }

    handleChange(e) {
        const {value} = e.target;
        if (value.length === 7) return;
        this.setState({
            siocId: value
        });
    }

    handleType(id, e) {
        this.setState(
            state => ({
                searchParams: (Object.assign(state.searchParams, {[id]: e}))
            })
        );
    }

    handleSelect(e) {
        const values = map(e, subtype => subtype.value);
        this.setState(
            state => ({
                searchParams: {...state.searchParams, subtype: values}
            })
        );
    }

    handleAddress(e) {

        this.setState(
            state => ({
                searchParams: {...state.searchParams, address: e.map(addr=>{
                    let res = {...addr};
                    delete res.altitude;
                    delete res.latitude;
                    delete res.formatted_address;
                    return res;
                })}
            })
        );
    }

    handlePrice({target: {id, value}}, type) {
        this.setState(
            state => ({
                searchParams: {...state.searchParams, [id]: {...state.searchParams[id], [type]: value}}
            })
        );
    }

    handleKeyPress(e) {
        const {onChange} = this.props;
        const {siocId} = this.state;
        if (e.key === 'Enter') {
            onChange(siocId);
        }
    }

    render() {
        if (this.state.searchParams.publicationType === undefined) {
            this.state.searchParams.publicationType = 'Alquiler';
        }
        return (
            <Container fluid className="animated fadeIn landing">
                <Row className="main">
                    <Col sm={{size: 6, offset: 3}} className="text-center">
                        <img src={siocLogoInicio} alt="SIOC Logo"/>
                        {/*<FormGroup>
                            <InputGroup bsSize="large">
                                <FormControl
                                    className="home-search-input"
                                    type="number"
                                    placeholder="Código"
                                    value={this.state.siocId}
                                    maxLength={6}
                                    onChange={e => this.handleChange(e)}
                                    onKeyPress={e => this.handleKeyPress(e)}
                                />
                            </InputGroup>
                        </FormGroup>*/}
                        <h3>
                            Miles de propiedades para <b>comprar</b>,
                            <br/> <b>vender</b> o <b>alquilar</b> están esperando tu decisión!
                        </h3>
                    </Col>
                    <Col sm={{size: 6, offset: 3}}>
                        <Col sm={12}>
                            <FormGroup>
                                <ButtonGroup className="d-flex">
                                    <Button
                                        outline
                                        onClick={() => this.handleType('publicationType', 'Alquiler')}
                                        active={this.state.searchParams.publicationType === 'Alquiler'}
                                    >ALQUILER
                                    </Button>
                                    <Button
                                        outline
                                        onClick={() => this.handleType('publicationType', 'Venta')}
                                        active={this.state.searchParams.publicationType === 'Venta'}
                                    >
                                        VENTA
                                    </Button>
                                </ButtonGroup>
                            </FormGroup>
                        </Col>

                        <Col sm={12}>
                            <FormGroup>
                                <MultipleSearchBox onChange={e => this.handleAddress(e)}/>
                            </FormGroup>
                        </Col>

                        <Col sm={12}>
                            <FormGroup>
                                <Select
                                    isMulti
                                    options={groupedOptions}
                                    placeholder="Seleccione Tipo de Propiedad"
                                    formatGroupLabel={formatGroupLabel}
                                    onChange={e => this.handleSelect(e)}
                                />
                            </FormGroup>
                        </Col>

                        <Row>
                            <Col sm={2}>
                                <ButtonGroup className="d-flex">
                                    <Button 
                                        outline 
                                        onClick={() => this.handleType('publicationType', 'Alquiler')}
                                        active={this.state.searchParams.publicationType === 'Alquiler'}
                                    >$
                                    </Button>
                                    <Button
                                        outline
                                        onClick={() => this.handleType('publicationType', 'Venta')}
                                        active={this.state.searchParams.publicationType === 'Venta'}
                                    >US$
                                    </Button>
                                </ButtonGroup>    
                            </Col>
                            <Col sm={5}>
                                <FormGroup>
                                    <Input
                                        type="number"
                                        placeholder="Precio Desde"
                                        id="price"
                                        value={this.state.searchParams.price.min !== undefined ? this.state.searchParams.price.min : ''}
                                        onChange={e => this.handlePrice(e, 'min')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={5}>
                                <FormGroup>
                                    <Input
                                        type="number"
                                        placeholder="Precio Hasta"
                                        id="price"
                                        value={this.state.searchParams.price.max !== undefined ? this.state.searchParams.price.max : ''}
                                        onChange={e => this.handlePrice(e, 'max')}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Col sm={12}>
                            <Button size="lg" block onClick={() => this.handleSubmit()}>Buscar</Button>
                        </Col>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Splash;
