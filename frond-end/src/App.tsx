import { useState } from "react";
import { Navbar, Container, Row, Col, Alert } from "react-bootstrap";
import Map from "./components/Map";
import logo from "./assets/react.svg"
import { LocationData } from "./types/Map";
import FileUpload from "./components/FileUpload";
import TemperatureToggle from "./components/TemperatureToggle";
import { STRINGS } from "./utils/variables";

const App = () => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [data, setData] = useState<LocationData[]>(() => {
    const storedData = localStorage.getItem("map_data");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [message, setMessage] = useState<{ text: string; type: "success" | "danger" | null }>({
    text: "",
    type: null,
  });

  const handleDataUpload = (newData: LocationData[], error?: string) => {
    if (error) {
      setMessage({ text: error, type: "danger" });
    } else {
      setData(newData);
      setMessage({ text: STRINGS.MSG_FILE_UPLOADED_SUCCESS, type: "success" });
    }
    setTimeout(() => setMessage({ text: "", type: null }), 5000);
  };

  const toggleTemperatureUnit = () => setIsCelsius((prev) => !prev);

  return (
    <Container fluid className="vh-100 p-0 d-flex flex-column">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand href="#">
          <img src={logo} alt="Logo" width={50} className="me-2" /> {STRINGS.MAP_TITLE}
        </Navbar.Brand>
      </Navbar>

      <Row className="flex-grow-1 m-0">
        {/* Sidebar */}
        <Col md={3} className="bg-light shadow p-4 d-flex flex-column align-items-center">
          <FileUpload onDataUploaded={handleDataUpload} />
          {message.type && <Alert variant={message.type} className="mt-3 w-100 text-center">{message.text}</Alert>}
          <div className="mt-3">
            <TemperatureToggle isCelsius={isCelsius} onToggle={toggleTemperatureUnit} />
          </div>
        </Col>

        {/* Map View */}
        <Col md={9} className="p-0">
          <div className="w-100 h-100 position-relative">
            <Map data={data} unit={isCelsius ? 1 : 2} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
