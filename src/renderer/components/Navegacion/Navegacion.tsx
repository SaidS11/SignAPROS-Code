import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavegacionStyle.css';

export interface NavProps {
  onClickNav: (arg0: string) => void;
}

function Navegacion(props: NavProps) {
  const { onClickNav } = props;
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="nav-bar-background"
      variant="dark"
    >
      <Container style={{ margin: '0px' }}>
        <Navbar.Brand
          style={{ cursor: 'pointer' }}
          onClick={() => onClickNav('')}
        >
          SignAPROS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link  onClick={() => onClickNav('')}>
                About
              </Nav.Link>
            </Nav.Item>
            <NavDropdown
              title="Protocol"
              id="collasible-nav-dropdown"
            >
              <NavDropdown title="Configurations" id="mi-navbar" className="test">
                <NavDropdown.Item
                  onClick={() => onClickNav('crearConfiguracion')}
                >
                  Create Configuration
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onClickNav('verConfiguracion')}>
                  View Configurations
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Experiments" id="mi-navbar" className="test">
                <NavDropdown.Item onClick={() => onClickNav('crearProtocolo')}>
                  Create Experiment
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onClickNav('verProtocolo')}>
                  View Experiments
                </NavDropdown.Item>
              </NavDropdown>
            </NavDropdown>
            <NavDropdown title="AI Analysis" id="collasible-nav-dropdown">
              {/* <NavDropdown.Item onClick={() => onClickNav('crearAnalisis')}>
                Crear Analisis
              </NavDropdown.Item> */}
              <NavDropdown title="Algorithm Settings" id="mi-navbar" className="test">
                <NavDropdown.Item
                    onClick={() => onClickNav('crearImplementacion')}
                  >
                  Tune Algorithm
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => onClickNav('verImplementaciones')}
                >
                  View Algorithms
                </NavDropdown.Item>
                
              </NavDropdown>
              <NavDropdown.Item onClick={() => onClickNav('prediccion')}>
                Prediction
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => onClickNav('entrenar')}>
                Training and Characterization
              </NavDropdown.Item>
              {/* <NavDropdown.Item onClick={() => onClickNav('verAnalisis')}>
                Ver Análisis
              </NavDropdown.Item> */}
            </NavDropdown>
            
            <NavDropdown title="Subjects" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => onClickNav('buscarPaciente')}>
                Signal Acquisition
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => onClickNav('agregarPaciente')}>
                Add
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;

 {/* <NavDropdown.Item onClick={() => onClickNav('probarSensores')}>
                Probar Sensores
              </NavDropdown.Item> */}