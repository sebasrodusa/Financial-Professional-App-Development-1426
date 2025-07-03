import React from 'react';
import { GetStarted } from '@questlabs/react-sdk';
import { questConfig, getUserId } from '../../config/questConfig';

const GetStartedComponent = ({ onClose }) => {
  return (
    <div className="quest-getstarted-container">
      <GetStarted 
        questId={questConfig.GET_STARTED_QUESTID}
        uniqueUserId={getUserId()}
        accent={questConfig.PRIMARY_COLOR}
        autoHide={false}
        onClose={onClose}
      >
        <GetStarted.Header />
        <GetStarted.Progress />
        <GetStarted.Content />
        <GetStarted.Footer />
      </GetStarted>
    </div>
  );
};

export default GetStartedComponent;