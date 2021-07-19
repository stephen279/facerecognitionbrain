import React from 'react';
import './Diagnosis.css';


import ReactDOM from 'react-dom';

const COLORS = ['white', 'red', 'blue', 'black', 'cream'];

class Diagnosis extends React.Component {

	

  render() {
    return (
       <form>
      <h2>Register Your Cat</h2>

      <label>Name*:</label>
      <input />

      <label>Color*:</label>
      <select>
        <option value="">Select color</option>
    
      </select>

      <label>Age*:</label>
      <input />

      <label>Habits:</label>
      <textarea />

      <button type="submit">Submit</button>
    </form>
    );
  }
}

export default Diagnosis;
