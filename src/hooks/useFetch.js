import {useState, useEffect} from 'react';

export const useFetch = (url) => {
  const [state, setState] = useState({data: '', loading: true, error: ''}, ) ;
  // const [error, setError] = useState('') ;

  useEffect(() => {
    console.log('el url: '+ url)
    fetch(url)
    .then(res => res.json())
    .then(data => {
      setState({
        ...state,
        data,
        loading: false
      })
    })
    .catch( error => {
      setState({
        ...state,
        loading: false,
        error
      })
    })
  }, [url])

  return state;
}