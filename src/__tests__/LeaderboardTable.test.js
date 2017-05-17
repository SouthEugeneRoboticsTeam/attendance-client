import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';

import LeaderboardTable from '../components/LeaderboardTable';

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

const dummyUsersObject = {
    1: {
        name: 'One',
        signedIn: false,
        mentor: false,
        total: {
            '2017test': 6000
        }
    },
    2: {
        name: 'Two',
        signedIn: false,
        mentor: false,
        total: {
            '2017test': 78
        }
    },
    500: {
        name: 'Three',
        signedIn: false,
        mentor: false,
        total: {
            '2017test': 192
        }
    },
    756: {
        name: 'Four',
        signedIn: false,
        mentor: false,
        total: {
            '2017test': 7245
        }
    }
};

const dummyUsersArray = [
    undefined,
    {
        name: 'One',
        signedIn: false,
        mentor: false,
        total: {
            '2017test': 6000
        }
    },
    {
        name: 'Two',
        signedIn: false,
        mentor: false,
        total: {
            '2017test': 78
        }
    },
    {
        name: 'Three',
        signedIn: false,
        mentor: false,
        total: {
            '2017test': 192
        }
    },
    {
        name: 'Four',
        signedIn: false,
        mentor: false,
        total: {
            '2017test': 7245
        }
    }
];

describe('<LeaderboardTable />', () => {

    it('should correctly sort users given an object', () => {
        const wrapper = mount(
            <LeaderboardTable season="2017test" users={dummyUsersObject} />,
            {
                context: { muiTheme: getMuiTheme() },
                childContextTypes: { muiTheme: PropTypes.object }
            }
        ).find('tbody');

        expect(wrapper.childAt(0).prop('rank')).toEqual(1);
        expect(wrapper.childAt(1).prop('rank')).toEqual(2);
        expect(wrapper.childAt(2).prop('rank')).toEqual(3);
        expect(wrapper.childAt(3).prop('rank')).toEqual(4);

        expect(wrapper.childAt(0).prop('name')).toEqual('Four');
        expect(wrapper.childAt(1).prop('name')).toEqual('One');
        expect(wrapper.childAt(2).prop('name')).toEqual('Three');
        expect(wrapper.childAt(3).prop('name')).toEqual('Two');
    });

    it('should correctly sort users given an array', () => {
        const wrapper = mount(
            <LeaderboardTable season="2017test" users={dummyUsersArray} />,
            {
                context: { muiTheme: getMuiTheme() },
                childContextTypes: { muiTheme: PropTypes.object }
            }
        ).find('tbody');

        expect(wrapper.childAt(0).prop('rank')).toEqual(1);
        expect(wrapper.childAt(1).prop('rank')).toEqual(2);
        expect(wrapper.childAt(2).prop('rank')).toEqual(3);
        expect(wrapper.childAt(3).prop('rank')).toEqual(4);

        expect(wrapper.childAt(0).prop('name')).toEqual('Four');
        expect(wrapper.childAt(1).prop('name')).toEqual('One');
        expect(wrapper.childAt(2).prop('name')).toEqual('Three');
        expect(wrapper.childAt(3).prop('name')).toEqual('Two');
    });

    it('should correctly render with no users', () => {
        const wrapper = mount(
            <LeaderboardTable season="2017test" users={[]} />,
            {
                context: { muiTheme: getMuiTheme() },
                childContextTypes: { muiTheme: PropTypes.object }
            }
        ).find('tbody');

        expect(wrapper.children().length).toEqual(0);
    });

});
