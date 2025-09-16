import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQSection({ faqs, title = "FAQ" }) {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>{title}</Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
