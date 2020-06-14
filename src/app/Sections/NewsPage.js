import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext, db } from '../pages/_app';
import SingleNews from './SingleNews';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

export default function NewsContainer() {
  const classes = useStyles();

  const [news, setNews] = useState([]);
  const [classicModal, setClassicModal] = React.useState(false);
  const [loading, setLoading] = useState(true);
//   const [successNotification, setSuccessNotification] = useState(false);
//   const [failureNotification, setFailureNotification] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

  const { user, isAuthenticated } = useContext(AuthContext);

  const newsRef = user && db.collection('news');

  useEffect(() => {
    if (user) {
      newsRef.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setLoading(false);
        setNews(data);
      });
    }
  }, [isAuthenticated, user]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <GridContainer>
        <Card plain>
          {/* <CardHeader color="primary" plain>
            <p className={classes.cardCategoryWhite}>
              Manage all news and feature articles
            </p>
          </CardHeader> */}
          <CardBody>
            <GridContainer>
                {console.log(news)}
              {news.sort((a, b) => Date.parse(b.time) - Date.parse(a.time)).map((post) => (
                <SingleNews
                  image={post.imageUrl}
                  caption={post.caption}
                  details={post.details}
                  author={post.author}
                  time={post.time}
                  title={post.title}
                  key={post.id}
                  id={post.id}
                />
              ))}
            </GridContainer>
          </CardBody>
        </Card>
      </GridContainer>
    </>
  );
}
