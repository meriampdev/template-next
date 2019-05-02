/*eslint-disable no-undef*/
import React from 'react'
import { connect } from 'react-redux'
import { Grid, Cell } from 'react-md'
import FBLogin from '../components/FacebookLogin'
import GoogleLogin from '../components/GoogleLogin'
import MicrosoftLogin from '../components/MicrosoftLogin'

import { successAuth, authLogout } from '../store/actions'

class Login extends React.Component {
  render() {
    return (
      <div className='login-page'>
        <Grid>
          <Cell size={12} className='login-btns-cell'>
            <span className='login-text'>Login</span>
          </Cell>
          <Cell size={12} className='login-btns-cell'>
            <FBLogin successAuth={successAuth} {...this.props} />
          </Cell>
          <Cell size={12} className='login-btns-cell'>
            <GoogleLogin successAuth={successAuth} {...this.props} />
          </Cell>
          <Cell size={12} className='login-btns-cell'>
            <MicrosoftLogin successAuth={successAuth} {...this.props} />
          </Cell>
        </Grid>
      </div>
    )
  }
}

export default connect(state => ({
  sample: state.sample,
  auth: state.auth
}))(Login)
