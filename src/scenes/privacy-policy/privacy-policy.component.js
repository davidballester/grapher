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
          <Typography component="p" variant="body1" className={classes.paragraph}>
            David Ballester Mena built the Grapher app as an Open Source app. This SERVICE is provided by David Ballester Mena at no cost and is
            intended for use as is.
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone
            decided to use my Service.
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal
            Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as
            described in this Privacy Policy.
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Grapher unless
            otherwise defined in this Privacy Policy.
          </Typography>
        </section>

        <section>
          <header className={classes.header}>
            <Typography component="h2" variant="h4">
              Information Collection and Use
            </Typography>
          </header>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information,
            including but not limited to Graphs created with the app. The information that I request will be retained on your device and is not
            collected by me in any way.
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            The app does use third party services that may collect information used to identify you.
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            Link to privacy policy of third party service providers used by the app
          </Typography>
        </section>

        <section>
          <header className={classes.header}>
            <Typography component="h2" variant="h4">
              Log Data
            </Typography>
          </header>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third
            party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address,
            device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the
            Service, and other statistics.
          </Typography>
        </section>

        <section>
          <header className={classes.header}>
            <Typography component="h2" variant="h4">
              Cookies
            </Typography>
          </header>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from
            the websites that you visit and are stored on your device's internal memory.
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to
            collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is
            being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.
          </Typography>
        </section>

        <section>
          <header className={classes.header}>
            <Typography component="h2" variant="h4">
              Service Providers
            </Typography>
          </header>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            I may employ third-party companies and individuals due to the following reasons:
          </Typography>

          <ul>
            <li>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                To facilitate our Service;
              </Typography>
            </li>
            <li>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                To provide the Service on our behalf;
              </Typography>
            </li>
            <li>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                To perform Service-related services; or
              </Typography>
            </li>
            <li>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                To assist us in analyzing how our Service is used.
              </Typography>
            </li>
            <li>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the
                tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
              </Typography>
            </li>
          </ul>
        </section>

        <section>
          <header className={classes.header}>
            <Typography component="h2" variant="h4">
              Security
            </Typography>
          </header>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it.
            But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot
            guarantee its absolute security.
          </Typography>
        </section>

        <section>
          <header className={classes.header}>
            <Typography component="h2" variant="h4">
              Links to Other Sites
            </Typography>
          </header>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these
            external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control
            over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </Typography>
        </section>

        <section>
          <header className={classes.header}>
            <Typography component="h2" variant="h4">
              Children’s Privacy
            </Typography>
          </header>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children
            under 13. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our
            servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so
            that I will be able to do necessary actions.
          </Typography>
        </section>

        <section>
          <header className={classes.header}>
            <Typography component="h2" variant="h4">
              Changes to This Privacy Policy
            </Typography>
          </header>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify
            you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this
            page.
          </Typography>
        </section>

        <section>
          <header className={classes.header}>
            <Typography component="h2" variant="h4">
              Contact Us
            </Typography>
          </header>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me at{' '}
            <Link href="mailto:davidballestermena@gmail.com" target="_blank">
              davidballestermena@gmail.com
            </Link>
            .
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            This privacy policy page was created at{' '}
            <Link href="privacypolicytemplate.net" target="_blank">
              privacypolicytemplate.net
            </Link>{' '}
            and modified/generated by App Privacy Policy Generator
          </Typography>
        </section>
      </Container>
    </>
  );
}
