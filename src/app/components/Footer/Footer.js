/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";

import Styles from './Footer.module.scss';

export default function Footer(props) {
  const {
    jss100,
    jss101,
    jss102,
    jss103,
    jss74,
    MuiGridRoot,
    MuiGridContainer,
    jss108,
    MuiGridGridSm6,
    MuiGridItem,
    jss104,
    MuiListPadding,
    MuiListRoot,
    jss105,
    MuiListItemGutters,
    MuiListItemRoot,
    MuiSvgIconRoot,
    jss106,
  } = Styles;

  return (
    <footer className={classNames(jss100, jss102)}>
      <div className={classNames(jss103)}>
        <div className={classNames(MuiGridRoot, jss74, MuiGridContainer)}>
          <div
            className={classNames(
              MuiGridRoot,
              jss108,
              MuiGridItem,
              MuiGridGridSm6
            )}
          >
            <ul className={classNames(jss104, MuiListPadding, MuiListRoot)}>
              <li
                className={classNames(
                  jss105,
                  MuiListItemGutters,
                  MuiListItemRoot
                )}
              >
                <a href='#' className={classNames(jss101, jss102)}>
                  IEDPU - USA
                </a>
                <address>
                  Ilorin Emirate Descendants Progressive Union (IEDPU),
                  <br />
                  United States of America (USA) Branch Inc., <br />
                  P.O Box 979, Yonkers NY 10704, <br />
                  New York, USA.
                </address>
              </li>
            </ul>
          </div>
          <div
            className={classNames(
              MuiGridRoot,
              jss108,
              MuiGridItem,
              MuiGridGridSm6
            )}
            style={{
              display: 'flex',
              textAlign: 'right',
              flexDirection: 'column',
            }}
          >
            <a href='/privacy-policy' className={classNames(jss101, jss102)}>
              Privacy Policy
            </a>
            <div className='space' style={{ flex: '1 1 0%' }}></div>
            <div>
              (915)593-9302, (405)921-0928, (757)515-5337 <br />
              iedpu.usa@yahoo.com, ilorinemirate19@gmail.com <br />
              Follow us on
              <a
                href='https://twitter.com/Ilorin_US'
                className={classNames(jss101, jss102)}
              >
                {' '}Twitter{' '}
              </a>
              and
              <a
                href='https://www.instagram.com/ilorinemirate_us/'
                className={classNames(jss101, jss102)}
              >
                {' '}Instagram{' '}
              </a>
            </div>
            <p>
              © 2022, made with{' '}
              <svg
                className={classNames(MuiSvgIconRoot, jss106)}
                focusable='false'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'></path>
              </svg>
              {' '}by{' '}
              <a
                href='https://sitasysng.com/'
                className={classNames(jss101, jss102)}
              >
                Sitasys {' '}
              </a>
              for a better Ilorin community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
