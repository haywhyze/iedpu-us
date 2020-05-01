import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProTip from "../components/ProTip";
import Link from "../components/Link";
import Copyright from "../components/Copyright";
import Button from "../components/CustomButtons/Button";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Button
          component={Link}
          color="primary"
          variant="contained"
          href="/about"
          round
          naked
        >
          Go to the about page
        </Button>

        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
