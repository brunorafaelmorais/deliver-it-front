import PropTypes from 'prop-types';
import ListSubheader from '@material-ui/core/ListSubheader';

import List from '@material-ui/core/List';

import FeedbackCard from '@/shared/components/molecules/FeedbackCard';
import feedbackType from '@/shared/types/feedback';

function FeedbackList({ feedbacks, onLike, onDelete, title }) {
  const renderItem = (feedback, index) => (
    <FeedbackCard
      key={feedback.id}
      feedback={feedback}
      hasDivider={index < feedbacks.length - 1}
      onClickLike={() => onLike(feedback)}
      onClickDelete={() => onDelete(feedback)}
    />
  );

  return (
    <List
      aria-labelledby={`nested-list-${title}`}
      subheader={
        <ListSubheader
          disableSticky
          component="div"
          id={`nested-list-${title}`}
        >
          {title}
        </ListSubheader>
      }
    >
      {feedbacks.map(renderItem)}
    </List>
  );
}

FeedbackList.propTypes = {
  title: PropTypes.string.isRequired,
  feedbacks: PropTypes.arrayOf(feedbackType),
  onLike: PropTypes.func,
  onDelete: PropTypes.func,
};

FeedbackList.defaultProps = {
  feedbacks: [],
  onLike: () => null,
  onDelete: () => null,
};

export default FeedbackList;
