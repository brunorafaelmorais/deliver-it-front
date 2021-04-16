import PropTypes from 'prop-types';

import List from '@material-ui/core/List';

import CollaboratorCard from '@/shared/components/molecules/CollaboratorCard';
import CollaboratorType from '@/shared/types/collaborator';

function CollaboratorList({ collaborators, onClickCollaborator }) {
  const renderItem = (collaborator, index) => (
    <CollaboratorCard
      key={collaborator.id}
      collaborator={collaborator}
      hasDivider={index < collaborators.length - 1}
      onClick={() => onClickCollaborator(collaborator)}
      button
    />
  );

  return <List>{collaborators.map(renderItem)}</List>;
}

CollaboratorList.propTypes = {
  onClickCollaborator: PropTypes.func,
  collaborators: PropTypes.arrayOf(CollaboratorType),
};

CollaboratorList.defaultProps = {
  collaborators: [],
  onClickCollaborator: () => null,
};

export default CollaboratorList;
