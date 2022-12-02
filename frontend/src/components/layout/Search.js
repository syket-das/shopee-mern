import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
const Search = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={searchHandler}>
      <InputGroup>
        <Form.Control
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
          type="text"
          id="search_field"
          placeholder="Enter Product Name ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <Button
            id="button-addon1"
            type="submit"
            style={{
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Search
          </Button>
        </div>
      </InputGroup>
    </Form>
  );
};

export default Search;
