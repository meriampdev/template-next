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
    case 'play-buddies':
      return <PlayWithBuddies />
      break;
    case 'golf-club':
      return <MyGolfClub />
      break;
    case 'play-tournament':
      return <PlayTournaments />
      break;
    case 'organize-tournament':
      return <OrganizeTournament />
      break;
    case 'organize-kids':
      return <OrganizeKids />
      break;
    case 'teaching-pro':
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
