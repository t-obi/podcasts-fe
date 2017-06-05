import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { jsonApi } from '../actions'

function AddFeed({ handleJsonApiResponse }) {
  let result = '';

  async function handleSubmit(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log('handle submit...', result);
    const data = {
      "data": {
        "type": "feeds",
        "attributes": {
          "url": result
        }
      }
    };
    const newFeed = await axios.post('feeds', data);
    handleJsonApiResponse(newFeed);

  }
  function handleInputChange(event) {
    result = event.target.value;  
  }

  return (
    <form onSubmit={handleSubmit} className="ma2">
      <input type="text"
        onChange={handleInputChange}
        className="ma2 pa2 ba bw1 w5"
      />
      <button type="submit"
        className="link dim ba bw1 ph3 pa2 mb2 dib blue b--blue bg-white pointer"
      >
        Submit
      </button>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleJsonApiResponse: (response) => {
      dispatch(jsonApi(response))
    }
  }
}

export default connect(() => ({}), mapDispatchToProps)(AddFeed);
