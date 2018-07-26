import React, {Component} from 'react';

class SidebarHeader extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <div className="sidebar-header">
                {this.props.name} {this.props.surname}
                <div className="sidebar-header-info"><em>rol</em> - <b>Inmobiliaria</b></div>
            </div>
        );
    }
}

export default SidebarHeader;
