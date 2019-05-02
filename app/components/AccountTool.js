import React from 'react'
import { connect } from 'react-redux'
import {
  FontIcon,
  AccessibleFakeButton,
  IconSeparator,
  DropdownMenu,
  ListItem
} from 'react-md'
import { authLogout } from '../store/actions'

class UserTool extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      userName: ''
    }

  }

  componentDidMount() {
    const { auth } = this.props
    if(auth.auth) {
      const data = auth.auth
      console.log('ssssss', data)
      if(data.provider === 'google') {
        console.log('set')
        this.setState({ userName: data.data.ig })
      } else if(data.provider === 'facebook') {
        this.setState({ userName: data.data.name })
      } else {
        this.setState({ userName: 'Microsoft User' })
      }
    }
  }
  onLogOut() {
    // localStorage.removeItem('session')
    // this.props.history.push('/')
    console.log('window', window)
    const { auth, dispatch } = this.props
    const self = this
    if(auth.auth) {
      if(auth.auth.provider === 'facebook') {
        dispatch(authLogout())
        self.props.router.push('/')
        FB.logout(function(response){
          console.log('logout', response)
          dispatch(authLogout())
          self.props.router.push('/')
        })
      } else if(auth.auth.provider === 'google') {
        let auth2 = window.gapi.auth2.getAuthInstance();
          auth2.signOut().then(function () {
            self.props.router.push('/')
          });
          auth2.disconnect();
      } else {
        self.props.router.push('/')
      }
    }
  }

  render() {
    const { auth } = this.props
    console.log('osososo', this.state)
    return(
      <DropdownMenu
        key={`avatar-dropdown-menu`}
        id={`avatar-dropdown-menu`}
        className='account-tool'
        menuItems={[
          <ListItem
            onClick={this.onLogOut.bind(this)}
            key='logoout' className='account-tool-item' primaryText='Log Out'
          />
        ]}
        anchor={{
          x: DropdownMenu.HorizontalAnchors.CENTER,
          y: DropdownMenu.VerticalAnchors.CENTER,
        }}
        position={DropdownMenu.Positions.BELOW}
        animationPosition="below"
        sameWidth
        centered
        simplified={true}
      >
        <AccessibleFakeButton
          component={IconSeparator}
          iconBefore
          label={
            <IconSeparator label={this.state.userName}>
              <FontIcon>arrow_drop_down</FontIcon>
            </IconSeparator>
          }
        >
          <FontIcon>perm_identity</FontIcon>
        </AccessibleFakeButton>
      </DropdownMenu>
    )
  }
}

export default connect(state => ({
  auth: state.auth
}))(UserTool)
