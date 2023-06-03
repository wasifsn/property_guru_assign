import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { prod, dev } from '../../constants.js';
import axios from 'axios';
import SimpleAccordion from './SimpleAccordion.js';
import MyCard from './MyCard.js';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

// export default function CircularIndeterminate() {
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CircularProgress />
//     </Box>
//   );
// }
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const CardDetail = () => {
  const productId = useParams();
  const productData = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const body = {
          query: `
          {
            reviews(id:"${productId.id || ''}") {
              author
              rating
              title
              description
              author
              productId
            }
          }
          `,
        };
        setLoading(true);
        const reviews = await axios.post(
          `${import.meta.env.MODE == 'development' ? dev.DOMAIN : prod.DOMAIN}/graphql`,
          body
        );
        setReviews(reviews.data?.data?.reviews);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div>
        <Container maxWidth="md">
          {loading ? (
            <Box height={'100vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {' '}
              <MyCard productDetails={productData?.state}></MyCard>
              <Box sx={{ width: '100%' }}>
                <Stack spacing={2} pt={2} pb={2}>
                  <Item>
                    <Typography variant="h6" align="center" fontWeight={500}>
                      Reviews for the Product: {productData?.state.name}
                    </Typography>
                  </Item>
                </Stack>
              </Box>
              <SimpleAccordion reviews={reviews}></SimpleAccordion>
            </>
          )}
          {error ? (
            <Box
              height={'100vh'}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}
            >
              SOMETHING went Wrong!
            </Box>
          ) : (
            ''
          )}
        </Container>
      </div>
    </>
  );
};

export default CardDetail;
