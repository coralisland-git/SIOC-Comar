import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

import Latest from '../Dwellings/Latest';

const Dwellings = ({match: {path}}) => (
    <Switch>
        <Route path={`${path}/latest`} name="Latest" component={Latest} exact/>
    </Switch>
);

Dwellings.propTypes = {
    match: PropTypes.shape({path: PropTypes.string}).isRequired
};

export default Dwellings;
