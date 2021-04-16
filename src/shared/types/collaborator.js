import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.string,
  createdAt: PropTypes.string,
  name: PropTypes.string,
  company: PropTypes.string,
  avatar: PropTypes.string,
  role: PropTypes.string,
});
