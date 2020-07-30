import React, { useState, useContext, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import Button from 'components/CustomButtons/Button.js';
import TextEditor from '../../Sections/utils/TextEditor';
import { AuthContext, db } from '../../pages/_app';

export default function AboutUs() {
  const [text, setText] = useState('');
  const { user, isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const aboutRef = user && db.collection('about').doc('hFOSsA2VgSRQpVGjOPCW');

  useEffect(() => {
    if (isAuthenticated && aboutRef) {
      aboutRef.get().then((doc) => {
        setLoading(false);
        if (doc.exists) {
          setText(doc.data()['about-us']);
        } else {
          // doc.data() will be undefined in this case
          toast.error('Error fetching about us');
        }
      }).catch((error) => {
        setLoading(false);
        toast.error(`Error fetching about us, ${error.message}`);
      });
    }
  }, []);

  const save = () => aboutRef.update({
    'about-us': text,
  })
    .then(() => {
      toast.success('About us updated successfully');
    })
    .catch((error) => {
      // The document probably doesn't exist.
      toast.error(`Error updating about us, ${error.message}`);
    });

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
    <div>
      <TextEditor text={text} setText={setText} />
      <Button color="primary" onClick={save}>Save</Button>
    </div>
  );
}
