import React, { useEffect, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { connect } from 'react-redux';

import { useInput } from '../../utilities/useInput';

import { editDiary, deleteDiary } from '../../actions';

const styles = {
  card: {
    margin: 10,
    padding: '0 10 0 10',
    width: 500
  },
  header: {
    fontSize: 25
  },
  subheader: {
    fontSize: 18
  }
};

const DiaryEntryDetail = ({
  classes,
  diaryEntry,
  editDiary,
  deleteDiary,
  handleClose,
  medName
}) => {
  const diary_text = useInput('');
  const [entryDate, setEntryDate] = useState(
    moment(Date.now()).format('ddd M/D/YY h:mma')
  );
  const [newEntry, setNewEntry] = useState(true);

  useEffect(() => {
    if (diaryEntry) {
      diary_text.setValue(diaryEntry.diary_text);
      setEntryDate(moment(diaryEntry.diary_date).format('ddd M/D/YY h:mma'));
      setNewEntry(false);
    }
    // eslint-disable-next-line
  }, [diaryEntry]);

  const requestEditDiary = e => {
    e.preventDefault();
    editDiary(diaryEntry.id, {
      diary_text: diary_text.value
    });
    handleClose();
  };

  const requestDeleteDiary = e => {
    e.preventDefault();
    deleteDiary(diaryEntry.id);
    handleClose();
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.header}>
          {newEntry ? medName : diaryEntry.med_name}
        </Typography>
        <Typography className={classes.subheader}>{entryDate}</Typography>
        <TextField
          id='outlined-full-width'
          style={{ margin: 8 }}
          placeholder='How are you feeling?'
          fullWidth
          multiline
          rows={10}
          rowsMax={10}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={diary_text.value}
          onChange={diary_text.updateValue}
        />
      </CardContent>
      <CardActions className='diaryEntryButtons'>
        <Button onClick={handleClose} variant='contained' color='default'>
          Cancel
        </Button>
        {newEntry ? (
          <div />
        ) : (
          <Button
            onClick={requestDeleteDiary}
            variant='contained'
            color='secondary'
          >
            Delete Entry
          </Button>
        )}
        <Button
          onClick={requestEditDiary}
          variant='contained'
          color='secondary'
        >
          Save Entry
        </Button>
      </CardActions>
    </Card>
  );
};

export default connect(
  null,
  { editDiary, deleteDiary }
)(withStyles(styles)(DiaryEntryDetail));
