import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { addMed } from 'actions';
import { useToggle } from 'utilities/useToggle';
import Button from '@material-ui/core/Button';
import Scan from './Scan/Scan.js'; // Prioritizing the Scan component
import scanReducer, { init } from './scanReducer.js';
import Paper from '@material-ui/core/Paper';
// import CloudIcon from '@material-ui/icons/CloudUpload';
import SearchPill from './SearchPill/SearchPill';
import PillInfoModal from 'components/Modals/PillInfoModal';
import Search from 'components/SearchResults';

function ScanOrAdd({ location, history, addMed }) {
  const [state, dispatch] = useReducer(scanReducer, init(location));
  const [open, setOpen] = useToggle(false);
  // const [pill, setPill] = useState({});

  const handleAddPill = pillInfo => {
    addMed({
      ...pillInfo,
      med_add_date: new Date().getTime(),
      med_active: false
    })
      .then(() => {
        history.push('/pills');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleAddPillReminders = pillInfo => {
    addMed({
      ...pillInfo,
      med_add_date: new Date().getTime(),
      med_active: true
    })
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
      {state && state.analysis ? (
        <Search
          searchResults={state.analysis}
          handleAddPill={handleAddPill}
          handleAddPillReminders={handleAddPillReminders}
        />
      ) : (
        <>
          <Scan state={state} dispatch={dispatch} history={history} />
          <SearchPill state={state} dispatch={dispatch} />
          <Button onClick={setOpen} variant='contained'>
            Add Pill Manually
          </Button>
          <PillInfoModal
            open={open}
            handleAddPill={handleAddPill}
            handleAddPillReminders={handleAddPillReminders}
            handleClose={setOpen}
          />
        </>
      )}
    </Paper>
  );
}

export default connect(
  null,
  { addMed }
)(ScanOrAdd);
