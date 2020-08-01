import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Button from 'components/CustomButtons/Button.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext, db } from '../../../pages/_app';
import SingleExecutive from './SingleExecutive';
import NewExecutive from './NewExecutive';

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

export default function Executives() {
  const classes = useStyles();
  const [executives, setExecutives] = useState([]);
  const [classicModal, setClassicModal] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useContext(AuthContext);
  const executivesRef = user && db.collection('executives').where('type', '==', 'executives');
  useEffect(() => {
    if (user) {
      executivesRef.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setLoading(false);
        setExecutives(data);
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
        <NewExecutive
          classicModal={classicModal}
          setClassicModal={setClassicModal}
        />
      </GridContainer>
      <GridContainer>
        <GridItem>
          <Button
            color="primary"
            size="lg"
            onClick={() => setClassicModal(true)}
          >
            Add Executive Member
          </Button>
        </GridItem>
        <GridContainer>
          {executives
            .sort((a, b) => Date.parse(a.time) - Date.parse(b.time))
            .map((executive) => (
              <SingleExecutive e={executive} key={Date.now() + Math.random()} />
            ))}
        </GridContainer>
      </GridContainer>
    </>
  );
}
