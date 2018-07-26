import React, {Component} from 'react';
import { 
    Container, Row, Col, 
    TabContent, TabPane, 
    Nav, NavItem, NavLink, 
    Card, CardText, CardBody, CardTitle, CardSubtitle,
    Table } from 'reactstrap';
import classnames from 'classnames';

class Reports extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
      }

      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Container fluid className="animated fadeIn">
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => { this.toggle('1'); }}
                        >
                          Day
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2' })}
                          onClick={() => { this.toggle('2'); }}
                        >
                          Week 
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '3' })}
                          onClick={() => { this.toggle('3'); }}
                        >
                          Month 
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '4' })}
                          onClick={() => { this.toggle('4'); }}
                        >
                          Custom  
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <Row>
                          <Col sm="12">
                            <h4>Totales Diarios</h4>
                          </Col>
                          
                            <Col>
                              <Card>
                                <CardBody>
                                  <CardTitle>Propiedades</CardTitle>
                                </CardBody>
                                <CardBody>
                                  <CardText></CardText>
                                </CardBody>
                              </Card>
                            </Col>
                            <Col>
                              <Card>
                                <CardBody>
                                  <CardTitle>En Venta</CardTitle>
                                </CardBody>
                                <CardBody>
                                  <CardText></CardText>
                                </CardBody>
                              </Card>
                            </Col>
                            <Col>
                              <Card>
                                <CardBody>
                                  <CardTitle>En Alquiler</CardTitle>
                                </CardBody>
                                <CardBody>
                                  <CardText></CardText>
                                </CardBody>
                              </Card>
                            </Col>
                            <Col>
                              <Card>
                                <CardBody>
                                  <CardTitle>En Venta y Alquiler</CardTitle>
                                </CardBody>
                                <CardBody>
                                  <CardText></CardText>
                                </CardBody>
                              </Card>
                            </Col>
                            <Col>
                              <Card>
                                <CardBody>
                                  <CardTitle>No Publicadas</CardTitle>
                                </CardBody>
                                <CardBody>
                                  <CardText></CardText>
                                </CardBody>
                              </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                              <Card>
                                <CardBody>
                                  <CardTitle>Vendidas</CardTitle>
                                </CardBody>
                                <CardBody>
                                  <CardText></CardText>
                                </CardBody>
                              </Card>
                            </Col>
                            <Col>
                              <Card>
                                <CardBody>
                                  <CardTitle>Alquiladas</CardTitle>
                                </CardBody>
                                <CardBody>
                                  <CardText></CardText>
                                </CardBody>
                              </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Dadas de baja</CardTitle>
                                    </CardBody>
                                    <CardBody>
                                        <CardText></CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                          <Table hover size="sm">
                            <thead>
                              <tr>
                                <th>Inmobiliaria</th>
                                <th>Propiedades</th>
                                <th>Venta</th>
                                <th>Alquiler</th>
                                <th>Venta y Alquiler</th>
                                <th>No Publicadas</th>
                                <th>Vendidas</th>
                                <th>Alquiladas</th>
                                <th>Dadas de baja</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">A. Lundin & Cia.</th>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                              </tr>
                              <tr>
                                <th scope="row">A. Lundin & Cia.</th>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                              </tr>
                              <tr>
                                <th scope="row">A. Lundin & Cia.</th>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col sm="6">
                            
                          </Col>
                          <Col sm="6">
                            
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </Container>
            </div>
        );
    }
}

export default Reports;
