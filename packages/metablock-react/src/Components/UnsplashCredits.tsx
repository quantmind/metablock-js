import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";

const UnsplashCredits = (props: any) => {
  const { user, links, maxWidth = false } = props;
  return user && links && user.links && links.html && user.links.html ? (
    <Container maxWidth={maxWidth}>
      <Typography
        component="figcaption"
        variant="caption"
        align="right"
        color="textSecondary"
      >
        Photo by{" "}
        <Link
          href={user.links.html}
          rel="noopener"
          target="_blank"
          color="inherit"
          underline="always"
        >
          {user.name}
        </Link>
        {" on "}
        <Link
          href={links.html}
          rel="noopener"
          target="_blank"
          color="inherit"
          underline="always"
        >
          Unsplash
        </Link>
      </Typography>
    </Container>
  ) : null;
};

export default UnsplashCredits;
