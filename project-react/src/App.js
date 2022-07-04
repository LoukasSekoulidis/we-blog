import PublicPage from './components/LandingPage/PublicPage';
import PrivatePage from './components/PrivatePage/PrivatePage';

import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectAccessToken } from './redux/AuthenticationSlice'

function App() {

    const accessToken = useSelector(selectAccessToken)

    if (!accessToken) {
        return (
            <Routes>
                <Route path='/' element={<PublicPage />} />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path='/' element={<PrivatePage />} />
            </Routes>
        )
    }
}

export default App;
