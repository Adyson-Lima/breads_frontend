import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../../services/api';

export default function NewUpdate(){

  const[name, setName] = useState('');
  const[price, setPrice] = useState('');
  const navigate = useNavigate();

  // bread_id definido na rota NewUpdate
  const{bread_id} = useParams();

  // recebe e manipula eventos do form
  async function saveOrUpdate(e){

    e.preventDefault();

    const data = {name, price};

    if (bread_id === '0') {
      try {
        await api.post('api/v1/breads', data, {});
        navigate('/');
      } catch (error) {
        alert('erro ao salvar');        
      }      
    } else {
      try {
        await api.patch(`api/v1/breads/${bread_id}`, data, {});
        navigate('/');
      } catch (error) {
        alert('erro ao atualizar');        
      }      
    }
  }

  // busca um registro espeficio na api e seta dados para atualização
  async function loadBread(){
    try {
      const response = await api.get(`api/v1/breads/${bread_id}`,{});
      setName(response.data.name);
      setPrice(response.data.price);      
    } catch (error) {
      alert('erro ao buscar registro');
      navigate('/');      
    }
  }

  // chama loadBread e preenche form
  useEffect(() => {
    if (bread_id === '0') {
      return;      
    } else {
      loadBread();      
    }
  }, [bread_id]);

  return(

    <div data-testid="mycard" className="card border-primary" style={{marginTop: '20px'}} >
      <div className="card-header bg-primary" style={{color: '#fff'}}>
        Breads Crud
      </div>
      <div className="card-body">

        <Link data-testid="mylink" className="btn btn-dark" 
        style={{marginBottom: '5px'}} to="/">Home</Link>

        <form data-testid="myform" onSubmit={saveOrUpdate}>

          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input data-testid="input1" id="name" type="text" 
            style={{marginBottom: '20px'}} className="form-control" 
            placeholder="Nome" value={name}
            onChange={e => setName(e.target.value)}></input>
          </div>

          <div className="form-group">
            <label htmlFor="price">Preço</label>
            <input data-testid="input2" id="price" type="text" 
            style={{marginBottom: '20px'}} className="form-control" 
            placeholder="Preço" value={price}
            onChange={e => setPrice(e.target.value)}></input>
          </div>

          <button data-testid="btnenviar" type="submit" className="btn btn-primary">Enviar</button>

        </form>

      </div>
    </div>

  );

}