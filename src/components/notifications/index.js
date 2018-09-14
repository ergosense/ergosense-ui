import { connect } from 'react-redux';
import Component from './component';
import { notification } from './../../actions';

const mapStateToProps = (state) => {
  return { ...state.notification }
};

const mapDispatchToProps = dispatch => {
  return {
    dismiss: () => dispatch(notification.dismiss())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);