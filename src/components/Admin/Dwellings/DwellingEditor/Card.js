import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import Propiedades from '../../../Propiedades';
import '../../../../sass/common.scss';


class Card extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string
            })
        })
    };

    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    render() {
        const {id} = this.props.match.params;
        return (
            <Fragment>
                <Propiedades id={id}/>
                <Row>
                    <Col sm={12} className="admin-prop-footer">
                        <div className="prop-footer-detail">
                            <h2>Nombre Inmobiliaria</h2>
                            <p><em>Cargado por:</em> <b>user_that_has_created_dwelling</b> { } -  20 Julio 2018 18:21hs { }</p>
                        </div>
                        <hr/>
                        <div className="prop-footer-btns">
                            <div className="float-left inline-fix">
                                <Link to="/admin/dwellings/General">
                                    <Button>
                                        <FontAwesome name="pencil"/> {' '}
                                        Editar propiedad
                                    </Button>
                                </Link>
                                <Col></Col>
                                <FormGroup>
                                    <Input
                                        type="select"
                                        id="occupationStatus"
                                        /*value={dwelling.occupationStatus}
                                        onChange={e => this.handleChange(e)}*/
                                    >
                                        <option disabled value="">Estado Ocupacional</option>
                                        <option value="Disponible">Disponible</option>
                                        <option value="Alquilada">Alquilada</option>
                                        <option value="Vendida">Vendida</option>
                                        <option value="Reservada">Reservada</option>
                                        <option value="Suspendida">Suspendida</option>
                                        <option value="Tasaciones">Tasaciones</option>
                                    </Input>
                                </FormGroup>
                            </div>
                            <div className="float-right">
                                <Button onClick={this.toggle}>
                                    <FontAwesome name="folder-open"/> {' '}
                                    Pedido de visita
                                </Button>
                            </div>
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}>Pedido de Visita</ModalHeader>
                                <ModalBody>
                                    Seleccionar Horario
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={this.toggle}>CONFIRMAR</Button>{' '}
                                    <Button color="white" onClick={this.toggle}>CANCELAR</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default (Card);
