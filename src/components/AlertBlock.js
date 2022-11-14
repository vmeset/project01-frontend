import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import {Alert, Container} from 'react-bootstrap'
import {CSSTransition} from 'react-transition-group'

import { Context } from '..';

const AlertBlock = observer ( () => {

    const {alert} = useContext(Context)

      return (
        <CSSTransition
          in={alert.alertVisible}
          timeout={{
            enter: 750,
            exit: 500
          }}
          classNames={'alert'}
          mountOnEnter
          unmountOnExit
        >
          <Container>
            <Alert 
              variant={alert.type || "warning"} 
              onClose={() => alert.hideAlert(false)} 
              dismissible
              className='pb-0'
            >
              <p>{alert.text}</p>
            </Alert>
          </Container>
        </CSSTransition>
      );
});

export default AlertBlock;