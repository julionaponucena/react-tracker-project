import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CategoryPage from './pages/category/CategoryPage.tsx'
import EditCategory from './pages/category/EditCategory.tsx'
import AddCategory from "./pages/category/AddCategory.tsx";
import MomentPage from "./pages/moment/MomentPage.tsx";
import AddMoment from "./pages/moment/AddMoment.tsx";
import EditMoment from "./pages/moment/EditMoment.tsx";
import TestSelect from "./components/TestSelect.tsx";
import {Container, Navbar, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import MusicPage from "./pages/music/MusicPage.tsx";
import AddMusicPage from "./pages/music/AddMusicPage.tsx";
import EditMusicPage from "./pages/music/EditMusicPage.tsx";
import BandPage from "./pages/band/BandPage.tsx";
import AddBandPage from "./pages/band/AddBandPage.tsx";
import EditBandPage from "./pages/band/EditBandPage.tsx";
import MusicTemperaturePage from "./pages/musictemperature/MusicTemperaturePage.tsx";
import AddMusicTemperaturePage from "./pages/musictemperature/AddMusicTemperaturePage.tsx";
import EditMusicTemperaturePage from "./pages/musictemperature/EditMusicTemperaturePage.tsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/form">Form</Nav.Link>
                <Nav.Link as={Link} to="/moments">Momentos</Nav.Link>
                <Nav.Link as={Link} to="/categories">Categorias</Nav.Link>
                <Nav.Link as={Link} to="/musics">Músicas</Nav.Link>
                <Nav.Link as={Link} to="/bands">Bandas</Nav.Link>
                <Nav.Link as={Link} to="/music-temperatures">Temperaturas Musicais</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/musics" element={<MusicPage/>}/>
          <Route path="/musics/add" element={<AddMusicPage/>}/>
          <Route path="/musics/edit/:id" element={<EditMusicPage/>}/>
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/edit/:id" element={<EditCategory />} />
          <Route path="/add" element={<AddCategory />} />
          <Route path="/moments" element={<MomentPage/>}/>
          <Route path="/moments/add" element={<AddMoment/>}/>
          <Route path="/moments/edit/:id" element={<EditMoment/>}/>
          <Route path="/bands" element={<BandPage/>}/>
          <Route path="/bands/add" element={<AddBandPage/>}/>
          <Route path="/bands/edit/:id" element={<EditBandPage/>}/>
          <Route path="/music-temperatures" element={<MusicTemperaturePage/>}/>
          <Route path="/music-temperatures/add" element={<AddMusicTemperaturePage/>}/>
          <Route path="/music-temperatures/edit/:id" element={<EditMusicTemperaturePage/>}/>
          <Route path="/test" element={<TestSelect/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
