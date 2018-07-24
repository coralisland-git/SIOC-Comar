import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Card, CardBody, Collapse, Button, ButtonGroup, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

export default class ListTeam extends React.Component {
  	constructor(props) {
	    super(props);

	    this.toggle = this.toggle.bind(this);
	    this.toggleCollapse = this.toggleCollapse.bind(this);
	    this.state = {
	    	collapse: false,
	      	activeTab: '1'
	    };
  	}

	toggleCollapse() {
		this.setState({collapse: !this.state.collapse});
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
		  this.setState({
		    activeTab: tab
		  });
		}
	}

  	render() {
	    return (
	      	<Container fluid className="animated fadeIn ask">
	      		<h3>Pedidos de Visita</h3>
		        <Nav tabs>
		          <NavItem>
		            <NavLink
		              className={classnames({ active: this.state.activeTab === '1' })}
		              onClick={() => { this.toggle('1'); }}
		            >
		              Nuevos
		            </NavLink>
		          </NavItem>
		          <NavItem>
		            <NavLink
		              className={classnames({ active: this.state.activeTab === '2' })}
		              onClick={() => { this.toggle('2'); }}
		            >
		              Confirmados
		            </NavLink>
		          </NavItem>
		          <NavItem>
		            <NavLink
		              className={classnames({ active: this.state.activeTab === '3' })}
		              onClick={() => { this.toggle('3'); }}
		            >
		              Finalizados
		            </NavLink>
		          </NavItem>
		        </Nav>
		        <TabContent activeTab={this.state.activeTab}>
		          <TabPane tabId="1">
		            <Row>
		                    <Col sm="12">
		                        <ListGroup>
		                            <ListGroupItem active tag="button" action onClick={this.toggleCollapse}>
		                                Fecha/hora - <b>Dirección</b> - <em>Estado (Solicitada/Confirmada)</em>
		                                <Collapse isOpen={this.state.collapse} style={{ padding: '25px'}}>
		                                    <Row>
		                                    	<Col sm="12"><hr/></Col>
		                                        <Col sm="12">
		                                            Interesado
		                                            <h3>Nombre_del_cliente</h3>
		                                        </Col>
		                                        <Col sm="3">
		                                            Vendedor
		                                            <h4>vendedor que solicita desde la ficha</h4>
		                                        </Col>
		                                        <Col sm="3">
		                                            Visitador
		                                            <h4>vendedor que hará la visita</h4>
		                                        </Col>
		                                        <Col sm="3">
		                                            Inmobiliaria
		                                            <h4>que posee la propiedad</h4>
		                                        </Col>
		                                        <Col sm="3">
		                                            Propietario
		                                            <h4>cliente perez</h4>
		                                        </Col>
		                                        <Col sm="3">
		                                            Código
		                                            <h4>321321</h4>
		                                        </Col>
		                                        <Col sm="12"><hr/></Col>
		                                        <Col sm="12" className="clearfix">
    												<div className="float-left">
	    												<Button color="light">Editar Fecha</Button>{' '}
				                                    	<Button color="light">Confirmar</Button>{' '}
			                                    	</div>
			                                    	<div className="float-right">
			                                    		<Button color="light">Finalizar</Button>
			                                    	</div>
		                                        </Col>
		                                    </Row>
		                                </Collapse>
		                            </ListGroupItem>
		                            <ListGroupItem tag="button" action>
		                                Fecha/hora - <b>Dirección</b> - <em>Estado (Solicitada/Confirmada)</em>
		                            </ListGroupItem>
		                        </ListGroup>
		                    </Col>
		                </Row>
		          </TabPane>
		          <TabPane tabId="2">
		            <Row>
			            <Col sm="6">
			                <h4>conf</h4>
			            </Col>
		            </Row>
		          </TabPane>
		          <TabPane tabId="3">
		            <Row>
		              	<Col sm="12">
		                	<h4>finalizadas</h4>
		              	</Col>
		            </Row>
		          </TabPane>
		        </TabContent>
	      	</Container>
	    );
  	}
}
