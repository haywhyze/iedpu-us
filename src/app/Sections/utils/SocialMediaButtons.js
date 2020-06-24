import React from 'react';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import Button from 'components/CustomButtons/Button.js';

export default function SocialMediaButtons() {
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: '5',
        top: '40%',
        right: '10px',
        background: 'white',
        boxShadow:
          '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
        borderRadius: '6px',
      }}
    >
      <List>
        <li>
          <Tooltip
            id="instagram-twitter"
            title="Follow us on twitter"
            placement={
              process.browser && window.innerWidth > 959 ? 'top' : 'left'
            }
          >
            <span>
              <Button
                href="https://twitter.com/haywhyze"
                target="_blank"
                style={{
                  color: 'inherit',
                  position: 'relative',
                  padding: '0.9375rem',
                  fontWeight: '400',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  borderRadius: '3px',
                  lineHeight: '20px',
                  textDecoration: 'none',
                  margin: '0px',
                  display: 'inline-flex',
                  '&:hover,&:focus': {
                    color: 'inherit',
                    background: 'rgba(200, 200, 200, 0.2)',
                  },
                }}
                color="transparent"
              >
                <i
                  style={{ position: 'relative' }}
                  className="fab fa-twitter"
                />
              </Button>
            </span>
          </Tooltip>
        </li>
        <li>
          <Tooltip
            id="instagram-facebook"
            title="Follow us on facebook"
            placement={
              process.browser && window.innerWidth > 959 ? 'top' : 'left'
            }
          >
            <span>
              <Button
                color="transparent"
                href="https://www.facebook.com/haywhyze"
                target="_blank"
                style={{
                  color: 'inherit',
                  position: 'relative',
                  padding: '0.9375rem',
                  fontWeight: '400',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  borderRadius: '3px',
                  lineHeight: '20px',
                  textDecoration: 'none',
                  margin: '0px',
                  display: 'inline-flex',
                  '&:hover,&:focus': {
                    color: 'inherit',
                    background: 'rgba(200, 200, 200, 0.2)',
                  },
                }}
              >
                <i
                  style={{ fontSize: '20px !important' }}
                  className="fab fa-facebook"
                />
              </Button>
            </span>
          </Tooltip>
        </li>
        <li>
          <Tooltip
            id="instagram-tooltip"
            title="Follow us on instagram"
            placement={
              process.browser && window.innerWidth > 959 ? 'top' : 'left'
            }
          >
            <span>
              <Button
                color="transparent"
                href="https://www.instagram.com/ilorinemirate_us"
                target="_blank"
                style={{
                  color: 'inherit',
                  position: 'relative',
                  padding: '0.9375rem',
                  fontWeight: '400',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  borderRadius: '3px',
                  lineHeight: '20px',
                  textDecoration: 'none',
                  margin: '0px',
                  display: 'inline-flex',
                  '&:hover,&:focus': {
                    color: 'inherit',
                    background: 'rgba(200, 200, 200, 0.2)',
                  },
                }}
              >
                <i
                  style={{ marginRight: '4px' }}
                  className="fab fa-instagram"
                />
              </Button>
            </span>
          </Tooltip>
        </li>
      </List>
    </div>
  );
}
