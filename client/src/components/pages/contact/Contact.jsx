import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import ContactCard from "./ContactCard";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Contact = () => {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h5" color="primary.main" sx={{ mt: 4, mb: 2 }}>
          Contact Us
        </Typography>
      </Grid>

      <Grid item>
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          gutterBottom
          sx={{ mt: 2 }}
        >
          For 24/7 support, contact us via
        </Typography>
      </Grid>

      <Grid item container spacing={2} justifyContent="center">
        {/* Facebook card */}
        <Grid item xs={12} md={4} lg={4} sx={{ marginBottom: 2 }}>
          <Card sx={{ height: "100%", bgcolor: "primary.main" }}>
            <CardContent>
              <Typography variant="h6" align="center" color="white">
                Connect with us on Facebook
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <IconButton
                aria-label="Facebook"
                sx={{ color: "white", marginLeft: "auto", marginRight: "auto" }}
              >
                <FacebookIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>

        {/* Twitter card */}
        <Grid item xs={12} md={4} lg={4} sx={{ marginBottom: 2 }}>
          <Card sx={{ height: "100%", bgcolor: "primary.main" }}>
            <CardContent>
              <Typography variant="h6" align="center" color="white">
                Follow us on Twitter
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <IconButton
                aria-label="Twitter"
                sx={{ color: "white", marginLeft: "auto", marginRight: "auto" }}
              >
                <TwitterIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>

        {/* Instagram card */}
        <Grid item xs={12} md={4} lg={4} sx={{ marginBottom: 2 }}>
          <Card sx={{ height: "100%", bgcolor: "primary.main" }}>
            <CardContent>
              <Typography variant="h6" align="center" color="white">
                Follow us on Instagram
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <IconButton
                aria-label="Instagram"
                sx={{ color: "white", marginLeft: "auto", marginRight: "auto" }}
              >
                <InstagramIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Grid item sx={{ marginTop: 6, marginBottom: 2 }}>
        <Typography variant="h6" color="primary.main">
          Other ways to contact us
        </Typography>
      </Grid>

      {/* Existing ContactCard components */}
      <Grid item container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ContactCard
            name="Shaquille"
            email="john.doe@example.com"
            phone="+1 123-456-7890"
            linkedin="linkedin.com/in/johndoe"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ContactCard
            name="Andrew"
            email="johndoe@example.com"
            phone="+1 987-654-3210"
            linkedin="linkedin.com/in/johndoe"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ContactCard
            name="Nick Mack"
            email="nickmack44@gmail.com"
            phone="+1 555-555-5555"
            linkedin="linkedin.com/in/mack26"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contact;
