import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import ImageGallery from 'react-image-gallery';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext, db } from '../../pages/_app';

export default function GalleryContainer() {
  const [photos, setPhotos] = useState([]);
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(true);

  const { user, isAuthenticated } = useContext(AuthContext);

  const photosRef = user && db.collection('photos');

  useEffect(() => {
    let unsubscribePhotos;
    if (user) {
      unsubscribePhotos = photosRef.onSnapshot(
        (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setLoading(false);
          setPhotos(data);
        },
        (error) => {
          console.log('Not verified yet', error.message);
          setLoading(false);
          Router.push('/');
        },
      );
    }
    if (!isAuthenticated) {
      Router.push('/login');
    }
    return () => {
      if (typeof unsubscribePhotos === 'function') {
        unsubscribePhotos();
      }
    };
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
          <CardBody>
            <GridContainer justify="center">
              <ImageGallery
                items={photos.map((photo) => {
                  const image = {
                    original: photo.imageUrl,
                    description: photo.caption,
                    thumbnail: photo.imageUrl,
                    originalClass: 'img-gallery',
                  };
                  return image;
                })}
              />
            </GridContainer>
          </CardBody>
        </Card>
      </GridContainer>
    </>
  );
}
