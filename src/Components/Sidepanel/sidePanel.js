import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './userPanel';
import Channels from './channels';
import DirectMessages from './directMessages';
import Starred from './starred';

class SidePanel extends Component {
    render() {
        const { currentUser } = this.props;

        return (
            <Menu
                size='large'
                inverted
                fixed='left'
                vertical
                style={{ background: '#212121', fontSize: '1.2rem' }}
            >
                <UserPanel currentUser={currentUser} />
                <Starred currentUser={currentUser} />
                <Channels currentUser={currentUser} />
                <DirectMessages currentUser={currentUser} />
            </Menu>
        );
    }
}

export default SidePanel;