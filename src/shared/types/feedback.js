import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.string,
  collaboratorId: PropTypes.string,
  createdAt: PropTypes.string,
  message: PropTypes.string,
  like: PropTypes.number,
});
