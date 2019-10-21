import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {CSSTransition} from 'react-transition-group';


const modalRoot = document.getElementById('modal');

class Popup extends React.Component {
  state = {
    isVisible:false,
  }
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
    this.show()
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  onCloseClick = () => {
    this.hide()
  }
  hide = () => {
    this.setState({isVisible: false})
    if (this.props.animation) {
      setTimeout(() => {
        this.props.onHide()
      },250)
    } else {
        this.props.onHide()
    }
  }
  show = () => {
    this.setState({isVisible: true})
  }
  render() {
    return ReactDOM.createPortal(
        <CSSTransition in={this.state.isVisible} timeout={550} classNames={`${this.props.animation ? this.props.animation: ''}`} appear unmountOnExit>
          <aside className={`by-modal-dialog`}>
            <div className="by-modal-container" >
              <div className="by-modal">
                <div className="by-modal-content">
                  <div className="by-modal-content-block">
                      {this.props.children}
                  </div>
                  <div className="button-close" onClick={this.onCloseClick}>
                      <span className="cross cross-left"></span>
                      <span className="cross cross-right"></span>
                      <span>ЗАКРЫТЬ</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </CSSTransition>
      ,
      this.el,
    );
  }
  // render() {
  //   return (
     

  //   )
  // }
}

export default Popup