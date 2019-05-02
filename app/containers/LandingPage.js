import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Grid, Cell } from 'react-md'

class LandingPage extends React.Component {
  componentDidMount() {
    const { auth } = this.props
    if(!auth.auth) {
      this.props.router.push('/')
    }
  }
  render() {
    const tiles = [
      { text: 'Menu 1', path: 'menu-one', icon: 'fa fa-user-friends' },
      { text: 'Menu 2', path: 'menu-two', icon: 'fa fa-golf-ball' },
      { text: 'Menu 3', path: 'menu-three', icon: 'fa fa-globe-americas' },
      { text: 'Menu 4', path: 'menu-four', icon: 'fa fa-sitemap' },
      { text: 'Menu 5', path: 'menu-five', icon: 'fa fa-calendar-alt' },
      { text: 'Menu 6', path: 'menu-six', icon: 'fa fa-chalkboard-teacher' }
    ]
    return <Grid>
      {
          tiles.map((tile)=>{
            return <Cell size={4} key={tile.path}>
              <Link as={`/app/${tile.path}`} href={`/menu?title=${tile.text}&id=${tile.path}`}>
                <div key={tile.path} className='menu-tile'>
                  <div className='tile-icon'><i className={tile.icon}></i></div>
                  <div className='tile-text'>{tile.text}</div>
                </div>
              </Link>
            </Cell>
          })
        }
    </Grid>
  }
}

export default connect(state => ({
  sample: state.sample,
  auth: state.auth
}))(withRouter(LandingPage))
