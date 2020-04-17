import React, { forwardRef } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import { ROUTES } from '../../constants';

const useStyles = makeStyles((theme) => ({
  header: {
    margin: theme.spacing(4, 0, 2, 0),
  },
  paragraph: {
    padding: theme.spacing(1, 0),
  },
  backLink: {
    margin: theme.spacing(0, 3, 0, 2),
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function PrivacyPolicy() {
  const classes = useStyles();
  return (
    <>
      <AppBar position="relative">
        <Toolbar disableGutters>
          <Link
            component={forwardRef((props, ref) => (
              <RouterLink to={ROUTES.BASE} {...props} ref={ref} />
            ))}
            color="inherit"
            className={classes.backLink}
          >
            <ArrowBackIcon />
          </Link>
          <Typography variant="h6" color="inherit">
            Privacy policy
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="article">
        <section>
          <Typography component="p" variant="body1" className={classes.paragraph} />

          <Typography component="p" variant="body1" className={classes.paragraph}>
            This is the Cookie Policy for Grapher, accessible from https://grapher.tech
          </Typography>

          <Typography component="h2" variant="h4">
            What Are Cookies
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your
            computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store
            these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain
            elements of the sites functionality.
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            For more general information on cookies, please read{' '}
            <Link href="https://www.cookieconsent.com/what-are-cookies/">"What Are Cookies"</Link>.
          </Typography>

          <Typography component="h2" variant="h4">
            How We Use Cookies
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling
            cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies
            if you are not sure whether you need them or not in case they are used to provide a service that you use.
          </Typography>

          <Typography component="h2" variant="h4">
            Disabling Cookies
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that
            disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in
            also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.
          </Typography>

          <Typography component="h2" variant="h4">
            The Cookies We Set
          </Typography>

          <ul>
            <li>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                Login related cookies
              </Typography>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you
                visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted
                features and areas when logged in.
              </Typography>
            </li>
          </ul>

          <Typography component="h2" variant="h4">
            Third Party Cookies
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you
            might encounter through this site.
          </Typography>

          <ul>
            <li>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                This site uses Firebase Authentication which is one of the most widespread and trusted Google based authentication solution. These
                cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging
                content.
              </Typography>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                For more information on Firebase cookies, see the official Firebase page.
              </Typography>
            </li>
          </ul>

          <Typography component="h2" variant="h4">
            More Information
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or
            not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site. This Cookies Policy
            was created with the help of the <Link href="https://www.cookiepolicygenerator.com">Cookies Policy Template Generator</Link> and the{' '}
            <Link href="https://www.privacypolicytemplate.net/">Privacy Policy Template Generator</Link>.
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            However if you are still looking for more information then you can contact us through one of our preferred contact methods:
          </Typography>

          <ul>
            <li>
              <Link href="https://github.com/davidballester/grapher">GitHub</Link>
            </li>
          </ul>
        </section>
      </Container>
    </>
  );
}
