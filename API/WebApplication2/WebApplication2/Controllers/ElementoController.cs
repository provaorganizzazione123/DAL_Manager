using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;
using Dapper;
using System.Linq;
using System.Web.Http.Description;
using System.Web;
using System;

namespace WebApplication2.Controllers
{
    public class ElementoController : ApiController
    {
        /***** METODO GET: che ritorna tutti gli elementi (records) registrati nella tabella [Arc_Elemento]*****/
        public IEnumerable<Elemento> Get()
        {
            IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());

            string SqlString = "SELECT * FROM [Arc_Elemento]";

            var ElementiTornati = (List<Elemento>)db.Query<Elemento>(SqlString);

            return ElementiTornati.ToList();
        }
        /***** METODO GET Specifico: che ritorna un elemento specifico registrato nella tabella [Arc_Elemento]*****/
        public IEnumerable<Elemento> Get(string id)
        {
            /***** APRO LA CONNESSIONE AL DB *****/
            IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());

            string SqlString = "SELECT * FROM [Arc_Elemento] WHERE Id_Contenitore =" + id;

            var ElementiTornati = (List<Elemento>)db.Query<Elemento>(SqlString);

            return ElementiTornati;
        }

        /***** METODO POST: che registra nella tabella [Arc_Elemento] un nuovo Record *****/
        public IHttpActionResult PostElemento(Elemento elemento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Genero la chiave primaria:

            string IdGui = "EL" + Guid.NewGuid().ToString().Substring(0, 8);

            /***** APRO LA CONNESSIONE AL DB *****/
            IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());

            string SqlString = "INSERT INTO Arc_Elemento (IdElemento, NomeElemento, DescrizioneElemento, Id_Contenitore) Values ('" + IdGui + "', '" + elemento.NomeElemento + "', '" + elemento.DescrizioneElemento + "', '" + elemento.Id_Contenitore + "');";
            var affectedRows = db.Execute(SqlString);

            return CreatedAtRoute("DefaultApi", new { id = elemento.IdElemento }, elemento);
        }

        /***** METODO PUT: che sovrascrive il record nella tabella [Arc_Elemento] il quale possiede 
         ***** nel campo IdElemento un valore uguale all IdElemento dell'Elemento passato 
         ***** come parametro *****/
        public IHttpActionResult putElemento(Elemento elemento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            /***** APRO LA CONNESSIONE AL DB *****/
            IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());
            string SqlString = "Update [Arc_Elemento] SET NomeElemento='" + elemento.NomeElemento + "', DescrizioneElemento='" + elemento.DescrizioneElemento + "', Id_Contenitore= '" + elemento.Id_Contenitore + "' WHERE IdElemento = '" + elemento.IdElemento + "'";
            var affectedRows = db.Execute(SqlString);

            return CreatedAtRoute("DefaultApi", new { id = elemento.IdElemento }, elemento);
        }

        /***** METODO DELETE: che elimina il record nella tabella [Arc_Elemento] il quale possiede 
         ***** nel campo IdElemento un valore uguale all id passato 
         ***** come parametro.
         ***** Questro metodo ritorna una lista di stringhe, che viene gestita nel front end, per stampare
         ***** l'esito della chiamata a DB con un messaggio visualizzato dall'utente su un TOAST  *****/
        [ResponseType(typeof(Elemento))]
        public List<string> deleteElemento(string id)
        {
            if (!ModelState.IsValid)
            {
                return new List<string> { "1", "Model state non valido" };
            }

            /***** APRO LA CONNESSIONE AL DB *****/
            IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());

            string SqlString = "Select * From [Tab_Associaz_Elem]";

            var ElementiTornati = (List<Associazione>)db.Query<Associazione>(SqlString);

            // controllo se l'id passato come parametro è padre in qualche associazione
            foreach (Associazione ele in ElementiTornati)
            {
                if (ele.Id_Elemento1 == id)
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

