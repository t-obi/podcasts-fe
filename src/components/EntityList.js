import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router';

import { jsonApi } from '../actions'

class EntityList extends Component {

  static propTypes = {
    entityType: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    hasDetailsPage: PropTypes.bool,
  };

  async componentDidMount() {
    const entities = await axios.get(this.props.endpoint);
    this.props.handleJsonApiResponse(entities.data);
  }

  render() {
    const { entities, fields, hasDetailsPage } = this.props;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              {fields.map(field => <th key={field}>{field}</th>)}
            </tr>
          </thead>
          <tbody>
            {entities && entities.keySeq().map((id) =>
              <tr key={id}>
                <td>{id}</td>
                {fields.map(field =>
                  <th key={field}>
                    {entities.getIn([id, field])}
                  </th>
                )}
                {hasDetailsPage && <td>
                  <Link to={`/admin/feeds/${id}`}>Details</Link>
                </td>}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    entities: state.api.get(ownProps.entityType),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleJsonApiResponse: (response) => {
      dispatch(jsonApi(response))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntityList);
