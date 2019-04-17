import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import './App.css';
import { connect } from 'react-redux';

import SidePanel from './Sidepanel/sidePanel';
import Messages from './Messages/messages';
import MetaPanel from './MetaPanel/metaPanel';

const App = ({ currentUser, currentChannel, isPrivateChannel, userPosts }) => (
  <Grid columns='equal' className='app' style={{ background: '#eee' }}>
    <SidePanel 
      key={currentUser && currentUser.uid}
      currentUser={currentUser} />
    
    <GridColumn style={{ marginLeft: 320 }}>
      <Messages 
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
        isPrivateChannel={isPrivateChannel}
      />
    </GridColumn>

    <GridColumn width={4}>
      <MetaPanel 
        key={currentChannel && currentChannel.id}
        userPosts={userPosts}
        currentChannel={currentChannel}
        isPrivateChannel={isPrivateChannel} 
      />
    </GridColumn>
  </Grid>
)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  userPosts: state.channel.userPosts
});

export default connect(mapStateToProps)(App);
