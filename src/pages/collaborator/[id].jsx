import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { parseISO, differenceInMinutes } from 'date-fns';
import { useSnackbar } from 'notistack';

import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import api from '@/shared/services/api';
import Layout from '@/shared/components/templates/Layout';
import CollaboratorCard from '@/shared/components/molecules/CollaboratorCard';
import FeedbackList from '@/shared/components/organisms/FeedbackList';
import AddFeedbackModal from '@/shared/components/templates/AddFeedbackModal';

export default function CollaboratorDetail() {
  const [collaborator, setCollaborator] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const LIMIT = 20;

  const router = useRouter();
  const { id: collaboratorIdParam } = router.query;

  useEffect(() => {
    if (!collaboratorIdParam) return;

    api
      .get(`collaborator/${collaboratorIdParam}`)
      .then(response => setCollaborator(response.data))
      .catch(err => {
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
      });
  }, [enqueueSnackbar, collaboratorIdParam]);

  const getFeedbacks = useCallback(async () => {
    if (!collaboratorIdParam) return;

    setLoading(true);

    try {
      const response = await api.get(
        `collaborator/${collaboratorIdParam}/feedback?page=${page}&limit=${LIMIT}`,
      );

      setFeedbacks(prevState => [...prevState, ...response.data]);

      setHasMore(response.data.length === LIMIT);
    } catch (err) {
      enqueueSnackbar(err.message, {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar, page, collaboratorIdParam]);

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      setPage(prevState => prevState + 1);
    }
  }, [hasMore]);

  const handleLike = useCallback(
    async ({ id: feedbackId, like }) => {
      try {
        const payload = { like: like + 1 };

        const response = await api.put(
          `collaborator/${collaborator.id}/feedback/${feedbackId}`,
          payload,
        );

        setFeedbacks(prevState =>
          prevState.map(feedback => {
            if (feedback.id === response.data.id) {
              return response.data;
            }

            return feedback;
          }),
        );

        enqueueSnackbar('Updated feedback');
      } catch (err) {
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
      }
    },
    [collaborator.id, enqueueSnackbar],
  );

  const handleDelete = useCallback(
    async ({ id: feedbackId, createdAt }) => {
      const parsedCreatedAt = parseISO(createdAt);
      const diffInMinutes = differenceInMinutes(new Date(), parsedCreatedAt);

      if (diffInMinutes > 5) {
        enqueueSnackbar('It is not possible to delete this feedback', {
          variant: 'error',
        });
        return;
      }

      try {
        await api.delete(
          `collaborator/${collaborator.id}/feedback/${feedbackId}`,
        );

        setFeedbacks(prevState =>
          prevState.filter(feedback => feedback.id !== feedbackId),
        );
      } catch (err) {
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
      }
    },
    [collaborator.id, enqueueSnackbar],
  );

  useEffect(() => {
    getFeedbacks();
  }, [getFeedbacks]);

  const toggleModal = useCallback(() => {
    setIsOpenModal(state => !state);
  }, []);

  const handleSubmit = useCallback(
    async message => {
      try {
        const payload = {
          message,
          collaboratorId: collaborator.id,
          like: 0,
        };

        const response = await api.post(
          `collaborator/${collaborator.id}/feedback`,
          payload,
        );

        setFeedbacks(prevState => [...prevState, response.data]);
      } catch (err) {
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
      }
    },
    [collaborator.id, enqueueSnackbar],
  );

  return (
    <Layout>
      <AddFeedbackModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onSubmit={handleSubmit}
      />

      <div className="float-action">
        <Fab color="primary" aria-label="add" onClick={toggleModal}>
          <AddIcon />
        </Fab>
      </div>

      <div className="back-button">
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>
      </div>

      {!!Object.keys(collaborator).length && (
        <List>
          <CollaboratorCard collaborator={collaborator} />
        </List>
      )}

      {!!feedbacks.length && (
        <FeedbackList
          onLike={handleLike}
          onDelete={handleDelete}
          title="Feedbacks"
          feedbacks={feedbacks}
        />
      )}

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
