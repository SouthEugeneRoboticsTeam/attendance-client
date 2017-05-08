import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';

import SignInDialog from '../components/dialogs/SignInDialog';

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

describe('<SignInDialog />', () => {

    const wrapper = mount(
        <SignInDialog open={true} handleClose={()=>{}} />,
        {
            context: { muiTheme: getMuiTheme() },
            childContextTypes: { muiTheme: PropTypes.object }
        }
    );

    it('should be open', () => {
        expect(wrapper.find('Dialog').prop('open')).toEqual(true);
    });

    it('should be titled correctly', () => {
        expect(wrapper.find('Dialog').prop('title')).toEqual('Signed In');
    });

});
