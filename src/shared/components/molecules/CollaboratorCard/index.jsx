import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import CollaboratorType from '@/shared/types/collaborator';

function CollaboratorCard({ collaborator, hasDivider, ...rest }) {
  return (
    <>
      <ListItem alignItems="flex-start" {...rest}>
        <ListItemAvatar>
          <Avatar alt={collaborator.name} src={collaborator.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={collaborator.name}
          secondary={
            <>
              <Typography component="span" variant="body2" color="textPrimary">
                {collaborator.company}
              </Typography>
              {` — ${collaborator.role}`}
            </>
          }
        />
      </ListItem>
      {hasDivider && <Divider variant="inset" component="li" />}
    </>
  );
}

CollaboratorCard.propTypes = {
  hasDivider: PropTypes.bool,
  collaborator: CollaboratorType.isRequired,
};

CollaboratorCard.defaultProps = {
  hasDivider: true,
};

export default CollaboratorCard;
