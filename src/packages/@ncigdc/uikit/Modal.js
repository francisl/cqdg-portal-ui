// @flow

import React, { Children, cloneElement } from 'react';
import _ from 'lodash';
import ReactModal from 'react-modal';

import './Modal.css';

ReactModal.setAppElement('#root');

const modalStyles = {
  content: {
    backgroundColor: '#FFC431',
    border: 'none',
    borderRadius: '2px',
    color: '#003457',
    margin: '30px auto',
    maxWidth: '800px',
    padding: '0px',
    position: 'initial',
    width: '90%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: '0px',
    display: 'block',
    left: '0px',
    position: 'fixed',
    right: '0px',
    top: '0px',
    zIndex: '200',
  },
};

const Modal = ({
  children, isOpen, onRequestClose, style,
}) => (
  <ReactModal
    className="test-modal"
    contentLabel="Modal"
    isOpen={isOpen}
    onRequestClose={onRequestClose || (() => { })}
    style={{ ..._.merge({}, modalStyles, style) }}
    >
    {Children.map(children, child => cloneElement(child, { ...child.props }))}
  </ReactModal>
);

export default Modal;
