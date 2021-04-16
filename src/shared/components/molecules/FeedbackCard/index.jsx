import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';

import FeedbackType from '@/shared/types/feedback';

function FeedbackCard({
  feedback,
  hasDivider,
  onClickLike,
  onClickDelete,
  ...rest
}) {
  return (
    <ListItem alignItems="flex-start" divider={hasDivider} {...rest}>
      <ListItemText
        primary={feedback.message}
        secondary={`${feedback.like} likes`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="favorite" onClick={onClickLike}>
          <FavoriteIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={onClickDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

FeedbackCard.propTypes = {
  hasDivider: PropTypes.bool,
  feedback: FeedbackType.isRequired,
  onClickLike: PropTypes.func,
  onClickDelete: PropTypes.func,
};

FeedbackCard.defaultProps = {
  hasDivider: true,
  onClickLike: () => null,
  onClickDelete: () => null,
};

export default FeedbackCard;
