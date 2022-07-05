import PublicPage from './components/LandingPage/PublicPage';
import PrivatePage from './components/PrivatePage/PrivatePage';
import ForumPage from './components/ForumManagement/ForumOverview'
import ForumDetail from './components/ForumManagement/ForumDetailView'


import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectAccessToken } from './redux/AuthenticationSlice'
import { selectShowForumManagement, selectShowForumDetail, selectCurrentForum } from './redux/ForumManagementSlice'



function App() {

    const accessToken = useSelector(selectAccessToken)
    const showForumPage = useSelector(selectShowForumManagement)
    const showForumDetail = useSelector(selectShowForumDetail)
    const currentForum = useSelector(selectCurrentForum)

    if (accessToken) {
        return (
            <Routes>
                <Route path="/forumThreadDetail" element={<ForumDetail />}>
                </Route>
                <Route path="/forumPage" element={<ForumPage />}>
                </Route>
                <Route path="/" element={<PrivatePage />}>
                </Route>
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path='/' element={<PublicPage />} />
            </Routes>
        )
    }
}

export default App;
