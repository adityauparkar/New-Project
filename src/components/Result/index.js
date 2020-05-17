import React from 'react'
import { connect } from 'react-redux'
import Styles from './styles'

class Result extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: 0,
    }
  }
  render() {
    let phase_name = [
      { text: 'Identify', color: '#4db53c' },
      { text: 'Protect', color: '#dd9d22' },
      { text: 'Detect', color: '#2225dd' },
      { text: 'Response', color: '#307bbb' },
      { text: 'Recovery', color: '#307bbb' },
    ]
    let subcategories = [
      [
        'Asset Management',
        'Business Environment',
        'Governance',
        'Risk assesment',
        'Risk Management',
        'Supply Chain Management',
      ],
      [
        'Identity Management and Access Control',
        'Awareness and Training',
        'Data Security',
        'Information Protection Processes and Procedures',
        'Maintenance',
        'Protective Technology',
      ],
      [
        'Anomalies and Events',
        'Security Control Monitoring',
        'Detection Processes',
      ],
      [
        'Response Planning',
        'Communications',
        'Analysis',
        'Mitigation',
        'Improvements',
      ],
      ['Recovery Planning', 'Improvements', 'Communications'],
    ]
    let result = Object.values(this.props.result)
    return (
      <Styles>
        <div className="result-container">
          <div className="title">CSRI Dashboard</div>
          <div className="body">
            <div className="parent-card">
              <div className="percent-container">
                <div className="percent-title">
                  Maturity results of your assessment
                </div>
                <div className="percent-body">
                  {result.map &&
                    result.map((ele, index) => {
                      return (
                        <div key={index} className="percent-box">
                          <div className="phase-name">
                            {phase_name[index].text}
                          </div>
                          <div
                            className="percent-circle"
                            style={{ borderColor: phase_name[index].color }}
                          >
                            {ele.percent}
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
              <div className="thank-you-box">
                <div className="thank-you-title">Thank You!</div>
                <div className="thank-you-subtitle">
                  Based on your result, we have our{' '}
                  <span
                    className="recommendation-text"
                    onClick={() => {
                      this.props.changeDashboardState('recommendation')
                    }}
                  >
                    Recommentdations
                  </span>{' '}
                  to improve your maturity level.
                </div>
              </div>
              <div className="overall-result">
                <div className="overall-result-title">
                  Overall Maturity Results
                </div>
                <div className="overall-result-table">
                  <div className="row header-row">
                    <div className="column phase">Phase</div>
                    <div className="column score">Score</div>
                    <div className="column maturity_level">Maturity Level</div>
                  </div>
                  {result.map &&
                    result.map((ele, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="column phase">
                            {phase_name[index].text.toUpperCase()}
                          </div>
                          <div className="column score">
                            {ele.overall.score}
                          </div>
                          <div className="column maturity_level">
                            {ele.overall.maturity_level}
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
              <div className="detailed-result">
                <div className="detailed-result-title">
                  Detailed Results of each phase
                </div>
                {result.map &&
                  result.map((ele, index) => {
                    return (
                      <div className="category-card" key={index}>
                        <div
                          className="category-name"
                          
                          onClick={() => {
                            this.setState({ category: index })
                          }}
                        >
                          {phase_name[index].text}
                        </div>
                        {this.state.category == index && (
                          <div
                            className={`category-table ${
                              this.state.category == index
                                ? 'visible'
                                : 'invisible'
                            }`}
                          >
                            <div className="row header-row">
                              <div className="column category">Category</div>
                              <div className="column score">Score</div>
                              <div className="column maturity_level">
                                Maturity Level
                              </div>
                            </div>
                            {ele.subcategories &&
                              ele.subcategories.map &&
                              ele.subcategories.map((sub, subi) => {
                                return (
                                  <div className="row" key={subi}>
                                    <div className="column category">
                                      {subcategories[index][subi]}
                                    </div>
                                    <div className="column score">
                                      {sub.score}
                                    </div>
                                    <div className="column maturity_level">
                                      {sub.maturity_level}
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </Styles>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    result: state.result,
  }
}

export default connect(mapStateToProps, null)(Result)
