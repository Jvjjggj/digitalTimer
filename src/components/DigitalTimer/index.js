import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timerElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreseTimerLimit = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const isButtonDisabled = timerElapsedInSeconds > 0
    return (
      <div>
        <p>Set Timer Limit</p>
        <div className="twoBtn">
          <button
            type="button"
            onClick={this.onDecreseTimerLimit}
            disabled={isButtonDisabled}
          >
            -
          </button>
          <div>
            <p>{timerLimitInMinutes}</p>
          </div>
          <button
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTimerLimitMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElapsedInSeconds: prevState.timerElapsedInSeconds + 1,
      }))
    }
  }

  onStatrtOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timerElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const statrtOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div>
        <button type="button" onClick={this.onStatrtOrPauseTimer}>
          <img
            className="img"
            src={startOrPauseImgUrl}
            alt={statrtOrPauseAltText}
          />
          <p>{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button type="button" onClick={this.onResetTimer}>
          <img
            className="img"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />
          <p>Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const totalRemainSeconds = timerLimitInMinutes * 60 - timerElapsedInSeconds
    const min = Math.floor(totalRemainSeconds / 60)
    const sec = Math.floor(totalRemainSeconds % 60)
    const stringMin = min > 9 ? min : `0${min}`
    const stringSec = sec > 9 ? sec : `0${sec}`
    return `${stringMin}:${stringSec}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelTest = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="mainDiv">
        <h1 className="head">Digital Timer</h1>
        <div className="mainDivv">
          <div className="timeDiv">
            <div>
              <h1>{this.getElapsedSecondsInTimeFormat()}</h1>
              <p>{labelTest}</p>
            </div>
          </div>
          <div className="div1">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
