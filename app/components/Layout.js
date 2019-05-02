import React from 'react'
import { Toolbar, Button } from 'react-md'
import indexStyle from '../styles/index.scss';

class Layout extends React.Component {
  render() {
    return(
      <div>
        <style dangerouslySetInnerHTML={{ __html: indexStyle }} />
        <Toolbar
          id="fixed-toolbar-example"
          fixed
          colored
          nav={(
            <Button
              key="nav"
              icon
            >
              menu
            </Button>
          )}
          title={
            <div className='brand'>
              Progressive Web App
            </div>
          }
          // actions={<AccountTool {...this.props} />}
          titleId="search-pastries"
          className="layout-top-bar"
        />
        <div className='md-toolbar-relative'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
