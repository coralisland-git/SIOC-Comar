import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import {
    Grid,
    Row,
    Col,
    FormControl,
    FormGroup,
    Button,
    ButtonToolbar
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Dwelling } from '../../../../model/index';
import { requestSaveDwelling } from '../../../../actions/index';
import ImagesService from '../../../../services/images';
import Http from '../../../../services/images';

const CLOUDINARY_UPLOAD_PRESET = 'dq2mxij7';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/sanchez-cia/image/upload';
const CLOUDINARY_API_KEY = '773121298349798';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
    float:'left',
    width:'auto'
});

// const apiKey = 651684583823529;
// const uploadPreset = 'gceayald';

class Description extends Component {

    static propTypes = {
        requestSaveDwelling: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        dwelling: PropTypes.shape({})
    };

    static defaultProps = {
        dwelling: new Dwelling()
    };

    constructor(props) {
        super(props);
        this.state = {
            dwelling: new Dwelling()
        };
        if (this.props.dwelling) {
            this.state = this.props;
        }

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    async onImageDrop(files) {

        let uploadedFiles = await ImagesService.upload(files);
        uploadedFiles = [...this.state.dwelling.images, ...uploadedFiles];
        this.setState(
            state => ({
                dwelling: (Object.assign(state.dwelling, { images: uploadedFiles }))
            })
        )

    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        const imgages = reorder(
            this.state.dwelling.images,
            result.source.index,
            result.destination.index
        );
        this.state.dwelling.images = imgages;
    }

    async onHandleDeleteImg(event, index) {
        const images = [...this.state.dwelling.images];
        images.splice(index, 1);
        const result = await ImagesService.deleteImg(event.target.id);
        this.setState(
            state => ({
                dwelling: (Object.assign(state.dwelling, { images }))
            })
        );
    }

    handleChange({ target: { id, value } }) {
        this.setState(
            state => ({
                dwelling: (Object.assign(state.dwelling, { [id]: value }))
            })
        );
    }

    handleSubmit() {
        const { dwelling } = this.state;
        this.props.requestSaveDwelling(dwelling);
        this.props.history.push('/dwellings/latest');
    }

    render() {
        const { dwelling } = this.state;
        return (
            <Grid className="animated fadeIn">
                <Row>
                    <Col sm={12} className="multi-steps">
                        <ol className="in-multi-steps text-top">
                            <li>
                                <span>
                                    <FontAwesome
                                        name="home"
                                        style={{ color: 'rgba(0,0,0,.3)' }}
                                    />
                                </span>
                            </li>
                            <li className="">
                                <span>
                                    <FontAwesome
                                        name="cog"
                                        spin
                                        style={{ color: 'rgba(0,0,0,.3)' }}
                                    />
                                </span>
                            </li>
                            <li className="current">
                                <span>
                                    <FontAwesome name="check-square" style={{ color: 'rgba(0,0,0,.3)' }} />
                                </span>
                            </li>
                        </ol>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <h2>Descripción General</h2>
                        <FormGroup controlId="generalDescription">
                            <FormControl
                                componentClass="textarea"
                                value={dwelling.generalDescription}
                                onChange={e => this.handleChange(e)}
                                placeholder="Escriba una Descripcion general"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <h2>Descripción Privada</h2>
                        <FormGroup controlId="privateDescription">
                            <FormControl
                                componentClass="textarea"
                                value={dwelling.privateDescription}
                                onChange={e => this.handleChange(e)}
                                placeholder="Escriba una Descripcion privada"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <h2>Carga de Imágenes </h2>

                        <Dropzone

                            onDrop={this.onImageDrop.bind(this)}
                            multiple={true}
                            accept="image/*">
                            <div>Drop an image or click to select a file to upload.</div>
                        </Dropzone>

                        {dwelling.images.length!==0 &&
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <Droppable droppableId="droppable" direction="horizontal">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}
                                            {...provided.droppableProps}
                                        >
                                            {dwelling.images.map((newImage, index) => (
                                                <Draggable key={newImage.public_id} draggableId={newImage.public_id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            <img src={newImage.secure_url.replace('/upload/', '/upload/w_200,q_auto,f_auto/')} alt="" style={{ marginLeft: '30px' }} width="auto" height="140"/>
                                                            <Button
                                                                id={newImage.delete_token}
                                                                bsSize="lg"
                                                                className={{
                                                                    verticalAlign: 'top',
                                                                    paddingLeft: '1px',
                                                                    lineHeight: '0px',
                                                                    width: '16px',
                                                                    height: '16px'
                                                                }}
                                                                onClick={e => this.onHandleDeleteImg(e, index)}
                                                            >
                                                                Borrar
                                                            </Button>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        }

                    </Col>

                </Row>
                <Row>
                    <Col sm={6}>
                        <ButtonToolbar className="pull-left">
                            <Button onClick={() => this.props.history.push('/admin/dwellings/characteristics')}>Atrás</Button>
                        </ButtonToolbar>
                    </Col>
                    <Col sm={6}>
                        <ButtonToolbar className="pull-right">
                            <Button onClick={() => this.handleSubmit()}>Guardar</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default connect(
    state => ({
        dwelling: state.dwelling.dwelling
    }),
    dispatch => ({
        requestSaveDwelling: dwelling => dispatch(requestSaveDwelling(dwelling))
    })
)(Description);
