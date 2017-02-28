import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUserIfNeeded } from '../store/actions';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import CircularProgress from 'material-ui/CircularProgress';

const CLOUDINARY_UPLOAD_PRESET = 'epe9sifm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/tutorial-finder/upload';

class AddTutorial extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isSignedUp: false,
      uploadedFileCloudinaryUrl: ''
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
  }

  handleOpen () {
    this.setState({open: true});
  }

  handleClose () {
    this.setState({open: false});
  }

  handleSignup (e) {
    e.preventDefault();
    let { mongoCheckbox, reactCheckbox, reduxCheckbox, expressCheckbox, nodeCheckbox } = this.refs;
    let { tutorialTitle, tutorialLink, demoLink, githubLink } = this.refs;
    let typeOfTutorials = [mongoCheckbox, reactCheckbox, reduxCheckbox, expressCheckbox, nodeCheckbox];

    tutorialLink = tutorialLink.getValue();
    tutorialTitle = tutorialTitle.getValue();
    demoLink = demoLink.getValue();
    githubLink = githubLink.getValue();
    typeOfTutorials = typeOfTutorials.reduce((total, val) => {
      if (val.state.switched) {
        total.push(val.props.label);
      }
      return total;
    }, []);

    let image = this.state.uploadedFileCloudinaryUrl;
    console.log(tutorialLink, tutorialTitle, demoLink, githubLink, image, typeOfTutorials);

    fetch(`http://localhost:3001/users/tutorial?tutorialLink=${tutorialLink}&tutorialTitle=${tutorialTitle}&demoLink=${demoLink}&githubLink=${githubLink}&image=${image}&typeOfTutorials=${typeOfTutorials}`, {
      method: 'POST',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
    });
    // dispatch(registerUserIfNeeded(username, password, firstName, lastName));
  }

  onImageDrop (files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload (file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  render () {
    const actions = [
      <RaisedButton
        label='Ok'
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];

    const { isSignedUp } = this.state;
    const { isFetching } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/home' } };
    if (isSignedUp) {
      return (
        <Redirect to={from} />
      );
    }

    // if (isFetching) {
    //   return (
    //     <div className='container'>
    //       <CircularProgress size={80} thickness={5} />
    //     </div>
    //   );
    // }

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6'>
            <form onSubmit={this.handleSignup}>
              <div>
                <TextField
                  hintText='MERN'
                  floatingLabelText='Title'
                  ref='tutorialTitle'
                />
              </div>
              <div>
                <TextField
                  hintText='http://tutsplus.com/mern'
                  floatingLabelText='Tutorial Link'
                  ref='tutorialLink'
                />
              </div>
              <div>
                <Checkbox
                  label='Mongo'
                  ref='mongoCheckbox'
                />
                <Checkbox
                  label='React'
                  ref='reactCheckbox'
                />
                <Checkbox
                  label='Redux'
                  ref='reduxCheckbox'
                />
                <Checkbox
                  label='Express'
                  ref='expressCheckbox'
                />
                <Checkbox
                  label='Node'
                  ref='nodeCheckbox'
                />
              </div>
              <div>
                <RaisedButton label='Upload Image' onTouchTap={this.handleOpen} />
                <Dialog
                  title='Upload or drop an image'
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                  <Dropzone
                    multiple={false}
                    accept='image/*'
                    onDrop={this.onImageDrop}>
                    <p>Drop an image or click to select a file to upload.</p>
                  </Dropzone>
                  <div>
                    {this.state.uploadedFileCloudinaryUrl === '' ? null
                      : <div>
                        <p>{this.state.uploadedFile.name}</p>
                        <img src={this.state.uploadedFileCloudinaryUrl} />
                      </div>}
                  </div>
                </Dialog>
              </div>
              <div>
                <TextField
                  hintText='http://liveapp.herokuapps.com'
                  floatingLabelText='Live demo Link'
                  ref='demoLink'
                />
              </div>
              <div>
                <TextField
                  hintText='http://github.com/mern.git'
                  floatingLabelText='Github source Link'
                  ref='githubLink'
                />
              </div>
              <div className='form-group'>
                <RaisedButton type='submit' label='Add Tutorial' primary={true} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedSession, postsBySession } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySession['undefined'] || {
    isFetching: true,
    items: []
  };

  return {
    selectedSession,
    posts,
    isFetching,
    lastUpdated
  };
};

export default connect(mapStateToProps)(AddTutorial);
