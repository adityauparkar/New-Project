import React from 'react'
import Styles from './styles'
import data from '../../data.json'
import axios from 'axios'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class Assessment extends React.Component {
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
        phase_values[key].push({ implementation: 'select', difficulty: '', error: false, difficulty_error: false })
    }
    console.log(phase_values)
    this.setState({ values: phase_values })
  }

  checkError = () => {
    let catg_list = Object.keys(this.state.values);
        let i,j;
        for(i=0;i<catg_list.length;i++){
            let catg_err = this.state.values[catg_list[i]];
            for(j=0;j<catg_err.length;j++){
              if(catg_err[j].error || catg_err[j].difficulty_error)
                return i;
            }
        } 
        return i;
  }

  submitResponse = () => {
    let response = {};
    let current_values = this.state.values;
    console.log("--------SUBMIT RESPONSE----------")
    console.log(current_values);
    let values = {};
    for(let catg in current_values){
      let catg_values = current_values[catg];
      console.log(catg_values);
      catg_values.forEach((ele)=>{
        if(ele.implementation=='select'){
          ele.error = true
        }
        if((ele.implementation=='not' || ele.implementation=='partially') && ele.difficulty==''){
          ele.difficulty_error = true
        }
      })
      console.log(catg_values);
      values = Object.assign({}, values, {[catg]: catg_values});
      console.log(values);
    }
      this.setState({values}, ()=>{
        let error_index = this.checkError();
        console.log(error_index)
        if(error_index>=Object.keys(current_values).length){
          console.log(current_values);
          let phases = Object.keys(current_values);
          console.log(phases);
          let i_index = 0;
          let d_index = 0;
          for(let phase=0;phase<phases.length;phase++){
      
          for(let k=0;k<current_values[phases[phase]].length;k++){
            let implementation_score,difficulty_score;
            i_index++;
            d_index++;
            switch(current_values[phases[phase]][k].implementation){
              case 'not': implementation_score = 0;break;
              case 'fully': implementation_score = 2;break;
              case 'partially': implementation_score = 1;break;
              default: implementation_score=-1;
            }
            switch(current_values[phases[phase]][k].difficulty){
              case 'low': difficulty_score = 1;break;
                case 'medium': difficulty_score = 2;break;
                  case 'high': difficulty_score = 3;break;
                  default: difficulty_score = 0;
            }
            response[`i${i_index}`] = implementation_score;
            response[`id${d_index}`] = difficulty_score;
            response['email'] = this.props.user && this.props.user.email
          }
        }
          console.log(response);
          axios.post(`/api/${this.props.assessmentState}`,response)
          .then((res)=>{
            console.log(res.data)
            this.props.updateResult({[this.props.assessmentState]: res.data})
            this.props.onNext();
          })
          .catch((err)=>{console.log(err.response)})
        }
      })
    
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
    arr[qsti].error = false
    console.log(arr)
    let values = Object.assign({}, this.state.values, { [part]: arr })
    this.setState({ values })
  }

  handleRadioChange = (value, part, qsti) => {
    let arr = this.state.values[part]
    arr[qsti].difficulty = value
    arr[qsti].difficulty_error = false
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
                                  className={
                                    this.state.values && this.state.values[ele.key] && this.state.values[ele.key][qsti]
                                  && this.state.values[ele.key][qsti].error?"select-error":""
                                  }
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
                                  {this.state.values && this.state.values[ele.key] && this.state.values[ele.key][qsti]
                                  && this.state.values[ele.key][qsti].error &&
                                  <div className="error">
                                    Please select a value
                                  </div>
                                  }
                                  {this.state.values &&
                                    this.state.values[ele.key] &&
                                    this.state.values[ele.key][qsti] &&
                                    this.state.values[ele.key][qsti]
                                      .implementation != 'select' && this.state.values[ele.key][qsti]
                                      .implementation != 'fully' && (
                                        <>
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
                                      {this.state.values && this.state.values[ele.key] && this.state.values[ele.key][qsti]
                                        && this.state.values[ele.key][qsti].difficulty_error &&
                                        <div className="error">
                                          Please select a value
                                        </div>
                                        }
                                        </>
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
                      onClick={()=>{this.submitResponse();}}
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, actions)(Assessment)
