import React from 'react';
import WorkVariable from './graphs/work';
import PieChart from './graphs/workLocation';
import Endowment from './graphs/endowment';

const App = () => {
    return (
      <div style={{ marginLeft: 10 }}>
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, marginRight: 10 }}>
                <WorkVariable />
            </div>
            <div style={{ flex: 1, marginLeft: 10 }}>
                <Endowment />
            </div>
        </div>
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, marginRight: 10 }}>
              <PieChart />
            </div>
            <div style={{ flex: 1, marginRight: 10 }}></div>
        </div>
    </div>
    );
}

export default App;
