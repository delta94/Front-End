import React, { Component } from 'react';
import PillsNav from './PillsNav';
import ActivePills from './ActivePills';
import InactivePills from './InactivePills';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { fetchMeds } from '../../actions';
import withStyles from '@material-ui/core/styles/withStyles';

class PillsList extends Component {
  state = {
    noMeds: false
  };
  componentDidMount() {
    if (this.props.location.pathname === '/pills') {
      this.props.history.push('/pills/active');
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.fetchingMeds &&
      !this.props.fetchingMeds &&
      this.props.error
    ) {
      if (
        this.props.error ===
        'Request failed with status code 404. User with specified ID does not have any medications.'
      ) {
        this.setState({ noMeds: true });
      }
    }
  }

  render() {
    const {
      fetchingMeds,
      classes,
      activeMeds,
      inactiveMeds,
      openDialog,
      location
    } = this.props;
    if (fetchingMeds) {
      return (
        <div className={classes.loading}>
          <h2>Loading Meds...</h2>
          <CircularProgress
            className={classes.progress}
            color='primary'
            disableShrink
          />
        </div>
      );
    } else if (this.state.noMeds) {
      return <h1>You do not have any meds saved yet.</h1>;
    } else {
      return (
        <Card className={classes.card}>
          <h2>Your list of medications</h2>
          <PillsNav />
          {location.pathname === '/pills/active' ||
          location.pathname === '/pills' ? (
            <ActivePills activeMeds={activeMeds} openDialog={openDialog} />
          ) : location.pathname === '/pills/inactive' ? (
            <InactivePills
              inactiveMeds={inactiveMeds}
              openDialog={openDialog}
            />
          ) : null}
        </Card>
      );
    }
  }
}

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  card: {
    maxWidth: 1100,
    margin: '0 auto'
  },
  loading: {
    margin: '0 auto',
    width: 500
  }
});

const mapStateToProps = state => ({
  meds: state.medsReducer.meds,
  activeMeds: state.medsReducer.activeMeds,
  inactiveMeds: state.medsReducer.inactiveMeds,
  fetchingMeds: state.medsReducer.fetchingMeds,
  error: state.medsReducer.error
});

const StyledPillsList = withStyles(styles)(PillsList);

export default connect(
  mapStateToProps,
  { fetchMeds }
)(StyledPillsList);
