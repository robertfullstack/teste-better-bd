import React, { useEffect, useState } from "react";
import Dexie from "dexie";


// cria banco local
const banco = new Dexie("MeuBancoTeste");


// cria tabela
banco.version(1).stores({

  mensagens:
    "++id,texto"

});



function App() {


  const [texto, setTexto] = useState("");

  const [lista, setLista] = useState([]);




  useEffect(() => {

    carregar();

  }, []);





  async function salvar() {


    await banco.mensagens.add({

      texto: texto

    });


    setTexto("");

    carregar();


  }




  async function carregar() {


    const dados =
      await banco.mensagens
        .orderBy("id")
        .reverse()
        .toArray();


    setLista(dados);


  }




  return (

    <div
      style={{
        textAlign: "center",
        marginTop: 50
      }}
    >


      <h1>
        Teste Banco Local
      </h1>


      <input

        value={texto}

        onChange={
          e => setTexto(e.target.value)
        }

        placeholder="Digite um texto"

        style={{
          padding: 10,
          width: 250
        }}

      />


      <br /><br />


      <button

        onClick={salvar}

        style={{
          padding: 10
        }}

      >

        Salvar

      </button>



      <button

        onClick={carregar}

        style={{
          padding: 10,
          marginLeft: 10
        }}

      >

        Buscar

      </button>



      <hr />


      <h2>
        Dados salvos:
      </h2>



      {

        lista.map(item => (

          <p key={item.id}>

            #{item.id} - {item.texto}

          </p>


        ))

      }



    </div>

  );


}


export default App;