import React from 'react'
import { connect } from 'react-redux'
import { sampleAction } from '../store/actions'
import SpinnerNoOverLay from '../components/SpinnerNoOverLay'

class PlayWithBuddies extends React.Component {
  componentDidMount () {
    this.props.dispatch(sampleAction())
  }

  render() {
    const { sample } = this.props

    return(
      <div>
        <h1>Play with Buddies</h1>
        <div>
          <h5>Sample Response from an API Call</h5>
          { sample.processing ? <SpinnerNoOverLay /> : null }
          <ul>
            {
              sample.response.map((item)=>{
                return <li key={item.id}>
                  {item.title}
                </li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  sample: state.sample
}))(PlayWithBuddies)
