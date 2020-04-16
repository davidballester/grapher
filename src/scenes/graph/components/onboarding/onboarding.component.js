import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { withStyles } from '@material-ui/core/styles';

import Introduction from './components/introduction.component';
import AddNodesAndLinks from './components/add-nodes-and-links.component';
import Groups from './components/groups.component';
import Title from './components/title.component';

const styles = (theme) => ({
  stepper: {
    width: '40vw',
    maxWidth: 600,
    margin: 'auto',
  },
  step: {
    width: '40vw',
    maxWidth: 600,
    height: '60vh',
    maxHeight: 600,
    overflow: 'auto',
    padding: theme.spacing(3),
  },
});

const steps = 3;

const Onboarding = ({ open, dismiss, isDarkMode, classes }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog open={open}>
      <Title onClose={dismiss}>Welcome to Grapher!</Title>
      <Introduction hidden={activeStep !== 0} className={classes.step} isDarkMode={isDarkMode} />
      <AddNodesAndLinks hidden={activeStep !== 1} className={classes.step} />
      <Groups hidden={activeStep !== 2} className={classes.step} isDarkMode={isDarkMode} />
      <MobileStepper
        variant="dots"
        steps={steps}
        position="static"
        activeStep={activeStep}
        className={classes.stepper}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === steps - 1}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Dialog>
  );
};

export default withStyles(styles, { withTheme: true })(Onboarding);
