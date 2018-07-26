import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {FormControl, FormGroup} from 'react-bootstrap';
import {
    Container,
    Row,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    ButtonGroup,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import Select from 'react-select';
import Switch from 'react-switch';
import {map} from 'lodash';
import MultipleSearchBox from '../Maps/MultipleSearchBox';
import {requestFindDwellings, setMapRefs} from '../../actions/index';
import {groupedOptions} from '../../data/data';

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
};
const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center'
};

// const tagStyle = {
//     fontSize: '11px',
//     color: 'white',
//     padding: '3px',
//     backgroundColor: '#023a6f',
//     cursor: 'pointer',
//     margin: '2px'
// };

const heatingOptions = [
    {value: 'No posee', label: 'No posee'},
    {value: 'Gas natural', label: 'Gas natural'},
    {value: 'Gas envasado', label: 'Gas envasado'},
    {value: 'Tiro balanceado', label: 'Tiro balanceado'},
    {value: 'Estufas eléctricas', label: 'Estufas eléctricas'},
    {value: 'Split frío/calor', label: 'Split frío/calor'},
    {value: 'Salamandra', label: 'Salamandra'},
    {value: 'Hogar a leña', label: 'Hogar a leña'},
    {value: 'Hogar a gas', label: 'Hogar a gas'},
    {value: 'Radiadores', label: 'Radiadores'},
    {value: 'Caldera', label: 'Caldera'},
    {value: 'Caldera individual', label: 'Caldera individual'},
    {value: 'Losa radiante', label: 'Losa radiante'},
    {value: 'Zócalo radiante', label: 'Zócalo radiante'},
    {value: 'Piso radiante', label: 'Piso radiante'},
    {value: 'Eskabes', label: 'Eskabes'},
    {value: 'Central', label: 'Central'},
    {value: 'Central por radiadores', label: 'Central por radiadores'},
    {value: 'Central por ducto', label: 'Central por ducto'}
];

const formatGroupLabel = data => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);

// document.body.classList.toggle('aside-menu-hidden');

class Aside extends Component {
    static propTypes = {
        requestFindDwellings: PropTypes.func.isRequired,
        setMapRefs: PropTypes.func.isRequired,
        searchParams: PropTypes.shape({}),
        dwellings: PropTypes.arrayOf(PropTypes.shape({}))
    };

    static defaultProps = {
        searchParams: null,
        dwellings: []
    };

