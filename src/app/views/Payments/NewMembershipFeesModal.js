/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from "react";
// @material-ui/core components
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { toast } from "react-toastify";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import CustomInput from "components/CustomInput/CustomInput.js";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";
import { AuthContext, db } from "../../pages/_app.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

Transition.displayName = "Transition";

export default function NewFeesModal({
  membershipFeesModal,
  setMembershipFeesModal,
  members,
}) {
  const classes = useStyles();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [fees, setFees] = useState([]);
  const feesRef = user && db.collection("fees");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      feesRef.get().then(
        (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push({ ...doc.data(), id: doc.id });
          });
          setLoading(false);
          setFees(data);
        },
        (err) => {
          console.log(err);
          setLoading(false);
        }
      );
    }
  }, [isAuthenticated, user]);

  const [selectedMember, setSelectedMember] = useState({ displayName: "" });

  const handleMemberSelect = (event) => {
    setSelectedMember(members.filter((e) => event.target.value === e.id)[0]);
  };

  const [values, setValues] = useState({
    amount: "",
    intent: "",
    transaction_id: "Manual",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const createFee = () => {
    if (!values.amount) return;
    const newFee = {
      ...values,
      name: selectedMember && selectedMember.displayName,
      email: selectedMember && selectedMember.email,
      userId: selectedMember.id,
      date: Date.now(),
    };

    db.collection("membership_fees")
      .add(newFee)
      .then((docRef) => {
        setValues({
          amount: "",
          intent: "",
        });
        setSelectedMember({ displayName: "" });
        setMembershipFeesModal(false);
        toast.success("Membership fee recorded");
      })
      .catch((error) => {
        toast.error(`Error recording membership fee, ${error.message}`);
      });
  };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6} lg={4}>
          <Dialog
            classes={{
              root: classes.center,
              paper: classes.modal,
            }}
            open={membershipFeesModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setMembershipFeesModal(false)}
            aria-labelledby="classic-modal-slide-title"
            aria-describedby="classic-modal-slide-description"
          >
            <DialogTitle
              id="classic-modal-slide-title"
              disableTypography
              className={classes.modalHeader}
            >
              <IconButton
                className={classes.modalCloseButton}
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => setMembershipFeesModal(false)}
              >
                <Close className={classes.modalClose} />
              </IconButton>
            </DialogTitle>
            <DialogContent
              id="classic-modal-slide-description"
              className={classes.modalBody}
            >
              <CardBody>
                <GridContainer>
                  <GridItem xs={12}>
                    <h3>Record Membership fees payment</h3>
                  </GridItem>
                  <GridItem xs={12}>
                    <FormControl
                      fullWidth
                      className={classes.formControl}
                      style={{
                        margin: "27px 0 0 0",
                        position: "relative",
                        paddingBottom: "10px",
                      }}
                    >
                      <InputLabel id="demo-simple-select-helper-label">
                        Select Member
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={(selectedMember && selectedMember.id) || ""}
                        onChange={handleMemberSelect}
                      >
                        {members.length &&
                          members.map((e) => (
                            <MenuItem key={e.id} value={e.id}>
                              {e.displayName}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12}>
                    <FormControl
                      fullWidth
                      className={classes.formControl}
                      style={{
                        margin: "27px 0 0 0",
                        position: "relative",
                        paddingBottom: "10px",
                      }}
                    >
                      <InputLabel id="demo-simple-select-helper-label">
                        Payment for
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={values.intent}
                        name="intent"
                        onChange={handleChange}
                      >
                        {fees.map((e) => (
                          <MenuItem key={e.id} value={e.name}>
                            {e.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText="Amount Paid"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "amount",
                        type: "number",
                        value: values.amount,
                        onChange: handleChange,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button onClick={createFee} color="primary">
                Record Payment
              </Button>
            </DialogActions>
          </Dialog>
        </GridItem>
      </GridContainer>
    </div>
  );
}
