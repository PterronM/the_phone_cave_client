import { useEffect, useState } from "react";
import { getAllMobile } from "../services/mobile";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


function Home() {
  const [allMobile, setAllMobile] = useState(null);
  const [isFeaching, setIsFeaching] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFeaching(true);
    try {
      const response = await getAllMobile();
      setAllMobile(response.data);
      setIsFeaching(false);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isFeaching ? (
        <h2>Buscando....</h2>
      ) : (
        <div className="d-flex justify-content-between flex-wrap p-4">
          {allMobile.map((eachMobile) => {
        
            return (
              <span key={eachMobile._id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Img variant="top" src={`/img/${eachMobile.imageFileName}`} ></Card.Img>
                    <Card.Title>{eachMobile.name}</Card.Title>
                    <Card.Text>{eachMobile.manufacturer}</Card.Text>
                    <Link to={`/phones/${eachMobile._id}`}>
                      <Button variant="primary">Detalles</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
