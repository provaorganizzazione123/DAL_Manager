using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Dapper;
using System.Net.Http.Headers;

namespace WebApplication2.Controllers
{
    public class ValuesController : ApiController
    {
        //static List<string> Stringhe = new List<string>()
        //{
        //    "Valore1","Valore2","Valore3"
        //};

       

        // POST api/values
        public void Put()
        {
            int IdElemento = 5;
            string NomeElemento = "Inseriment";
            string DescrizioneElemento = "Inserimento Avvenuto Con Successo";
            string TipologiaElemento = "Tipologia 23";

            IDbConnection db = new SqlConnection("Data Source=DESKTOP-JGEGIP6\\SQLEXPRESS; Initial catalog=DataBaseDiProva;Integrated Security = true;");
            string stringhetta = "INSERT INTO Arc_Elementi Values '" + IdElemento + "', '" + NomeElemento + "', '"+ DescrizioneElemento +"', '" + TipologiaElemento +"';" ;
            var affectedRows = db.Execute(stringhetta);


        }
        // PUT api/values/5
        //public void Put(int id, [FromBody]string value)
        //{
        //    Stringhe[id] = value;
        //}

        // DELETE api/values/5
        //public void Delete(int id)
        //{
        //    Stringhe.RemoveAt(id);
        //}


    }
}
