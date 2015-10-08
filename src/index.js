import React from 'react';
import { App } from './App';

React.render(<App url="chat.json" pollInterval={2000} />, document.getElementById('root'));
