import React, { useEffect, useState } from 'react';
import { Card, Table, Button } from 'react-bootstrap';

const Activities = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Activities API endpoint:', endpoint);
        console.log('Fetched activities data:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Activities</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Duration (min)</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id || idx}>
                <td>{item.name}</td>
                <td>{item.duration}</td>
                <td>{item.calories}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary">Add Activity</Button>
      </Card.Body>
    </Card>
  );
};

export default Activities;
