import React, { Component } from 'react';
import { Button } from 'react-md'

class App extends Component {
  constructor(props) {
    super(props)

    this.applicationConfig = {
        clientID: 'd696213a-8f7b-45f6-907d-8b3c01c08f68',
        authority: "https://devenvims.b2clogin.com/tfp/devenvims.onmicrosoft.com/B2C_1_signupsignin1"
    };
    this.clientApplication = null
  }

  componentDidMount() {
    console.log('applicationConfig', this.applicationConfig)
    this.clientApplication = new window.Msal.UserAgentApplication(this.applicationConfig.clientID, this.applicationConfig.authority, function (errorDesc, token, error, tokenType) {
        // Called after loginRedirect or acquireTokenPopup
        console.log('errorDesc', errorDesc)
        console.log('token', token)
        console.log('error', error)
        console.log('tokenType', tokenType)
    });

  }

  onLogin() {
    let clientApplication = this.clientApplication
    let applicationConfig = this.applicationConfig
    const self = this
    const { dispatch, successAuth } = this.props
    clientApplication.loginPopup(applicationConfig.b2cScopes).then(function (idToken) {
      console.log('idToken', idToken)
      dispatch(successAuth({
        provider: 'microsoft',
        data: idToken
      }))
      self.props.router.push('/landing')
        // clientApplication.acquireTokenSilent(applicationConfig.b2cScopes).then(function (accessToken) {
        //   alert('acquireTokenSilent', accessToken)
        //   console.log('acquireTokenSilent', accessToken)
        // }, function (error) {
        //     clientApplication.acquireTokenPopup(applicationConfig.b2cScopes).then(function (accessToken) {
        //       alert('acquireTokenPopup', accessToken)
        //       console.log('acquireTokenPopup', accessToken)
        //     }, function (error) {
        //         // logMessage("Error acquiring the popup:\n" + error);
        //         console.log('error', error)
        //     });
        // })
    }, function (error) {
      console.log('error', error)
        // logMessage("Error during login:\n" + error);
    });
  }

  render() {
    return (
      <Button
        style={{background: '#4285f4', height: '40px', width: '255px'}}
        onClick={this.onLogin.bind(this)}
        flat swapTheming primary
        iconEl={<i className='fab fa-windows' style={{fontSize: '30px', marginLeft: '-3px'}} />}
      >Login with Microsoft</Button>
    );
  }
}

export default App;
