import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import ImageGallery from 'react-image-gallery';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import { db } from '../../pages/_app';

export default function GalleryContainer() {
  const [photos, setPhotos] = useState([]);

  const [loading, setLoading] = useState(true);

  const photosRef = db.collection('photos');

  useEffect(() => {
    let unsubscribePhotos;
    if (photosRef) {
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
    return () => {
      if (typeof unsubscribePhotos === 'function') {
        unsubscribePhotos();
      }
    };
  }, [photosRef]);

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
                    created: photo.created,
                  };
                  return image;
                }).sort((a, b) => Date.parse(b.created) - Date.parse(a.created))}
              />
            </GridContainer>
          </CardBody>
        </Card>
      </GridContainer>
    </>
  );
}
