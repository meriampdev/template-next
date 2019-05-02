import Link from 'next/link';
import { withRouter } from 'next/router'
import Layout from '../components/Layout';
import LandingPage from '../containers/LandingPage'
import { Button, FontIcon } from 'react-md'

// Straight away require/import scss/css just like in react.
import indexStyle from '../styles/index.scss';

const Index = () => (
    // Wrap your page inside <Theme> HOC to get bootstrap styling.
    // Theme can also be omitted if react-bootstrap components are not used.
    <Layout>
      <LandingPage />
    </Layout>
);

export default withRouter(Index)
