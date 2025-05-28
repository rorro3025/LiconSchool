import React, { useState } from 'react';
import { makeHTTPRequest } from '@/utils';
import {Container, Input, NativeSelect, Button} from '@mantine/core'
//import { useFetch} from '@mantine/hooks'

const HTTPClient = () => {
  const [url, setUrl] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('GET');
  //const {loading, data, error } = useFetch('/')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedOption)
    if(url.trim() === '') return alert('no valid url')
    
    const response = await makeHTTPRequest(`/api/${url}`, {
        method: selectedOption,
        body: selectedOption === 'POST' ?  { odm: 90900 } : undefined
    })

    console.log(response)
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '600px' }}>
    <form onSubmit={handleSubmit}>
      <Container>
        <label htmlFor="url">URL:</label>
        <Input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
      </Container>
      
      <Container>
        <label htmlFor="options">Select an option:</label>
        <NativeSelect data={['GET', 'POST', 'PATCH', 'DELETE']} value={selectedOption} onChange={({target})=>setSelectedOption(target.value)}/>
       </Container>
      <Button type="submit" fullWidth >Submit</Button>
    </form>
    </Container>
  );
};

export default HTTPClient;
