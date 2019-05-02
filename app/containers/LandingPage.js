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
      { text: 'Play with buddies', path: 'play-buddies', icon: 'fa fa-user-friends' },
      { text: 'My Golf Club', path: 'golf-club', icon: 'fa fa-golf-ball' },
      { text: 'Play Tournaments', path: 'play-tournament', icon: 'fa fa-globe-americas' },
      { text: 'Organize a Tournament', path: 'organize-tournament', icon: 'fa fa-sitemap' },
      { text: 'Organize schedule for my kids', path: 'organize-kids', icon: 'fa fa-calendar-alt' },
      { text: 'I am a Teaching Pro', path: 'teaching-pro', icon: 'fa fa-chalkboard-teacher' }
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
