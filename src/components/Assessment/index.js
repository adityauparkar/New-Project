import React from 'react'
import Styles from './styles'
import data from '../../data.json'
import axios from 'axios'

export default class Assessment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      values: null,
    }
  }
  componentDidMount() {
    let phase_questions = data[this.props.assessmentState]
    let phase_values = {}
    for (let key in phase_questions) {
      phase_values[key] = []
      for (let i = 0; i < phase_questions[key].questions.length; i++)
        phase_values[key].push({ implementation: 'select', difficulty: '' })
    }
    console.log(phase_values)
    this.setState({ values: phase_values })
  }

  submitResponse = () => {
    let response = {};
    let identify_values = this.state.values;
    console.log(identify_values);
    let phases = Object.keys(identify_values);
    console.log(phases);
    let i_index = 0;
    let d_index = 0;
    for(let phase=0;phase<phases.length;phase++){

    for(let i=0;i<identify_values[phases[phase]].length;i++){
      let implementation_score,difficulty_score;
      i_index++;
      d_index++;
      // switch(identify_values[phase[i]][i].implementation){
      //   case 'not': implementation_score = 0;break;
      //   case 'fully': implementation_score = 2;break;
      //   case 'partially': implementation_score = 1;break;
      //   default: implementation_score=-1;
      // }
      // switch(identify_values[i][phase[i]].difficulty){
      //   case 'low': difficulty_score = 1;break;
      //     case 'medium': difficulty_score = 2;break;
      //       case 'high': difficulty_score = 3;break;
      //       default: difficulty_score = 0;
      // }
      response[`i${i_index}`] = 2;
      response[`id${d_index}`] = 2;
    }
  }
    console.log(response);
    axios.post("/api/identify",response).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err.response)})
  }

  componentDidUpdate(prevProps){
    if(this.props.assessmentState!=prevProps.assessmentState){
      let phase_questions = data[this.props.assessmentState]
    let phase_values = {}
    for (let key in phase_questions) {
      phase_values[key] = []
      for (let i = 0; i < phase_questions[key].questions.length; i++)
        phase_values[key].push({ implementation: 'select', difficulty: '' })
    }
    console.log(phase_values)
    this.setState({ values: phase_values })
    }
  }

  handleOnChange = (value, part, qsti) => {
    let arr = this.state.values[part]
    arr[qsti].implementation = value
    console.log(arr)
    let values = Object.assign({}, this.state.values, { [part]: arr })
    this.setState({ values })
  }

  handleRadioChange = (value, part, qsti) => {
    let arr = this.state.values[part]
    arr[qsti].difficulty = value
    console.log(arr)
    let values = Object.assign({}, this.state.values, { [part]: arr })
    this.setState({ values })
  }

  render() {
    let phase_questions = data[this.props.assessmentState]
    let phase_arr = []
    for (let key in phase_questions) {
      let obj = phase_questions[key]
      obj.key = key
      phase_arr.push(obj)
    }

    return (
      <Styles>
        <div className="assessment-container">
          <div className="title">Cyber Security Maturity Level Assessment</div>
          <div className="body">
            <div className="phase-container">
              <div className="phase-title">
                {this.props.assessmentState &&
                  this.props.assessmentState.toUpperCase()}{' '}
                PHASE
              </div>
              <div className="parts-container">
                {phase_arr &&
                  phase_arr.map &&
                  phase_arr.map((ele, index) => {
                    return (
                      <div className="part" key={index}>
                        <div className="part-title">{ele.title}</div>
                        <div className="questions-container">
                          {ele.questions &&
                            ele.questions.map &&
                            ele.questions.map((qst, qsti) => {
                              return (
                                <div className="question" key={qsti}>
                                  <div className="text">
                                    {`${qsti + 1}. ${qst.text}`}
                                  </div>
                                  <div className="description">
                                    <i>{qst.description}</i>
                                  </div>
                                  <select
                                    value={
                                      (this.state.values &&
                                        this.state.values[ele.key] &&
                                        this.state.values[ele.key][qsti] &&
                                        this.state.values[ele.key][qsti]
                                          .implementation) ||
                                      'select'
                                    }
                                    onChange={(e) =>
                                      this.handleOnChange(
                                        e.target.value,
                                        ele.key,
                                        qsti,
                                      )
                                    }
                                  >
                                    <option value="select">Select</option>
                                    <option value="not">Not implemented</option>
                                    <option value="partially">
                                      Partially implemented
                                    </option>
                                    <option value="fully">
                                      Fully implemented
                                    </option>
                                  </select>
                                  {this.state.values &&
                                    this.state.values[ele.key] &&
                                    this.state.values[ele.key][qsti] &&
                                    this.state.values[ele.key][qsti]
                                      .implementation != 'select' && this.state.values[ele.key][qsti]
                                      .implementation != 'not' && (
                                      <div className="difficulty-level-container">
                                        <span>Difficulty Level</span>
                                        {['Low', 'Medium', 'High'].map(
                                          (difficulty, difficultyi) => {
                                            return (
                                              <div
                                                className="difficulty-level"
                                                key={difficultyi}
                                              >
                                                <input
                                                  type="radio"
                                                  name="difficulty-level"
                                                  checked={
                                                    this.state.values &&
                                                    this.state.values[
                                                      ele.key
                                                    ] &&
                                                    this.state.values[ele.key][
                                                      qsti
                                                    ] &&
                                                    this.state.values[ele.key][
                                                      qsti
                                                    ].difficulty ==
                                                      difficulty.toLowerCase()
                                                  }
                                                  value={difficulty.toLowerCase()}
                                                  onChange={(e) =>
                                                    this.handleRadioChange(
                                                      e.target.value,
                                                      ele.key,
                                                      qsti,
                                                    )
                                                  }
                                                />
                                                <span>{difficulty}</span>
                                              </div>
                                            )
                                          },
                                        )}
                                      </div>
                                    )}
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    )
                  })}
                <div className="buttons-container">
                  {this.props.showBack && (
                    <div
                      onClick={this.props.onBack}
                      className="back-button changeState"
                    >
                      Back
                    </div>
                  )}
                  {this.props.showNext && (
                    <div
                      onClick={()=>{this.props.onNext(); this.submitResponse();}}
                      className="next-button changeState"
                    >
                      Next
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Styles>
    )
  }
}
