import React from 'react'

class FBLogin extends React.Component {
  constructor(props) {
    super(props)

    this.statusChangeCallback = this.statusChangeCallback.bind(this)
  }
  componentDidMount() {
    const self = this
    window.fbAsyncInit = function() {
      if (typeof(FB) !== 'undefined' && FB != null) {
        FB.init({
          appId      : '379023262709072',
          cookie: true,
          xfbml      : true,
          version    : 'v2.10'
        })

        FB.getLoginStatus(function(response) {
          self.statusChangeCallback(response);
        })

        FB.Event.subscribe('auth.login', function(response) {
          self.testAPI()
        });

        FB.AppEvents.logPageView();
      } else {
        console.log('NO FB')
      }

    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  checkLoginState() {
    const self = this
    window.FB.getLoginStatus(function(response) {
      self.statusChangeCallback(response);
    });
  }

  statusChangeCallback(response) {
    console.log('statusChangeCallback', response)
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      // document.getElementById('status').innerHTML = 'Please log ' +
      //   'into this app.';
    }
  }

  testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    const self = this
    const { dispatch, successAuth } = this.props
    window.FB.api('/me?fields=id,email,cover,name,first_name,last_name,age_range,link,gender,hometown', function(response) {
      console.log('response', response)
      dispatch(successAuth({
        provider: 'facebook',
        data: response
      }))
      self.props.router.push('/landing')
      // document.getElementById('status').innerHTML =
      //   'Thanks for logging in, ' + response.name + '!';
    });
  }
  render() {
    return(
      <div id="fb-root">
        <div
          className="fb-login-button"
          data-scope = "public_profile,email,user_hometown"
          data-width="" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="false"
        ></div>
      </div>
    )
  }
}

export default FBLogin
