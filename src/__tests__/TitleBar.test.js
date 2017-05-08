import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';

import TitleBar from '../components/TitleBar';

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

describe('<TitleBar />', () => {

    const wrapper = mount(
        <TitleBar />,
        {
            context: { muiTheme: getMuiTheme() },
            childContextTypes: { muiTheme: PropTypes.object }
        }
    );

    it('should render the text', () => {
        expect(wrapper.text()).toEqual('SERT Attendance');
    });

});
