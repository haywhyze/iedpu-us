import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext, db } from '../../pages/_app';
import SingleNews from './SingleNews';
import CreateNewsModal from './CreateNewsModal';

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

export default function EventsMeetings() {
  const classes = useStyles();

  const [excos, setExcos] = useState([]);
  const [classicModal, setClassicModal] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const { user, isAuthenticated } = useContext(AuthContext);

  const excoRefs = user && db.collection('executives');

  useEffect(() => {
    if (user) {
      excoRefs.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setLoading(false);
        setExcos(data);
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
      <GridContainer spacing={2}>
        <CreateNewsModal
          classicModal={classicModal}
          setClassicModal={setClassicModal}
        />
      </GridContainer>
      <GridContainer>
        <Card plain>
          <CardHeader color="primary" plain>
            <p className={classes.cardCategoryWhite}>
              Manage executive members
            </p>
          </CardHeader>
          <CardBody>
            <GridItem>
              <Button color="primary" size="lg" onClick={() => setClassicModal(true)}>
                Add new member
              </Button>
            </GridItem>
            <GridContainer>
              {excos.filter((ex) => ex.type === 'executives').sort((a, b) => Number(a.rank) - Number(b.rank)).map((post) => (
                <SingleNews
                  image={post.image}
                  position={post.position}
                  details={post.bio}
                  time={post.time}
                  key={post.id}
                  id={post.id}
                  name={post.name}
                  rank={post.rank}
                />
              ))}
            </GridContainer>
          </CardBody>
        </Card>
      </GridContainer>
    </>
  );
}
