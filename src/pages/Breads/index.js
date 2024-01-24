import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../../services/api';

export default function Breads(){

  const[my_breads, setBreads] = useState([]);
  const navigate = useNavigate();

  // read, busca todos os registros na api
  useEffect(() => {
    api.get('api/v1/breads',{})
    .then(response => {setBreads(response.data)})
  },[]);

  // update, navega para pagina NewUpdate
  async function updateBread(id){
    try {
      navigate(`/newupdate/${id}`);
    } catch (error) {
      alert('erro ao acessar NewUpdate');      
    }
  }

  // delete, exclui um registro na api
  async function deleteBread(id){
    try {
      await api.delete(`api/v1/breads/${id}`,{});
      setBreads(my_breads.filter(bread => bread.id !== id));
    } catch (error) {
      alert('erro ao excluir');      
    }
  }

  return(

    <div data-testid="mycard" className="card border-primary" style={{marginTop: '20px'}} >
      <div className="card-header bg-primary" style={{color: '#fff'}}>
        Breads Crud
      </div>
      <div className="card-body">

        <Link data-testid="mylink" className="btn btn-success" 
        style={{marginBottom: '10px'}} to="/newupdate/0">Novo</Link>

        <table data-testid="mytable" className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Preço</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {my_breads.map(bread => (
              <tr key={bread.id}>
                <th scope="row">{bread.id}</th>
                <td>{bread.name}</td>
                <td>{bread.price}</td>
                <td>

                  <button data-testid="mybtn1" type="button"
                  className="btn btn-outline-info" style={{margin: '2px'}}
                  onClick={() => updateBread(bread.id)}>Editar</button>

                  <button data-testid="mybtn2" type="button"
                  className="btn btn-outline-danger" style={{margin: '2px'}}
                  onClick={() => deleteBread(bread.id)}>Excluir</button>

                </td>
              </tr>
            ))}
            
          </tbody>
        </table>

      </div>
    </div>

  );

}