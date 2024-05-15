import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route exact path="/">
        <div>
          <h1>Index Page</h1>
          {/* Other components or content to display at the index URL */}
        </div>
      </Route>
      <Route path="/emoti">
        <div>
          <h1>Emoti Page</h1>
          {/* Other components or content to display at the /emoti URL */}
        </div>
      </Route>
    </Router>
  );
}

export default App;