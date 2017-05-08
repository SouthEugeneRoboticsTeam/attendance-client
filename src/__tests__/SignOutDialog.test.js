import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';

import SignOutDialog from '../components/dialogs/SignOutDialog';

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

describe('<SignOutDialog />', () => {

    const wrapper = mount(
        <SignOutDialog open={true} handleClose={()=>{}} />,
        {
            context: { muiTheme: getMuiTheme() },
            childContextTypes: { muiTheme: PropTypes.object }
        }
    );

    it('should be open', () => {
        expect(wrapper.find('Dialog').prop('open')).toEqual(true);
    });

    it('should be titled correctly', () => {
        expect(wrapper.find('Dialog').prop('title')).toEqual('Signed Out');
    });

});
