import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import FontAwesome from 'react-fontawesome';
import FaHeart from 'react-icons/lib/fa/heart';
import FaShare from 'react-icons/lib/fa/share-alt';
import FaImg from 'react-icons/lib/fa/image';
import FaHome from 'react-icons/lib/fa/home';
import FaBed from 'react-icons/lib/fa/bed';
import FaBank from 'react-icons/lib/fa/bank';

import MapWithSearchBox from '../Maps/MapWithSearchBox';

import ImgPropiedad from '../../../public/images/casa.jpg';

import {
    Container,
    Row,
    Col,
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    UncontrolledCarousel,
    Form, FormGroup, Input
} from 'reactstrap';

import {requestDwelling} from '../../actions/index';

class Propiedades extends Component {
    static propTypes = {
        requestFindDwelling: PropTypes.func.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string
            })
        }),
        dwelling: PropTypes.shape({}),
        id: PropTypes.string
    };

    static defaultProps = {
        dwelling: undefined,
        id: '',
        match: {}
    };

    constructor(props) {
        super(props);
        this.state = {
          modalShare: false,
          modalImg: false
        };

        this.toggleShare = this.toggleShare.bind(this);
        this.toggleImg = this.toggleImg.bind(this);
    }

    toggleShare() {
        this.setState({
          modalShare: !this.state.modalShare
        });
    }

    toggleImg() {
        this.setState({
          modalImg: !this.state.modalImg
        });
    }

    componentDidMount() {
        if (this.props.match.params === undefined) {
            const {id} = this.props;
            if (id) {
                this.props.requestFindDwelling(id);
            }
        } else {
            /* const params = new URLSearchParams(window.location.search);
            const id = params.get('id'); */
            const {id} = this.props.match.params;
            if (id) {
                this.props.requestFindDwelling(id);
            }
        }
    }

    renderContent() {
        const {dwelling} = this.props;

        let items = [];
        let backgroundImage = null;
        if (dwelling.images.length > 0) {
            backgroundImage = dwelling.images[0].secure_url;
            dwelling.images.map(image => {
                items.push({src:image.secure_url.replace('/upload/', '/upload/w_500,q_auto,f_auto/')});                
            });
        }
        else
            backgroundImage = ImgPropiedad;

        return (
            <div>
                <div className="head-img" style={{backgroundImage: `url(${backgroundImage})`}}>
                    <Button color="white" onClick={this.toggleShare}><FaShare/>{' '} Compartir</Button> {' '}
                    <Button color="white"><FaHeart/>{' '} Guardar</Button> {' '}

                    <Button className="pull-right" color="white" onClick={this.toggleImg}><FaImg/>{' '} Ver más</Button>
                </div>

                <Modal isOpen={this.state.modalShare} toggle={this.toggleShare} className={this.props.className}>
                  <ModalHeader toggle={this.toggleShare}>Compartir Propiedad</ModalHeader>
                  <ModalBody>
                    Facebook <br/> <hr/>
                    Whatsapp <br/> <hr/>
                    Mail
                  </ModalBody>
                  <ModalFooter>
                  </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalImg} toggle={this.toggleImg} className="modal-prop-imgs">
                    <UncontrolledCarousel items={items} />
                </Modal>

                <Container>
                    <Row>
                        <Col sm={12} className="head">
                            <div className="head-main">
                                <div className="price">
                                    {dwelling.price
                                    ? <span><small>{dwelling.currency}$</small>{dwelling.price}</span>
                                    : <span>Consulte Precio</span>}
                                </div>
                                <div className="head-pre">
                                    {dwelling.features.status}
                                </div>
                                <div className="head-title">
                                    {dwelling.subtype} en {dwelling.publicationType}, {dwelling.address.city}
                                </div>
                                <div className="head-sub">
                                    cód: {dwelling.siocId}
                                </div>
                            </div>
                        </Col>

                        <Col sm={12} className="content">
                            <div className="content-main">
                                <p> {dwelling.generalDescription}
                                </p>
                            </div>
                            <div className="content-info">
                                <h5>
                                    sup. total <b>{dwelling.features.totalSurface}</b>  •  sup. cubierta <b>{dwelling.features.coveredSurface}</b>
                                </h5>

                                {dwelling.spaces.rooms !== 0 &&
                                <span>
                                    <FaHome/> {' '}
                                    {dwelling.spaces.rooms} Ambientes
                                </span>}

                                {dwelling.spaces.bathRoom !== 0 &&
                                <span>
                                    <FontAwesome name="bath"/> {' '}
                                    {dwelling.spaces.bathRoom} Baños
                                </span>}

                                <span>
                                    <FaBed/> {' '}
                                    {dwelling.spaces.bedrooms} Dormitorios
                                </span>

                                {dwelling.legal.bank === undefined &&
                                <span>
                                    <FaBank/> {' '}
                                    Apto Banco
                                </span>}
                            </div>
                            <div className="content-main">
                                <h5>Características</h5>
                                <p>Luminosidad: {dwelling.features.luminosity} •  Orientación: {dwelling.features.orientation} •  Ubicación: {dwelling.features.location} •  Dtos x piso: {dwelling.features.apartments} •  Seguridad: {dwelling.features.security} •  Dep. Servicios: {dwelling.features.depser} •  Antiguedad: {dwelling.features.constructionYear} •  P/refacción: {dwelling.features.repair} •  Fue refaccionado: {dwelling.features.refurbished}</p>
                            </div>
                        </Col>

                        <Col sm={12} className="content-map">
                            {this.renderMap()}
                        </Col>

                        <Col sm={12} className="content">
                            <div className="content-main">
                                <h5>Servicios</h5>
                                <p>-Gas  -Cloacas  -Agua  -Corriente  -Teléfono  -Asfalto  -Electricidad  -Cable</p>
                            </div>
                        </Col>

                        <Col sm={12}>
                            <hr/>
                        </Col>

                        <Col sm={12} className="text-center">
                            <h3>Consultanos! Puede ser tuya...</h3>
                        </Col>

                        <Col sm={{size: 8, offset: 2}}>
                            <div className="pr-box text-center">
                                <h4>Escribinos ahora por whatsapp web:</h4>
                                <h3>+54 9 221 593 67 73</h3>
                            </div>
                        </Col>

                        <Col sm={{size: 8, offset: 2}}>
                            <div className="pr-box">
                                <h4>O dejanos un mensaje y nosotros nos comunicamos</h4>
                                <Form inline>
                                    <FormGroup className="mb-3 mr-2">
                                        <Input name="name" id="name" placeholder="Nombre" />
                                    </FormGroup>
                                    <FormGroup className="mb-3 mr-2">
                                        <Input name="phone" id="phone" placeholder="Cel." />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <Input type="email" name="email" id="email" placeholder="E-mail" />
                                    </FormGroup>
                                </Form>
                                
                                <FormGroup>
                                    <h5>Que inmobiliaria elegís?</h5>
                                    <Input type="select">
                                        <option disabled value="">Inmobiliarias Disponibles</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="textarea" name="text" id="text" placeholder="Mensaje" />
                                </FormGroup>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    renderMap() {
        return (
            <MapWithSearchBox dwellings={[this.props.dwelling]} selectedRef={this.props.currentPosition}/>
        );
    }

    render() {
        return (
            <div className="single-page">
                {this.props.dwelling && this.renderContent()}
            </div>
        );
    }
}


export default connect(
    state => ({
        dwelling: state.dwelling.dwelling
    }),
    dispatch => ({
        requestFindDwelling: id => dispatch(requestDwelling(id))
    })
)(Propiedades);
