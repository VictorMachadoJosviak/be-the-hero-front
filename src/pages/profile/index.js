import React,{useEffect,useState} from "react";
import { Link,useHistory} from 'react-router-dom'

import './styles.css'
import logoImg from '../../assets/logo.svg'
import { FiPower,FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'



export default function Profile(){

    const history = useHistory();
    const [incidents,setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(()=> {
        api.get('/profile',{
            headers:{
                Authorization:ongId
            }
        }).then(response=>{
            setIncidents(response.data);
        });

    },[ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`/incident/${id}`,{
                headers:{
                    Authorization:ongId
                }
            })

            setIncidents(incidents.filter(x=>x.id !== id));
        } catch (error) {
            alert('deu ruim au deletear caso');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');

    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The hero"/>
                <span>Bem vindo a {ongName}</span>
                <Link className="button" to="incidents/new" >Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="e02041"></FiPower>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident =>(
                    <li key={incident.id}>
                        <strong>CASO: </strong>
                        <p>{incident.title}</p>
                        <strong>DESCRICAO: </strong>
                        <p>{incident.description}</p>
                        <strong>VALOR: </strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency' , currency:'BRL'}).format(incident.value)}</p>
    
                        <button type="button" onClick={()=> handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}