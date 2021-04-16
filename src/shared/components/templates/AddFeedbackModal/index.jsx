import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddFeedbackModal({ isOpen, onClose, onSubmit }) {
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(() => {
    onSubmit(message);
    onClose();
  }, [onClose, message, onSubmit]);

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add feedback</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="message"
          label="Message"
          type="text"
          onChange={evt => setMessage(evt.target.value)}
          multiline
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!message} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddFeedbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddFeedbackModal;
