import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

function Layout({ children }) {
  return <Container maxWidth="md">{children}</Container>;
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
