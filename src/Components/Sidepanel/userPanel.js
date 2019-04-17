import React, { Component } from 'react';
import { Grid, GridColumn, GridRow, Header, Icon, Dropdown, Image, Modal, Input, Button } from 'semantic-ui-react';
import './userPannel.css';
import AvatarEditor from 'react-avatar-editor';
import firebase from '../firebase';

class UserPanel extends Component {
    state = {
        user: this.props.currentUser,
        modal: false,
        previewImage: '',
        croppedImage: '',
        blob: '',
        uploadCroppedImage: '',
        storageRef: firebase.storage().ref(),
        userRef: firebase.auth().currentUser,
        usersRef: firebase.database().ref('users'),
        metadata: {
            contentType: 'image/jpeg'
        }
    };

    openModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });

    DropdownOptions = () => [
        {
            key: 'user',
            text: <span><strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span onClick={this.openModal}>Cambiar Avatar</span>
        },
        {
            key: 'signout',
            text: <span onClick={this.handleSignOut} >Salir</span>
        }
    ];

    uploadCroppedImage = () => {
        const { storageRef, userRef, blob, metadata } = this.state;

        storageRef
            .child(`avatars/users/${userRef.uid}`)
            .put(blob, metadata)
            .then(snap => {
                snap.ref.getDownloadURL().then(downloadURL => {
                    this.setState({ uploadCroppedImage: downloadURL }, () => 
                    this.changeAvatar())
                })
            })
    };

    changeAvatar = () => {
        this.state.userRef
            .updateProfile({
                photoURL: this.state.uploadCroppedImage
            })
            .then(() => {
                console.log('photoURL updated');
                this.closeModal();
            })
            .catch(err => {
                console.error(err);
            })

            this.state.usersRef
                .child(this.state.user.uid)
                .update({ avatar: this.state.uploadCroppedImage })
                .then(() => {
                    console.log('User avatar updated');
                })
                .catch(err => {
                    console.error(err);
                })
    };

    handleCropImage = () => {
        if (this.avatarEditor) {
            this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
                let imageUrl = URL.createObjectURL(blob);
                this.setState({ 
                    croppedImage: imageUrl,
                    blob
                 })
            });
        }
    };

    handleChange = event => {
        const file = event.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                this.setState({ previewImage: reader.result });
            });
        }
    };

    handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => console.log('Signed out!'))
    };

    render() {
        const { user, modal, previewImage, croppedImage } = this.state;

        return (
            <Grid style={{ background: '#212121' }}>
                <GridColumn>
                    <GridRow className='container'>
                            <div className='logo'></div>
                        <Header as='h4'>
                        <Dropdown 
                            className='dropDown'
                            trigger={
                                    <span>
                                        <Image src={user.photoURL} spaced='right' avatar />
                                        {user.displayName}
                                    </span>} 
                                  options={this.DropdownOptions()} 
                        />
                        </Header>
                    </GridRow>
                   
                   {/* change user avatar modal */}
                   <Modal basic open={modal} onClose={this.closeModal}>
                            <Modal.Header>Change Avatar</Modal.Header>
                            <Modal.Content>
                                <Input
                                    onChange={this.handleChange} 
                                    fluid
                                    type='file'
                                    label='New Avatar'
                                    name='previewImage'
                                />
                                <Grid centered stackable columns={2}>
                                    <Grid.Row centered>
                                        <Grid.Column className='ui center aligned grid'>
                                            {previewImage && (
                                                <AvatarEditor
                                                    ref={node => (this.avatarEditor = node)} 
                                                    image={previewImage}
                                                    width={120}
                                                    height={120}
                                                    border={50}
                                                    scale={1.2}
                                                />
                                            )}
                                        </Grid.Column>
                                        <GridColumn>
                                            {croppedImage && (
                                                <Image 
                                                    style={{ margin: '3.5em auto' }}
                                                    width={100}
                                                    height={100}
                                                    src={croppedImage}
                                                />
                                            )}
                                        </GridColumn>
                                    </Grid.Row>
                                </Grid>
                            </Modal.Content>
                            <Modal.Actions>
                                {croppedImage && <Button color='green' inverted onClick={this.uploadCroppedImage}>
                                    <Icon name='save' /> Cambiar Avatar
                                </Button>}
                                <Button color='green' inverted onClick={this.handleCropImage}>
                                    <Icon name='image' /> Preview
                                </Button>
                                <Button color='red' inverted onClick={this.closeModal}>
                                    <Icon name='remove' /> Cancelar
                                </Button>
                            </Modal.Actions>
                   </Modal>
                </GridColumn>
            </Grid>
        );
    }
}

export default UserPanel;