import React from 'react';
import { Card, CardContent, Typography, Grid, Stack, CardMedia } from '@mui/material';

const ContactCard = ({ name, email, phone, linkedin, image }) => {
    const IMG_URL =
	"https://www.shutterstock.com/image-illustration/no-picture-available-placeholder-thumbnail-600nw-2179364083.jpg";

  return (
    <Card sx={{ width: '100%', marginTop: 4 , color: "white"}}>
      <CardContent sx={{minHeight: '325px', bgcolor: "primary.main"}}> {/* Change the background color here */}
      <CardMedia
							image={IMG_URL}
							alt={name}
							sx={{
								height: 320,
								objectFit: "fill", // makes the image fit perfectly into the card
								transition: "opacity 0.3s ease",
								"&:hover": {
									opacity: 0.2,
								},
                                mb:2
							}}
							component="img"
							
						/>

        <Stack spacing={5} alignItems="center">
        <Typography variant="h5" gutterBottom textAlign="center">
          {name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {email}
        </Typography>
        <Typography variant="body1" gutterBottom style={{marginBottom: '8px'}}>
          Phone: {phone}
        </Typography>
        <Typography variant="body1" gutterBottom style={{marginBottom: '8px'}}>
          LinkedIn: {linkedin}
        </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
