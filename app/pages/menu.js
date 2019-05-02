import { withRouter } from 'next/router'
import Layout from '../components/Layout';
import PlayWithBuddies from '../containers/PlayWithBuddies'
import MyGolfClub from '../containers/MyGolfClub'
import PlayTournaments from '../containers/PlayTournaments'
import OrganizeTournament from '../containers/OrganizeTournament'
import OrganizeKids from '../containers/OrganizeKids'
import TeachingPro from '../containers/TeachingPro'

function renderPage(props) {
  switch (props.router.query.id) {
    case 'menu-one':
      return <PlayWithBuddies />
      break;
    case 'menu-two':
      return <MyGolfClub />
      break;
    case 'menu-three':
      return <PlayTournaments />
      break;
    case 'menu-four':
      return <OrganizeTournament />
      break;
    case 'menu-five':
      return <OrganizeKids />
      break;
    case 'menu-six':
      return <TeachingPro />
      break;
    default:
      return <h1>Page Not Found</h1>
  }
}

const Menu = (props) => {
  return(
    <Layout>
      {renderPage(props)}
    </Layout>
  )
}

export default withRouter(Menu)
