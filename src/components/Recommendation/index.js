import React from 'react'
import axios from 'axios'
import Styles from './styles'

export default class Recommendation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recommendations: null,
    }
  }
  componentDidMount() {
    axios
      .post('/api/recommendations')
      .then((res) => {
        console.log(res.data)
        this.setState({ recommendations: Object.values(res.data) })
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  render() {
    return (
      <Styles>
        <div className="recommendation-container">
          <div className="title">Recommendations</div>
          <div className="body">
            <div className="parent-card">
              {this.state.recommendations &&
                this.state.recommendations.map &&
                this.state.recommendations.map((ele, index) => {
                  return typeof ele == 'string' ? (
                    <div key={index}>{ele}</div>
                  ) : (
                    <div key={index} className="recommendation">
                      <div className="catg-id">{ele._id}</div>
                      <div className="rec">{ele.rec}</div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </Styles>
    )
  }
}
