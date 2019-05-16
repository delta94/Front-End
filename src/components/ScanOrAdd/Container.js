import React, { useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { addMed } from 'actions';
import { useToggle } from 'utilities/useToggle';
import Button from '@material-ui/core/Button';
import Scan from './Scan/Scan.js'; // Prioritizing the Scan component
import scanReducer, { init } from './scanReducer.js';
import Paper from '@material-ui/core/Paper';
import SearchPill from './SearchPill/SearchPill';
import PillInfoModal from 'components/Modals/PillInfoModal';
import AddPillModal from 'components/Modals/AddPillModal';

function ScanOrAdd({ location, history, addMed }) {
  const [state, dispatch] = useReducer(scanReducer, init(location));
  const [pill, setPill] = useState({});
  const [open, setOpen] = useToggle(false);
  const [confirmOpen, setConfirmOpen] = useToggle(false);
  console.log(pill);

  const handleConfirm = pillInfo => {
    setOpen();
    setPill(pillInfo);
    setConfirmOpen();
  };

  const handleAddPill = () => {
    addMed(pill)
      .then(() => {
        history.push('/pills');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleAddPillReminders = () => {
    addMed(pill)
      .then(() => {
        history.push('/adddosage');
      })
      .catch(error => {
        console.log(error);
      });
  };

  console.log(state); // purely for debugging

  return (
    <Paper square>
      <Scan state={state} dispatch={dispatch} history={history} />
      <SearchPill state={state} dispatch={dispatch} />
      <Button onClick={setOpen} variant='contained'>
        Add Pill Manually
      </Button>
      <PillInfoModal
        open={open}
        handleConfirm={handleConfirm}
        handleClose={setOpen}
        setPill={setPill}
      />
      <AddPillModal
        open={confirmOpen}
        pill={pill}
        handleClose={setConfirmOpen}
        handleAddPill={handleAddPill}
        handleAddPillReminders={handleAddPillReminders}
      />
    </Paper>
  );
}

const mapStateToProps = state => ({
  addingMed: state.medsReducer.addingMed,
  error: state.medsReducer.error
});

export default connect(
  mapStateToProps,
  { addMed }
)(ScanOrAdd);