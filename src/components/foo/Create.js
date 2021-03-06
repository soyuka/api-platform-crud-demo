import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Form from './Form';
import { create } from '../../actions/foo/create';

class Create extends Component {
  static propTypes = {
    error: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    item: React.PropTypes.object,
    create: React.PropTypes.func.isRequired,
  };

  render() {
    if (this.props.item) {
      return <Redirect to={{
          pathname: `edit/${encodeURIComponent(this.props.item['@id'])}`,
          state: {created: this.props.item},
        }}/>;
    }

    return <div>
      <h1>Create a new Foo</h1>

      {this.props.loading && <div className="alert alert-info">Loading...</div>}
      {this.props.error && <div className="alert alert-danger">An error occurred.</div>}

      <Form onSubmit={this.props.create} values={this.props.item}/>
      <Link to="." className="btn btn-default">Back to list</Link>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.foo.create.item,
    error: state.foo.create.error,
    loading: state.foo.create.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    create: values => dispatch(create(values))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
