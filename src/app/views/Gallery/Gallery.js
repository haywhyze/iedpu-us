/*eslint-disable*/
import React, { useState, useEffect, useContext } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { AuthContext, db } from "../../pages/_app.js";
import { toast } from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const avatar = "/img/sidebar-2.jpg";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  imgFluid: {
    maxWidth: "100%",
    height: "auto",
  },
  imgRounded: {
    borderRadius: "6px !important",
  },
  imgRoundedCircle: {
    borderRadius: "50% !important",
  },
  imgRaised: {
    boxShadow:
      "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  imgGallery: {
    width: "100%",
    marginBottom: "2.142rem",
  },
};

const useStyles = makeStyles(styles);

export default function Gallery() {
  const classes = useStyles();

  const { user, isAuthenticated } = useContext(AuthContext);
  const photosRef = user && db.collection("photos");

  const [loading, setLoading] = useState(false);

  const [editOn, setEditOn] = useState(false);
  const [caption, setCaption] = useState("");

  const [newImageOn, setNewImageOn] = useState(false);
  const [newCaption, setNewCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePhoto = (id) => {
    db.collection("photos")
      .doc(id)
      .delete()
      .then(() => {
        toast.success("Photo deleted successfully");
      })
      .catch((error) => {
        toast.error(`Error removing photo, ${error.message}`);
      });
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    if (user) {
      photosRef.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setLoading(false);
        setPhotos(data);
      });
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    setCaption(e.target.value);
  };

  const editCaption = (photo) => {
    setEditOn(true);
    setSelectedImage(photo);
    setCaption(photo.caption);
  };

  const saveCaption = () => {
    setEditOn(false);
    db.collection("photos")
      .doc(selectedImage.id)
      .update({ caption })
      .then(() => {
        setCaption("");
        toast.success("Caption saved");
      })
      .catch((error) => {
        toast.error(`Error saving caption, ${error.message}`);
      });
  };

  const saveNewImage = () => {
    db.collection("photos")
      .add({
        imageUrl,
        caption: newCaption,
        created: new Date().toISOString(),
      })
      .then((docRef) => {
        setNewImageOn(false);
        setImageUrl("");
        setNewCaption("");
        toast.success("Image saved");
      })
      .catch((error) => {
        toast.error(`Error saving image, ${error.message}`);
      });
  };

  const uploadPhoto = () => {
    setNewImageOn(true);
    window.cloudinary.openUploadWidget(
      {
        cloudName: "haywhyze",
        uploadPreset: "ittv3vvm",
        sources: ["local", "camera", "facebook", "instagram"],
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#90A0B3",
            tabIcon: "#0078FF",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#0078FF",
            action: "#FF620C",
            inactiveTabIcon: "#0E2F5A",
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: "#E4EBF1",
          },
          fonts: {
            default: {
              active: true,
            },
          },
        },
      },
      (err, info) => {
        if (!err) {
          if (info.event === "success") {
            // console.log(info.info.secure_url)
            setImageUrl(info.info.secure_url);
          }
        }
      }
    );
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <GridContainer>
        <Card>
          <CardHeader color="primary">
            <p className={classes.cardCategoryWhite}>
              Manage featured images on Gallery page
            </p>
          </CardHeader>
          <CardBody>
            <GridItem style={{ display: "flex" }}>
              {!imageUrl && (
                <Button onClick={uploadPhoto} color="primary" size="lg">
                  Upload New Image
                </Button>
              )}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="..."
                  width={100}
                  height={100}
                  style={{ objectFit: "cover", margin: "20px" }}
                />
              )}
              {newImageOn && imageUrl && (
                <div>
                  <CustomInput
                    labelText="Image Caption"
                    id="caption-modal"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: "caption",
                      value: newCaption,
                      onChange: (e) => setNewCaption(e.target.value),
                    }}
                  />
                  <Button onClick={saveNewImage} color="info" size="sm">
                    Save
                  </Button>
                  <Button
                    onClick={() => setImageUrl("")}
                    color="transparent"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </GridItem>
            <GridContainer>
              {photos
                .sort((a, b) => Date.parse(b.created) - Date.parse(a.created))
                .map((photo) => (
                  <GridItem
                    style={{ margin: "1rem" }}
                    key={photo.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                  >
                    <img
                      src={photo.imageUrl}
                      alt="..."
                      className={
                        classes.imgRaised +
                        " " +
                        classes.imgRounded +
                        " " +
                        classes.imgFluid
                      }
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "15rem",
                      }}
                    />
                    {selectedImage && selectedImage.id === photo.id && editOn ? (
                      ""
                    ) : (
                      <h5>{photo.caption}</h5>
                    )}
                    {editOn && selectedImage.id === photo.id && (
                      <CustomInput
                        labelText="Image Caption"
                        id="caption-modal"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: "caption",
                          value: caption,
                          onChange: handleChange,
                        }}
                      />
                    )}
                    <GridContainer spacing={2}>
                      <GridItem>
                        <Button
                          onClick={
                            !editOn
                              ? () => editCaption(photo)
                              : () => saveCaption()
                          }
                          color="info"
                          size="sm"
                        >
                          {selectedImage && selectedImage.id === photo.id && editOn
                            ? "Update Caption"
                            : "Edit Caption"}
                        </Button>
                      </GridItem>
                      <GridItem>
                        <Button
                          onClick={() => handleClickOpen(photo)}
                          color="danger"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                ))}
            </GridContainer>
          </CardBody>
        </Card>
      </GridContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Photo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this photo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deletePhoto(selectedImage.id)} color="danger">
            Delete
          </Button>
          <Button onClick={handleClose} color="transparent" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
