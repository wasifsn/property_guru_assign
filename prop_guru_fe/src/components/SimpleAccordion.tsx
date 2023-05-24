import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SimpleAccordion({ reviews }) {
  let renderData =
    reviews &&
    reviews.length &&
    reviews.map((el) => (
      <React.Fragment key={el.title}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography fontWeight={800}>{el.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography align="left" variant="h4">
              {el.author}
            </Typography>
            <Typography fontWeight={400} align="left">
              {el.description}
            </Typography>
            <Typography variant="h6" align="left" fontWeight={500}>
              RATING: {el.rating}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    ));
  return <div>{renderData}</div>;
}
