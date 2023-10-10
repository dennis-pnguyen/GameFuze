// import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// const apiKey = import.meta.env.VITE_API_KEY;

export default function Search() {
  return (
    <Form className="d-flex">
      <Form.Control
        name="search"
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
}
