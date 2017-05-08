import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from '../containers/App';
import MainPage from '../containers/MainPage';

describe('<App />', () => {

    it('should render without crashing', () => {
        ReactDOM.render(<App />, document.createElement('root'));
    });

    it('should render the main page', () => {
        const wrapper = shallow(<App />);

        expect(wrapper.contains(<MainPage />)).toEqual(true);
    });

});
