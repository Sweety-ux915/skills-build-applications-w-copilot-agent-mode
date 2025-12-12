import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched leaderboard data:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return ( 
    <Card className="mb-4">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Leaderboard</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id || idx}>
                <td>{item.name}</td>
                <td>{item.points}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Leaderboard;
