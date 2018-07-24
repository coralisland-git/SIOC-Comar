import React, {Component} from 'react';
import { Container, Row, Col, Button, FormGroup, Input, Table } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

class Search extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <Container fluid className="animated fadeIn">
                <Row>
                    <Col sm="12">
                        <h2 className="pull-left">Usuarios <small><em>(120)</em></small></h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Mail</th>
                                    <th>Cel</th>
                                    <th>Rol</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Alguien Más</th>
                                    <td>alguien@mas.com</td>
                                    <td>221221221221</td>
                                    <td>Cliente</td>
                                    <td>
                                        <Button className="list-action-btn" color="light"><FontAwesome name="trash" /></Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Search;
