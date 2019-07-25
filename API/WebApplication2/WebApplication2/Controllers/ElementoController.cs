using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using Dapper;
using System.Web.Mvc;
using System.Linq;
using System.Web.Http.Description;
using System.Web;
using System;

namespace WebApplication2.Controllers
{
    public class ElementoController : ApiController
    {
        // GET api/values
        public IEnumerable<Elemento> Get()
        {
            IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());

            string SqlString = "SELECT * FROM [Arc_Elemento]";

            var ElementiTornati = (List<Elemento>)db.Query<Elemento>(SqlString);

            return ElementiTornati.ToList();
        }

        public IEnumerable<Elemento> Get(string id)
        {
            IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());

            string SqlString = "SELECT * FROM [Arc_Elemento] WHERE Id_Contenitore =" + id;

            var ElementiTornati = (List<Elemento>)db.Query<Elemento>(SqlString);

            return ElementiTornati;
        }


        // POST: api/Elemento
        public IHttpActionResult PostElemento(Elemento elemento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Genero la chiave primaria:

            string IdGui = "EL" + Guid.NewGuid().ToString().Substring(0, 8);

            // ***************devo passare qui i campi da immetere nella query***********
            IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());
            string stringhetta = "INSERT INTO Arc_Elemento (IdElemento, NomeElemento, DescrizioneElemento, Id_Contenitore) Values ('" + IdGui + "', '" + elemento.NomeElemento + "', '" + elemento.DescrizioneElemento + "', '" + elemento.Id_Contenitore + "');";
            var affectedRows = db.Execute(stringhetta);

            return CreatedAtRoute("DefaultApi", new { id = elemento.IdElemento }, elemento);
        }

        //PUT
        public IHttpActionResult putElemento(Elemento elemento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // ***************devo passare qui i campi da immetere nella query***********
            IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());
            string stringhetta = "Update [Arc_Elemento] SET NomeElemento='"+ elemento.NomeElemento+"', DescrizioneElemento='"+ elemento.DescrizioneElemento+"', Id_Contenitore= '"+ elemento.Id_Contenitore +"' WHERE IdElemento =" + elemento.IdElemento ;
            var affectedRows = db.Execute(stringhetta);

            return CreatedAtRoute("DefaultApi", new { id = elemento.IdElemento }, elemento);
        }

       [ResponseType(typeof(Elemento))]
        public List<string> deleteElemento(string id)
        {
            

            if (!ModelState.IsValid)
            {
                return new List<string> { "1", "Model state non valido" };
            }

            // ***************devo passare qui i campi da immetere nella query***********
            IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());

            string SqlString = "Select * From [Tab_Associaz_Elem]";

            var ElementiTornati = (List<Associazione>)db.Query<Associazione>(SqlString);

            foreach (Associazione ele in ElementiTornati)
            {
                if(ele.Id_Elemento1 == id)
                {
                    return new List<string> { "2", "Non puoi cancellare un elemento Padre di un associazione" };   
                }
               
            }
            //Elimina il record nella tabella associazioni prima di eliminare l'elemento
            string CancFromAssociazioni = "DELETE FROM [Tab_Associaz_Elem] WHERE Id_Elemento2= '" + id + "'";
                var affectedRowsAssociazioni = db.Execute(CancFromAssociazioni);
            
            //Elimina l'elemento dalla tabella Arc_Elemento
            string stringhetta = "DELETE FROM Arc_Elemento WHERE IdElemento= '" + id + "'";
                var affectedRows = db.Execute(stringhetta);

                return new List<string> { "3", "Elemento eliminato con succcesso" };
            
        }

    }
}

