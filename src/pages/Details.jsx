import React, { useEffect, useState } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import mockSearchDetails from '../api/searchDetails';
import PortalLayout from '../layouts/PortalLayout';
import DetailCard from '../components/DetailCard';
import PaginationComponent from '../components/Pagination';
import theme from '../config/theme';

const Details = ({ location: { pathname, search } } = {}) => {
  const [mockData, setMockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMockSearchDetails = async () => {
    const details = await mockSearchDetails(search);
    const result = [];
    details.forEach((detail) => {
      result.push({
        title: detail.title,
        location: detail.location,
        description: detail.description,
        imageLink: detail.images[0],
        price: detail.price.reduce((acc, { pricing }) => acc.concat(pricing), [])
      });
    });
    setMockData(result);
    setLoading(false);
  };
  useEffect(() => {
    setTimeout(() => getMockSearchDetails(search), 1000);
  });
  return (
    <PortalLayout pathname={pathname}>
      <div>
        <div className="row" style={{ 'margin-bottom': '20px' }}>
          <div
            className="ui menu"
            style={{ borderColor: theme.colours.maroon }}
          >
            <div className="header item">Filter by</div>
            <a href="!#" className="item">
              Price
            </a>
            <a href="!#" className="item">
              Distance
            </a>
            <a href="!#" className="item">
              Alphatbetical
            </a>
          </div>
        </div>
        {loading ? (
          <div>
            <div className="row">
              <Grid centered stackable columns={2}>
                <Grid.Column width={10}>
                  {[...Array(10)].map(() => (
                    <DetailCard />
                  ))}
                </Grid.Column>
                <Grid.Column width={4}>
                  <Segment style={{ borderColor: theme.colours.maroon }}>
                    TODO: MAP
                  </Segment>
                </Grid.Column>
              </Grid>
            </div>
          </div>
        ) : (
          <div>
            <div className="row">
              <Grid centered stackable columns={2}>
                <Grid.Column width={10}>
                  {mockData.map((result) => (
                    <DetailCard {...result} />
                  ))}
                </Grid.Column>
                <Grid.Column width={4}>
                  <Segment style={{ borderColor: theme.colours.maroon }}>
                    TODO: MAP
                  </Segment>
                </Grid.Column>
              </Grid>
            </div>
          </div>
        )}
        <Grid centered>
          <Grid.Row style={{ 'margin-top': '20px' }}>
            <PaginationComponent totalPages={mockData.length} />
          </Grid.Row>
        </Grid>
      </div>
    </PortalLayout>
  );
};

export default Details;
