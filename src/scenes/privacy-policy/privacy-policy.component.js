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
            At Grapher, accessible from https://grapher.tech, one of our main priorities is the privacy of our visitors. This Privacy Policy document
            contains types of information that is collected and recorded by Grapher and how we use it.
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that
            they shared and/or collect in Grapher. This policy is not applicable to any information collected offline or via channels other than this
            website.
          </Typography>
        </section>
        <section>
          <Typography component="h2" variant="h4">
            Consent
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </Typography>
        </section>
        <section>
          <Typography component="h2" variant="h4">
            Information we collect
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the
            point we ask you to provide your personal information.
          </Typography>
          <Typography component="p" variant="body1" className={classes.paragraph}>
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents
            of the message and/or attachments you may send us, and any other information you may choose to provide.
          </Typography>
          <Typography component="p" variant="body1" className={classes.paragraph}>
            When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email
            address, and telephone number.
          </Typography>
        </section>
        <section>
          <Typography component="h2" variant="h4">
            How we use your information
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            We use the information we collect in various ways, including to:
          </Typography>

          <ul>
            <li>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                Provide, operate, and maintain our webste
              </Typography>
            </li>
            <li>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                Improve, personalize, and expand our webste
              </Typography>
            </li>
            <li>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                Understand and analyze how you use our webste
              </Typography>
            </li>
            <li>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                Develop new products, services, features, and functionality
              </Typography>
            </li>
            <li>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and
                other information relating to the webste, and for marketing and promotional purposes
              </Typography>
            </li>
            <li>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                Send you emails
              </Typography>
            </li>
            <li>
              <Typography component="p" variant="body1" className={classes.paragraph}>
                Find and prevent fraud
              </Typography>
            </li>
          </ul>
        </section>
        <section>
          <Typography component="h2" variant="h4">
            Log Files
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            Grapher follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this
            and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type,
            Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any
            information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking
            users' movement on the website, and gathering demographic information.
          </Typography>
        </section>
        <section>
          <Typography component="h2" variant="h4">
            Cookies and Web Beacons
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            Like any other website, Grapher uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages
            on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page
            content based on visitors' browser type and/or other information.
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            For more general information on cookies, please read{' '}
            <Link href="https://www.cookieconsent.com/what-are-cookies/">"What Are Cookies"</Link>.
          </Typography>
        </section>
        <section>
          <Typography component="h2" variant="h4">
            Advertising Partners Privacy Policies
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            You may consult this list to find the Privacy Policy for each of the advertising partners of Grapher.
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective
            advertisements and links that appear on Grapher, which are sent directly to users' browser. They automatically receive your IP address
            when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the
            advertising content that you see on websites that you visit.
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            Note that Grapher has no access to or control over these cookies that are used by third-party advertisers.
          </Typography>
        </section>
        <section>
          <Typography component="h2" variant="h4">
            Third Party Privacy Policies
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            Grapher's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy
            Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to
            opt-out of certain options. You may find a complete list of these Privacy Policies and their links here: Privacy Policy Links.
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with
            specific web browsers, it can be found at the browsers' respective websites.
          </Typography>
        </section>
        <section>
          <Typography component="h2" variant="h4">
            CCPA Privacy Rights (Do Not Sell My Personal Information)
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            Under the CCPA, among other rights, California consumers have the right to:
          </Typography>
          <Typography component="p" variant="body1" className={classes.paragraph}>
            Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a
            business has collected about consumers.
          </Typography>
          <Typography component="p" variant="body1" className={classes.paragraph}>
            Request that a business delete any personal data about the consumer that a business has collected.
          </Typography>
          <Typography component="p" variant="body1" className={classes.paragraph}>
            Request that a business that sells a consumer's personal data, not sell the consumer's personal data.
          </Typography>
          <Typography component="p" variant="body1" className={classes.paragraph}>
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
          </Typography>
        </section>
        <section>
          <Typography component="h2" variant="h4">
            GDPR Data Protection Rights
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </Typography>
          <Typography component="p" variant="body1" className={classes.paragraph}>
            The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.
          </Typography>
          <Typography component="p" variant="body1" className={classes.paragraph}>
            The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the
            right to request that we complete the information you believe is incomplete.
          </Typography>
          <Typography component="p" variant="body1" className={classes.paragraph}>
            The right to erasure – You have the right to request that we erase your personal data, under certain conditions.
          </Typography>
          <Typography component="p" variant="body1" className={classes.paragraph}>
            The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain
            conditions.
          </Typography>
          <Typography component="p" variant="body1" className={classes.paragraph}>
            The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.
          </Typography>
          <Typography component="p" variant="body1" className={classes.paragraph}>
            The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or
            directly to you, under certain conditions.
          </Typography>
          <Typography component="p" variant="body1" className={classes.paragraph}>
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
          </Typography>
        </section>
        <section>
          <Typography component="h2" variant="h4">
            Children's Information
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe,
            participate in, and/or monitor and guide their online activity.
          </Typography>

          <Typography component="p" variant="body1" className={classes.paragraph}>
            Grapher does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child
            provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to
            promptly remove such information from our records.
          </Typography>
        </section>
        <section>
          <Typography component="p" variant="body1" className={classes.paragraph}>
            Our Privacy Policy was created with the help of the <Link href="https://www.privacypolicygenerator.info">Privacy Policy Generator</Link>{' '}
            and the <Link href="https://www.privacypolicyonline.com/privacy-policy-template/">Privacy Policy Template</Link>.
          </Typography>
        </section>
      </Container>
    </>
  );
}
