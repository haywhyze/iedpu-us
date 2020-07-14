import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Button from 'components/CustomButtons/Button.js';
import { AuthContext } from '../../pages/_app';

const useStyles = makeStyles({
  root: {
    maxWidth: 565,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function UnderReview() {
  const classes = useStyles();
  const { signOut } = useContext(AuthContext);
  return (
    <div className="container-review">
      <div className="overlay-review">
        <Card className={classes.root} size="md" variant="outlined">
          <CardContent>
            <Typography variant="h4" component="h2">
              Profile under review. You will be notified by email when you are
              verified
            </Typography>
          </CardContent>
          <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/">
              <span>
                <Button color="primary" size="lg">
                  Return to homepage
                </Button>
              </span>
            </Link>
            <Button color="danger" onClick={signOut}>
              Sign out
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
