import React, { useState, useEffect, useContext } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import LaunchRoundedIcon from '@material-ui/icons/LaunchRounded';
import Button from 'components/CustomButtons/Button';
import ProfileModal from './ProfileModal';
import { db, AuthContext } from '../../pages/_app';

export default function MembersList() {
  const { user } = useContext(AuthContext);

  const docRef = user
    && db.collection('Users').where('verified', '==', true).orderBy('displayName');

  const [classicModal, setClassicModal] = React.useState(false);

  const [selectedMember, setSelectedMember] = useState(null);

  const [members, setMembers] = useState([]);

  const viewMember = (member) => {
    setSelectedMember(member);
    setClassicModal(true);
  };

  useEffect(() => {
    if (user) {
      docRef
        .get()
        .then((querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push({ ...doc.data(), id: doc.id });
          });
          setMembers(data);
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    }
  }, []);

  return (
    <>
      <ProfileModal
        classicModal={classicModal}
        setClassicModal={setClassicModal}
        member={selectedMember}
      />
      <h2>Get to know other Members</h2>
      <List>
        {members.map((member, index) => (
          <div key={member.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={member.displayName} src={member.photoURL} />
              </ListItemAvatar>
              <ListItemText
                primary={(
                  <>
                    {member.displayName}
                    <Button
                      onClick={() => viewMember(member)}
                      color="transparent"
                      style={{
                        padding: '0.2rem 0.9375rem',
                        fontWeight: '400',
                        fontSize: '12px',
                      }}
                    >
                      <LaunchRoundedIcon fontSize="small" />
                    </Button>
                  </>
                )}
                secondary={member.location || ''}
              />
            </ListItem>
            {members.length - 1 !== index && (
              <Divider variant="inset" component="li" />
            )}
          </div>
        ))}
      </List>
    </>
  );
}
