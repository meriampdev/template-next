import React from 'react'

class GoogleLogin extends React.PureComponent {
  constructor(props) {
    super(props)

    this.onSignIn = this.onSignIn.bind(this)
    this.onFailure = this.onFailure.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
  }

  componentDidMount() {
    const self = this
    if(window.gapi) {
      window.gapi.signin2.render('my-signin2', {
          'scope': 'profile email',
          'width': 255,
          'height': 40,
          'border-radius': 3,
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': self.onSuccess,
          'onfailure': self.onFailure
        });
    }
  }

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    let profile = googleUser.getBasicProfile();

    const { dispatch, successAuth } = this.props
    dispatch(successAuth({
      provider: 'google',
      data: profile
    }))
    this.props.router.push('/landing')
  }

  onFailure(error) {
    console.log(error);
  }

  render() {
    console.log('props', this.props)
    return(
      <div id="my-signin2"></div>
    )
  }
}

export default GoogleLogin
