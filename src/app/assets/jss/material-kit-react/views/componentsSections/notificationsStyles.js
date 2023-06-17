/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { container, title } from 'assets/jss/material-kit-react.js';

const notificationsStyles = {
  section: {
    backgroundColor: 'transparent',
    display: 'block',
    width: '60%',
    position: 'fixed',
    padding: '0',
    top: '20%',
    left: '20%',
    zIndex: 5,
  },
  title: {
    ...title,
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
  },
  container,
};

export default notificationsStyles;
