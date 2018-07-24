import React, {Component} from 'react';

class SidebarHeader extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <div className="sidebar-header">
                {this.props.name} {this.props.surname}
            </div>
        );
    }
}

export default SidebarHeader;