    constructor(props) {
        super(props);
        this.state = {
            searchParams:{
                price: {
                    min: undefined,
                    max: undefined
                }
            },
            searchModal: false,
            spacesModal: false,
            characteristicsModal: false,
            servlegModal: false,
            orderByModal: false,
            orderKeyByDate : 'newest',
        };
        if (this.props.searchParams) {
            this.state = {
                searchParams: this.props.searchParams,
                orderKey : 'newest'
            };
        }
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
                }), selectedLocations : e.map(addr=>{
                    let res = {...addr};
                    return res;
                })},
            })
        );
    }

    orderBy() {
        function compareValues(key, order='asc') {
            return function(a, b) {
                if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                  // property doesn't exist on either object
                    return 0; 
                }
                const varA = (typeof a[key] === 'string') ? 
                  a[key].toUpperCase() : a[key];
                const varB = (typeof b[key] === 'string') ? 
                  b[key].toUpperCase() : b[key];

                let comparison = 0;
                if (varA > varB) {
                  comparison = 1;
                } else if (varA < varB) {
                  comparison = -1;
                }
                return (
                  (order == 'desc') ? (comparison * -1) : comparison
                );
            };
        }
        if(this.state.orderKeyByPrice == "cheapest") {
            this.props.dwellings.sort(compareValues('price'));
        }
        if(this.state.orderKeyByPrice == "expensive") {
            this.props.dwellings.sort(compareValues('price', 'desc'));   
        }
        if(this.state.orderKeyByDate == "newest") {
            this.props.dwellings.sort(compareValues('createdAt', 'desc'));      
        }
        if(this.state.orderKeyByDate == "oldest") {
            this.props.dwellings.sort(compareValues('createdAt')); 
        }
        this.setState({
            ['orderByModal']: !this.state['orderByModal']
        });
    }

    removeTag(type, index) {
        if (type == 'loc' ) {
            let tags = this.state.searchParams.address;
            tags.splice(index, 1);
            this.setState({searchParams: {...this.state.searchParams, address: tags}});
        }
        if (type == 'subtype') {
            let tags = this.state.searchParams.subtype;
            tags.splice(index, 1);
            this.setState({searchParams: {...this.state.searchParams, subtype: tags}});
        }
        this.props.requestFindDwellings(this.state.searchParams);
    }

    toggleModals(modal) {
        this.setState({
            [modal]: !this.state[modal]
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

    handleHeating(e, type, subtype) {
        this.setState(
            state => ({
                searchParams: {
                    ...state.searchParams,
                    [type]: {...state.searchParams[type], [subtype]: e}
                }
            })
        );
    }

    handlePlusClick(type, subtype) {
        const {searchParams} = this.state;
        if (searchParams.spaces.bedrooms === undefined) {
            searchParams.spaces.bedrooms = 0;
        }
        if (searchParams.spaces.closets === undefined) {
            searchParams.spaces.closets = 0;
        }
        if (searchParams.spaces.rooms === undefined) {
            searchParams.spaces.rooms = 0;
        }
        if (searchParams.spaces.bathRoom === undefined) {
            searchParams.spaces.bathRoom = 0;
        }
        if (searchParams.spaces.toilette === undefined) {
            searchParams.spaces.toilette = 0;
        }
        if (searchParams.spaces.floors === undefined) {
            searchParams.spaces.floors = 0;
        }
        if (searchParams.features.floor === undefined) {
            searchParams.features.floor = 0;
        }
        if (searchParams.features.offices === undefined) {
            searchParams.features.offices = 0;
        }
        this.setState(
            state => ({
                searchParams: {
                    ...state.searchParams,
                    [type]: {...state.searchParams[type], [subtype]: (state.searchParams[type][subtype] + 1)}
                }
            })
        );
    }

    handleMinusClick(type, subtype) {
        if (this.state.searchParams[type][subtype] === 0) return;
        this.setState(
            state => ({
                searchParams: {
                    ...state.searchParams,
                    [type]: {...state.searchParams[type], [subtype]: (state.searchParams[type][subtype] - 1)}
                }
            })
        );
    }

    handleSwitch(e, type, subtype) {
        this.setState(
            state => ({
                searchParams: {
                    ...state.searchParams,
                    [type]: {...state.searchParams[type], [subtype]: e}
                }
            })
        );
    }

    handleChange({target: {id, value}}, type) {
        this.setState(
            state => ({
                searchParams: {...state.searchParams, [id]: {...state.searchParams[id], [type]: value}}
            })
        );
    }

    handleSearch(modal) {
        this.props.requestFindDwellings(this.state.searchParams);
        this.setState({
            [modal]: !this.state[modal]
        });
    }

    handleRefs(address, index) {
        this.props.setMapRefs({
            lat: address.latitude,
            lng: address.altitude,
            index
        });
    }

    renderContent() {
        // const size = {
        //     height: this.state.height
        // };
        const {dwellings} = this.props;
        const {searchParams} = this.state;
        return (
            <aside className="aside-menu">
                <div className="tab-content b-column">
                    <div className="inner-b-column">
                        <div className="prop">
                            <div className="inner-tab-content-fixed">
                                <div className="prop-header">
                                    <div className="prop-search-btns">
                                        <ButtonGroup className="btn-group-justified"> 
                                            <Button onClick={() => this.toggleModals('searchModal')}
                                            >Estoy Buscando
                                            </Button>
                                            <Button onClick={() => this.toggleModals('spacesModal')}
                                            >Espacios
                                            </Button>
                                            <Button onClick={() => this.toggleModals('characteristicsModal')}
                                            >Características
                                            </Button>
                                            <Button onClick={() => this.toggleModals('servlegModal')}
                                            >Serv./Leg.
                                            </Button>
                                        </ButtonGroup>
                                        <ButtonGroup className="btn-group-justified"> 
                                            <Button className="btn-order" onClick={() => this.toggleModals('orderByModal')}
                                            >Ordenar por
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                    <div className="head">
                                        <h3>
                                            <b>{dwellings.length}</b> en {searchParams.publicationType}
                                            <small>
                                                { this.state.searchParams.address? this.state.searchParams.address.map((tag, i)=>(
                                                    <Fragment key={"loc_tag"+i}>
                                                        <span>
                                                            { tag.city }
                                                            <FontAwesome name="close" onClick={ () => this.removeTag('loc', i)}/>
                                                        </span>
                                                    </Fragment>
                                                    )) : ''
                                                }
                                                { this.state.searchParams.subtype? this.state.searchParams.subtype.map((subtype, i)=>(
                                                    <Fragment key={"subtype_tag"+i}>
                                                        <span>
                                                            { subtype }
                                                            <FontAwesome name="close" onClick={ () => this.removeTag('subtype', i)}/>
                                                        </span>
                                                    </Fragment>
                                                    )) : ''
                                                }
                                                
                                            </small> 
                                        </h3>
                                    </div>

                                </div>
                            </div>
                            <div className="inner-tab-content-scroll">
                                {map(this.props.dwellings, (dwelling, index) => {
                                    let img_url = dwelling.images[0] !== undefined
                                                ? dwelling.images[0].secure_url.replace('/upload/', '/upload/w_335,q_auto,f_auto/')
                                                : 'https://res.cloudinary.com/sioc/image/upload/w_335,q_auto,f_auto/v1525712940/epnvioppkpvwye1qs66z.jpg';
                                    return (
                                    <div
                                        className="prop-detail"
                                        key={dwelling._id}
                                        onClick={() => this.props.history.push(`/propiedades/${dwelling._id}`)}
                                    >
                                        <div className="img" style={{width: '350px', height: '200px', backgroundSize: 'cover', backgroundImage: 'url("'+img_url+'")'}}></div>
                                        <div className="prop-text">
                                            <span>
                                                {dwelling.subtype} en {dwelling.address.streetName},{dwelling.address.city}
                                            </span>
                                            <Row>
                                                <Col sm={12} style={{padding: '0'}}>
                                                    <div className="pull-left">
                                                        {dwelling.price
                                                        ? <p>{dwelling.currency}<b>{dwelling.price}</b></p>
                                                        : <p>Consulte</p>}
                                                    </div>
                                                    <div className="pull-right">
                                                        <p>#{dwelling.siocId}</p>        
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="prop-detail-btns">
                                            <Button
                                                className="goto"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    this.handleRefs(dwelling.address, index);
                                                }}
                                            >
                                                <FontAwesome name="map-marker" />
                                            </Button>
                                            <Button
                                                className="like"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    this.handleFavorite(dwelling._id);
                                                }}
                                            >
                                                <FontAwesome name="heart" />
                                            </Button>
                                        </div>
                                    </div>
                                )})}
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }

    render() {
        let selectSubtype;
        const {searchParams} = this.state;
        if (searchParams.spaces === undefined) {
            searchParams.spaces = {};
        }
        if (searchParams.features === undefined) {
            searchParams.features = {};
        }
        if (searchParams.services === undefined) {
            searchParams.services = {};
        }
        if (searchParams.legal === undefined) {
            searchParams.legal = {};
        }
        if (searchParams.price === undefined) {
            searchParams.price = {};
        }
        if (searchParams.subtype !== undefined) {
            selectSubtype = (searchParams.subtype).map(a => ({value: a, label: a}));
        }
        return (
            <Fragment>
                {this.props.dwellings && this.renderContent()}
                <Modal
                    isOpen={this.state.searchModal}
                    toggle={() => this.toggleModals('searchModal')}
                    className="overlay-filters"
                >
                    <ModalHeader toggle={() => this.toggleModals('searchModal')}>Estoy Buscando</ModalHeader>
                    <ModalBody>
                        <Container className="animated fadeIn">
                            <Row>
                                <Col sm={12}>
                                    <FormGroup>
                                        <ButtonGroup className="btn-justified">
                                            <Button
                                                outline
                                                onClick={() => this.handleType('publicationType', 'Alquiler')}
                                                active={searchParams.publicationType === 'Alquiler'}
                                            >ALQUILER
                                            </Button>
                                            <Button
                                                outline
                                                onClick={() => this.handleType('publicationType', 'Venta')}
                                                active={searchParams.publicationType === 'Venta'}
                                            >
                                                VENTA
                                            </Button>
                                        </ButtonGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <FormGroup>
                                      <MultipleSearchBox onChange={e => this.handleAddress(e)} value={ this.props.searchParams? this.props.searchParams.selectedLocations : [] }/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12">
                                    <Select
                                        isMulti
                                        value={selectSubtype ? selectSubtype : null}
                                        options={groupedOptions}
                                        placeholder="Seleccione Tipo de Propiedad"
                                        formatGroupLabel={formatGroupLabel}
                                        onChange={e => this.handleSelect(e)}
                                    />
                                </Col>
                            </Row>
                            <br/><br/>
                            <Row>
                                <Col sm="12">
                                    <h4>Que precio estás buscando?</h4>
                                </Col>
                                <Col sm="2">
                                    <FormGroup>
                                        <ButtonGroup className="btn-justified">
                                            <Button
                                                outline
                                                onClick={() => this.handleType('currency', 'pesos')}
                                                active={searchParams.currency === 'pesos'}
                                            >Pesos
                                            </Button>
                                            <Button
                                                outline
                                                onClick={() => this.handleType('currency', 'dolares')}
                                                active={searchParams.currency === 'dolares'}
                                            >Dolares
                                            </Button>
                                        </ButtonGroup>
                                    </FormGroup>
                                </Col>
                                <Col sm="5">
                                    <FormGroup>
                                        <Input
                                            type="number"
                                            placeholder="Desde"
                                            id="price"
                                            value={searchParams.price.min ? searchParams.price.min : ''}
                                            onChange={e => this.handleChange(e, 'min')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm="5">
                                    <FormGroup>
                                        <Input
                                            type="number"
                                            placeholder="Hasta"
                                            id="price"
                                            value={searchParams.price.max ? searchParams.price.max : ''}
                                            onChange={e => this.handleChange(e, 'max')}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={() => this.handleSearch('searchModal')}
                            className="btn-submit-search"
                        >Aplicar
                        </Button>{' '}
                    </ModalFooter>
                </Modal>
                <Modal
                    isOpen={this.state.spacesModal}
                    toggle={() => this.toggleModals('spacesModal')}
                    className="overlay-filters"
                >
                    <ModalHeader toggle={() => this.toggleModals('spacesModal')}>Espacios</ModalHeader>
                    <ModalBody>
                        <Container className="animated fadeIn">
                            <Row>
                                <Col sm={2}>
                                    <Label>Dormitorios</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <Button
                                                color="light"
                                                onClick={() => this.handleMinusClick('spaces', 'bedrooms')}
                                            >
                                                <FontAwesome name="minus"/>
                                            </Button>
                                        </InputGroupAddon>
                                        <Input
                                            disabled
                                            value={searchParams.spaces.bedrooms ? searchParams.spaces.bedrooms : 0}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <Button
                                                color="light"
                                                onClick={() => this.handlePlusClick('spaces', 'bedrooms')}
                                            >
                                                <FontAwesome name="plus"/>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                                <Col sm={2}>
                                    <Label>Placard</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <Button
                                                color="light"
                                                onClick={() => this.handleMinusClick('spaces', 'closets')}
                                            >
                                                <FontAwesome name="minus"/>
                                            </Button>
                                        </InputGroupAddon>
                                        <Input
                                            disabled
                                            value={searchParams.spaces.closets ? searchParams.spaces.closets : 0}
                                        />
                                        <InputGroupAddon addonType="prepend">
                                            <Button
                                                color="light"
                                                onClick={() => this.handlePlusClick('spaces', 'closets')}
                                            >
                                                <FontAwesome name="plus"/>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                                <Col sm={2}>
                                    <Label>Ambientes</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <Button
                                                color="light"
                                                onClick={() => this.handleMinusClick('spaces', 'rooms')}
                                            >
                                                <FontAwesome name="minus"/>
                                            </Button>
                                        </InputGroupAddon>
                                        <Input
                                            disabled
                                            value={searchParams.spaces.rooms ? searchParams.spaces.rooms : 0}
                                        />
                                        <InputGroupAddon addonType="prepend">
                                            <Button
                                                color="light"
                                                onClick={() => this.handlePlusClick('spaces', 'rooms')}
                                            >
                                                <FontAwesome name="plus"/>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                                <Col sm={2}>
                                    <Label>Baños</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <Button
                                                color="light"
                                                onClick={() => this.handleMinusClick('spaces', 'bathRoom')}
                                            >
                                                <FontAwesome name="minus"/>
                                            </Button>
                                        </InputGroupAddon>
                                        <Input
                                            disabled
                                            value={searchParams.spaces.bathRoom ? searchParams.spaces.bathRoom : 0}
                                        />
                                        <InputGroupAddon addonType="prepend">
                                            <Button
                                                color="light"
                                                onClick={() => this.handlePlusClick('spaces', 'bathRoom')}
                                            >
                                                <FontAwesome name="plus"/>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                                <Col sm={2}>
                                    <Label>Toilette</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <Button
                                                color="light"
                                                onClick={() => this.handleMinusClick('spaces', 'toilette')}
                                            >
                                                <FontAwesome name="minus"/>
                                            </Button>
                                        </InputGroupAddon>
                                        <Input
                                            disabled
                                            value={searchParams.spaces.toilette ? searchParams.spaces.toilette : 0}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <Button
                                                color="light"
                                                onClick={() => this.handlePlusClick('spaces', 'toilette')}
                                            >
                                                <FontAwesome name="plus"/>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                                <Col sm={2}>
                                    <Label>Plantas</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <Button
                                                color="light"
                                                onClick={() => this.handleMinusClick('spaces', 'floors')}
                                            >
                                                <FontAwesome name="minus"/>
                                            </Button>
                                        </InputGroupAddon>
                                        <Input
                                            disabled
                                            value={searchParams.spaces.floors ? searchParams.spaces.floors : 0}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <Button
                                                color="light"
                                                onClick={() => this.handlePlusClick('spaces', 'floors')}
                                            >
                                                <FontAwesome name="plus"/>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2}>
                                    <Label>Living </Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'spaces', 'living')}
                                        checked={searchParams.spaces.living ? searchParams.spaces.living : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Living Comedor</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'spaces', 'livingDining')}
                                        checked={searchParams.spaces.livingDining
                                            ? searchParams.spaces.livingDining
                                            : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Comedor</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'spaces', 'diningRoom')}
                                        checked={searchParams.spaces.diningRoom
                                            ? searchParams.spaces.diningRoom
                                            : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Cocina</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'spaces', 'kitchen')}
                                        checked={searchParams.spaces.kitchen ? searchParams.spaces.kitchen : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Coc/Comedor</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'spaces', 'kitchenDining')}
                                        checked={searchParams.spaces.kitchenDining
                                            ? searchParams.spaces.kitchenDining
                                            : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Terraza</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'spaces', 'terrace')}
                                        checked={searchParams.spaces.terrace ? searchParams.spaces.terrace : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Balcón</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'spaces', 'balcony')}
                                        checked={searchParams.spaces.balcony ? searchParams.spaces.balcony : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Patio</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'spaces', 'backYard')}
                                        checked={searchParams.spaces.backYard ? searchParams.spaces.backYard : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Jardín</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'spaces', 'garden')}
                                        checked={searchParams.spaces.garden ? searchParams.spaces.garden : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Piscinas</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'spaces', 'swimmingPool')}
                                        checked={searchParams.spaces.swimmingPool
                                            ? searchParams.spaces.swimmingPool
                                            : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Quincho</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'spaces', 'barbecue')}
                                        checked={searchParams.spaces.barbecue ? searchParams.spaces.barbecue : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Baulera</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'spaces', 'storage')}
                                        checked={searchParams.spaces.storage ? searchParams.spaces.storage : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2}>
                                    <FormGroup controlId="spaces">
                                        <Label>Garage</Label>
                                        <FormControl
                                            componentClass="select"
                                            value={searchParams.spaces.garage}
                                            placeholder="Seleccione"
                                            onChange={e => this.handleChange(e, 'garage')}
                                        >
                                            <option label="Seleccione"/>
                                            <option value="No" label="No"/>
                                            <option value="Si, Cubierta" label="Si, Cubierta"/>
                                            <option value="2 Autos" label="2 Autos"/>
                                            <option value="3 Autos" label="3 Autos"/>
                                            <option value="4 Autos" label="4 Autos"/>
                                            <option value="5 Autos" label="5 Autos"/>
                                            <option value="6 o más autos" label="6 o más Autos"/>
                                            <option value="Semi Cubierta" label="Semi Cubierta"/>
                                            <option value="Descubierta" label="Descubierta"/>
                                            <option value="Optativa" label="Optativa"/>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                                <Col sm={2}>
                                    <FormGroup controlId="spaces">
                                        <Label>Lavadero</Label>
                                        <FormControl
                                            componentClass="select"
                                            value={searchParams.spaces.laundryRoom}
                                            placeholder="Seleccione"
                                            onChange={e => this.handleChange(e, 'laundryRoom')}
                                        >
                                            <option label="Seleccione"/>
                                            <option value="No" label="No"/>
                                            <option value="Cubierto" label="Cubierto"/>
                                            <option value="Dos" label="Dos"/>
                                            <option value="Incorporado" label="Incorporado"/>
                                            <option value="Descubierto" label="Descubierto"/>
                                            <option value="Semi Cubierto" label="Semi Cubierto"/>
                                            <option value="Compartido" label="Compartido"/>
                                        </FormControl>
                                    </FormGroup>
                                </Col>

                            </Row>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={() => this.handleSearch('spacesModal')}
                            className="btn-submit-search"
                        >Aplicar
                        </Button>{' '}
                    </ModalFooter>
                </Modal>
                <Modal
                    isOpen={this.state.characteristicsModal}
                    toggle={() => this.toggleModals('characteristicsModal')}
                    className="overlay-filters"
                >
                    <ModalHeader toggle={() => this.toggleModals('characteristicsModal')}>Características
                    </ModalHeader>
                    <ModalBody>
                        <Container className="animated fadeIn">
                            <Row>
                                <Col sm={2}>
                                    <FormGroup controlId="features">
                                        <Label>Sup. Semic.</Label>
                                        <FormControl
                                            type="number"
                                            placeholder="m2"
                                            onChange={e => this.handleChange(e, 'totalSurface')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={2}>
                                    <FormGroup controlId="features">
                                        <Label>Sup. Cub.</Label>
                                        <FormControl
                                            type="number"
                                            placeholder="m2"
                                            onChange={e => this.handleChange(e, 'coveredSurface')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={2}>
                                    <FormGroup controlId="features">
                                        <Label>Sup. Lote</Label>
                                        <FormControl
                                            type="number"
                                            placeholder="m2"
                                            onChange={e => this.handleChange(e, 'lotSurface')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={2}>
                                    <Label>Piso</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <Button
                                                color="light"
                                                onClick={() => this.handleMinusClick('features', 'floor')}
                                            >
                                                <FontAwesome name="minus"/>
                                            </Button>
                                        </InputGroupAddon>
                                        <Input
                                            disabled
                                            value={searchParams.features.floor ? searchParams.features.floor : 0}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <Button
                                                color="light"
                                                onClick={() => this.handlePlusClick('features', 'floor')}
                                            >
                                                <FontAwesome name="plus"/>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                                <Col sm={2}>
                                    <Label>Oficinas</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <Button
                                                color="light"
                                                onClick={() => this.handleMinusClick('features', 'offices')}
                                            >
                                                <FontAwesome name="minus"/>
                                            </Button>
                                        </InputGroupAddon>
                                        <Input
                                            disabled
                                            value={searchParams.features.offices ? searchParams.features.offices : 0}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <Button
                                                color="light"
                                                onClick={() => this.handlePlusClick('features', 'offices')}
                                            >
                                                <FontAwesome name="plus"/>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2}>
                                    <FormGroup controlId="features">
                                        <Label>Estado</Label>
                                        <FormControl
                                            componentClass="select"
                                            value={searchParams.features.status}
                                            placeholder="Seleccione"
                                            onChange={e => this.handleChange(e, 'status')}
                                        >
                                            <option label="Seleccione"/>
                                            <option value="Desconocido" label="Desconocido"/>
                                            <option value="Nuevo" label="Nuevo"/>
                                            <option value="A estrenar" label="A estrenar"/>
                                            <option value="Excelente" label="Excelente"/>
                                            <option value="Muy Bueno" label="Muy bueno"/>
                                            <option value="Bueno" label="Bueno"/>
                                            <option value="Usado" label="Usado"/>
                                            <option value="Regular" label="Regular"/>
                                            <option value="A reciclar" label="A reciclar"/>
                                            <option value="A demoler" label="A demoler"/>
                                            <option value="En construcción" label="En construcción"/>
                                            <option value="Refaccionado" label="Refaccionado"/>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                                <Col sm={2}>
                                    <FormGroup controlId="features">
                                        <Label>Año Constr.</Label>
                                        <FormControl
                                            type="number"
                                            value={searchParams.features.constructionYear}
                                            placeholder="----"
                                            maxLength={4}
                                            onChange={e => this.handleChange(e, 'constructionYear')}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={2}>
                                    <FormGroup
                                        controlId="features"
                                    >
                                        <Label>Ubicación</Label>
                                        <FormControl
                                            componentClass="select"
                                            value={searchParams.features.location}
                                            placeholder="Seleccione"
                                            onChange={e => this.handleChange(e, 'location')}
                                        >
                                            <option label="Seleccione"/>
                                            <option value="Desconocida" label="Desconocida"/>
                                            <option value="Frente" label="Frente"/>
                                            <option value="Contrafrente" label="Contrafrente"/>
                                            <option value="Lateral" label="Lateral"/>
                                            <option value="Interno" label="Interno"/>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                                <Col sm={2}>
                                    <FormGroup controlId="features">
                                        <Label>Orientación</Label>
                                        <FormControl
                                            componentClass="select"
                                            value={searchParams.features.orientation}
                                            placeholder="Seleccione"
                                            onChange={e => this.handleChange(e, 'orientation')}
                                        >
                                            <option disabledlabel="Seleccione"/>
                                            <option value="Desconocida" label="Desconocida"/>
                                            <option value="Norte" label="Norte"/>
                                            <option value="Sur" label="Sur"/>
                                            <option value="Este" label="Este"/>
                                            <option value="Oeste" label="Oeste"/>
                                            <option value="Noreste" label="Noreste"/>
                                            <option value="Noroeste" label="Noroeste"/>
                                            <option value="Sudeste" label="Sudeste"/>
                                            <option value="Sudoeste" label="Sudoeste"/>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                                <Col sm={2}>
                                    <FormGroup controlId="features">
                                        <Label>Luminosidad</Label>
                                        <FormControl
                                            componentClass="select"
                                            value={searchParams.features.luminosity}
                                            placeholder="Seleccione"
                                            onChange={e => this.handleChange(e, 'luminosity')}
                                        >
                                            <option disabledlabel="Seleccione"/>
                                            <option value="Desconocida" label="Desconocida"/>
                                            <option value="Excelente" label="Excelente"/>
                                            <option value="Muy Bueno" label="Muy bueno"/>
                                            <option value="Bueno" label="Bueno"/>
                                            <option value="Regular" label="Regular"/>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2}>
                                    <Label>Amoblado</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'features', 'furnished')}
                                        checked={searchParams.features.furnished
                                            ? searchParams.features.furnished
                                            : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Dep. Ser</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'features', 'depser')}
                                        checked={searchParams.features.depser ? searchParams.features.depser : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>SUM</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'features', 'sum')}
                                        checked={searchParams.features.sum ? searchParams.features.sum : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Deptos.</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'features', 'apartments')}
                                        checked={searchParams.features.apartments
                                            ? searchParams.features.apartments
                                            : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Fue refac.</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'features', 'refurbished')}
                                        checked={searchParams.features.refurbished
                                            ? searchParams.features.refurbished
                                            : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <FormGroup controlId="features">
                                        <Label>Para refac.</Label>
                                        <FormControl
                                            componentClass="select"
                                            value={searchParams.features.repair ? searchParams.features.repair : false}
                                            placeholder="Seleccione"
                                            onChange={e => this.handleChange(e, 'repair')}
                                        >
                                            <option label="Seleccione"/>
                                            <option value="No" label="No"/>
                                            <option value="Si" label="Si"/>
                                            <option value="1 Año" label="1 Año"/>
                                            <option value="2 Años" label="2 Años"/>
                                            <option value="3 Años" label="3 Años"/>
                                            <option value="4 Años" label="4 Años"/>
                                            <option value="5 Años" label="5 Años"/>
                                            <option value="6 Años" label="6 Años"/>
                                            <option value="7 Años" label="7 Años"/>
                                            <option value="10 Años" label="10 Años"/>
                                            <option value="Más de 10 años" label="Más de 10 años"/>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <Label>Calefacción</Label>
                                    <Select
                                        value={searchParams.features.heating}
                                        placeholder="Seleccione..."
                                        isMulti
                                        options={heatingOptions}
                                        onChange={e => this.handleHeating(e, 'features', 'heating')}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={() => this.handleSearch('characteristicsModal')}
                            className="btn-submit-search"
                        >Aplicar
                        </Button>{' '}
                    </ModalFooter>
                </Modal>
                <Modal
                    isOpen={this.state.servlegModal}
                    toggle={() => this.toggleModals('servlegModal')}
                    className="overlay-filters"
                >
                    <ModalHeader toggle={() => this.toggleModals('servlegModal')}>Servicios y Legales</ModalHeader>
                    <ModalBody>
                        <Container className="animated fadeIn">
                            <Row>
                                <Col sm={2}>
                                    <FormGroup controlId="services">
                                        <Label>Expensas</Label>
                                        <FormControl
                                            type="number"
                                            value={searchParams.features.expenses}
                                            placeholder="$"
                                            onChange={e => this.handleChange(e, 'expenses')}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2}>
                                    <Label>Gas</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'services', 'gas')}
                                        checked={searchParams.services.gas ? searchParams.services.gas : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Agua</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'services', 'water')}
                                        checked={searchParams.services.water ? searchParams.services.water : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Cloacas</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'services', 'sewer')}
                                        checked={searchParams.services.sewer ? searchParams.services.sewer : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Teléfono</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'services', 'phone')}
                                        checked={searchParams.services.phone ? searchParams.services.phone : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Asfalto</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'services', 'pavement')}
                                        checked={searchParams.services.pavement
                                            ? searchParams.services.pavement
                                            : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Electricidad</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'services', 'electricity')}
                                        checked={searchParams.services.electricity
                                            ? searchParams.services.electricity
                                            : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Cable</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'services', 'cableTv')}
                                        checked={searchParams.services.cableTv
                                            ? searchParams.services.cableTv
                                            : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Seguridad</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'services', 'security')}
                                        checked={searchParams.services.security
                                            ? searchParams.services.security
                                            : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2}>
                                    <Label>Apto Banco</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'legal', 'bank')}
                                        checked={searchParams.legal.bank ? searchParams.legal.bank : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label>Apto Prof.</Label>
                                    <Switch
                                        onChange={e => this.handleSwitch(e, 'legal', 'prof')}
                                        checked={searchParams.legal.prof ? searchParams.legal.prof : false}
                                        id="normal-switch"
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={38}
                                        className="react-switch"
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={() => this.handleSearch('servlegModal')}
                            className="btn-submit-search"
                        >Aplicar
                        </Button>{' '}
                    </ModalFooter>
                </Modal>
                <Modal
                    isOpen={this.state.orderByModal}
                    toggle={() => this.toggleModals('orderByModal')}
                    className="overlay-filters"
                >
                    <ModalHeader toggle={() => this.toggleModals('orderByModal')}>Ordenar por</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col sm={12}>
                                <h4>Precio</h4>
                                <ButtonGroup className="d-flex">
                                    <Button 
                                        outline
                                        onClick={ e => { this.setState({ orderKeyByPrice: 'cheapest'}) }} 
                                        active={this.state.orderKeyByPrice === 'cheapest'}
                                    >Menor Precio
                                    </Button>
                                    <Button
                                        outline
                                        onClick={ e => { this.setState({ orderKeyByPrice: 'expensive'}) }}
                                        active={this.state.orderKeyByPrice === 'expensive'}
                                    >Mayor Precio
                                    </Button>
                                </ButtonGroup>        
                            </Col>
                            <div className="padding-sm"></div>
                            <Col sm={12}>
                                <h4>Antiguedad de la publicación</h4>
                                <ButtonGroup className="d-flex">
                                    <Button
                                        outline
                                        onClick={ e => { this.setState({ orderKeyByDate: 'newest'}) }}
                                        active={this.state.orderKeyByDate === 'newest'}
                                    >Subidas Recientes
                                    </Button>
                                    <Button
                                        outline
                                        onClick={ e => { this.setState({ orderKeyByDate: 'oldest'}) }}
                                        active={this.state.orderKeyByDate === 'oldest'}
                                    >Subidas mas antiguas
                                    </Button>
                                </ButtonGroup>
                            </Col>
                            <div className="padding-sm"></div>
                            <Col sm={12}>
                                <h4>Filtro para inmobiliarias</h4>
                                <ButtonGroup className="d-flex">
                                    <Button
                                        outline
                                    >Mostrar sólo de mi inmobiliaria
                                    </Button>
                                    <Button
                                        outline
                                    >De todo el SIOC
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={ e => { this.orderBy()}} 
                            className="btn-submit-search"
                        >Aplicar
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        dwellings: state.dwelling.searchedDwellings,
        searchParams: state.dwelling.searchParams
    }),
    dispatch => ({
        requestFindDwellings: searchParams => dispatch(requestFindDwellings(searchParams)),
        setMapRefs: currentPosition => dispatch(setMapRefs(currentPosition))
    })
)(Aside);

