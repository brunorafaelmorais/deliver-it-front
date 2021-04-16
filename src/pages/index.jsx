import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import api from '@/shared/services/api';
import CollaboratorList from '@/shared/components/organisms/CollaboratorList';
import Layout from '@/shared/components/templates/Layout';

export default function Home() {
  const [collaborators, setCollaborators] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const LIMIT = 10;

  const getCollaborators = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get(
        `collaborator?page=${page}&limit=${LIMIT}`,
      );

      setCollaborators(prevState => [...prevState, ...response.data]);
      setHasMore(response.data.length === LIMIT);
    } catch (err) {
      enqueueSnackbar(err.message, {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [page, enqueueSnackbar]);

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      setPage(prevState => prevState + 1);
    }
  }, [hasMore]);

  const handleClickCollaborator = useCallback(
    ({ id }) => {
      router.push(`collaborator/${id}`);
    },
    [router],
  );

  useEffect(() => {
    getCollaborators();
  }, [getCollaborators]);

  return (
    <Layout>
      <CollaboratorList
        collaborators={collaborators}
        onClickCollaborator={handleClickCollaborator}
      />
      {loading && (
        <Box display="flex" justifyContent="center" py={2}>
          <CircularProgress />
        </Box>
      )}
      {hasMore && !loading && (
        <Box display="flex" justifyContent="center" py={2}>
          <Button onClick={handleLoadMore}>load more</Button>
        </Box>
      )}
    </Layout>
  );
}
