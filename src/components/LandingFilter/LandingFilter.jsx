import React, { useState } from 'react';
import { Grid, Form } from 'semantic-ui-react';
import {
  CategoryHeader,
  BriefText,
  ButtonWrapper,
  Container
} from './LandingFilter.styles';
import { KeywordInput } from '../KeywordInput/KeywordInput';
import { DropdownHolder } from '../Dropdown/Dropdown';
import { PriceSlider } from '../PriceSlider/PriceSlider';
import { ExploreButton } from '../ExploreButton/ExploreButton';

export const LandingFilter = ({ category } = {}) => {
  const [values, setValues] = useState({
    keyword: '',
    region: '',
    pax: '',
    ratings: '',
    price: '100'
  });
  const onChange = (e, result) => {
    const { name, value } = result || e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = () => `/detail/?category="${category.categoryName}"&keyword="${values.keyword}"&region="${values.region}"&pax=${values.pax}&ratings=${values.ratings}&price=${values.price}`;

  return (
    <Container>
      <Grid container>
        <Grid.Column mobile={4} tablet={3} computer={2} />
        <Grid.Column mobile={12} tablet={8} computer={6}>
          <Form>
            <Form.Field>
              <CategoryHeader>{category.categoryName}</CategoryHeader>
              <BriefText>
                {category.description}
              </BriefText>
            </Form.Field>
            <br />
            <Form.Field>
              <KeywordInput value={values.keyword} onChange={onChange} />
            </Form.Field>
            <Form.Field>
              <Grid columns={3} stackable>
                <Grid.Column>
                  <DropdownHolder
                    placeholder="Region"
                    name="region"
                    value={values.region}
                    onChange={onChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <DropdownHolder
                    placeholder="Pax"
                    name="pax"
                    value={values.pax}
                    onChange={onChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <DropdownHolder
                    placeholder="Ratings"
                    name="ratings"
                    value={values.ratings}
                    onChange={onChange}
                  />
                </Grid.Column>
              </Grid>
            </Form.Field>
            <Form.Field>
              <PriceSlider
                updatePrice={(value) => {
                  setValues({ ...values, price: value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <ButtonWrapper>
                <ExploreButton handleSubmit={handleSubmit} />
              </ButtonWrapper>
            </Form.Field>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
