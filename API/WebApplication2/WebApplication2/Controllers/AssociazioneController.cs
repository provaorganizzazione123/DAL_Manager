using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;
using Dapper;
using System.Linq;
using System.Web;

namespace WebApplication2.Controllers
{
    public class AssociazioneController : ApiController
    {
        /***** METODO GET: che ritorna tutte le associazioni (records) registrate nella tabella [Tab_Associazioni_Elem] *****/
        public IEnumerable<Associazione> Get()
        {
            /***** APRO LA CONNESSIONE AL DB *****/
            IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());

            string SqlString = "SELECT * FROM [Tab_Associaz_Elem]";

            var ElementiTornati = (List<Associazione>)db.Query<Associazione>(SqlString);

            return ElementiTornati.ToList();
        }

        /***** METODO GET specifico ---> metodo che ritorna una lista di associazioni di un determinato elemento padre registrata nella tabella [Tab_Associazioni_Elem] *****/
        public IEnumerable<string> Get(string id)
        {
            /***** APRO LA CONNESSIONE AL DB *****/
            IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());

            string SqlString = "SELECT Id_elemento2 FROM [Tab_Associaz_Elem] WHERE Id_Elemento1 =" + "'" + id + "'";

            var ElementiTornati = (List<string>)db.Query<string>(SqlString);

            return ElementiTornati;
        }

        /***** METODO POST: che registra nella tabella [Tab_Associazioni_Elem] nuovi Record, tanti quanti i figli associati ad un padre ******
         ***** Questro metodo ritorna una lista di stringhe, che viene gestita nel front end, per stampare                         ******
         ***** l'esito della chiamata a DB con un messaggio visualizzato dall'utente su un TOAST                                  ******/
        public List<string> PostAssociazione(List<string> listaId)
        {
            if (!ModelState.IsValid)
            {
                // return BadRequest(ModelState);
                return new List<string> { "1", "Il model state non è valido" };
            }
            else if (listaId.Count <= 1)
            {
                return new List<string> { "2", "Attenzione, seleziona almeno due elementi da associare" };
            }
            /***** APRO LA CONNESSIONE AL DB *****/
            IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());

            int conta = listaId.Count;
            
            /***** Itero la registrazione a DB tante volte quanti sono i figli da associare *****/
            for (int i = 1; i != conta; i++)
            {
                string idPadre = listaId[0];
                string idFiglio = listaId[i];
                string sqlString = "INSERT INTO Tab_Associaz_Elem (Id_Elemento1,Id_Elemento2) Values ('" + idPadre + "', '" + idFiglio + "');";
                var affectedRows = db.Execute(sqlString);
            }
            return new List<string> { "3", "Associazione avvenuta con successo" };
        }


        /***** METODO che elimina il record nella tabella [Tab_Associazioni_Elem] il quale possiede 
         ***** nel campo IdAssociazione un valore uguale all id passato 
         ***** come parametro.
         ***** Questro metodo ritorna una lista di stringhe, che viene gestita nel front end, per stampare
         ***** l'esito della chiamata a DB con un messaggio visualizzato dall'utente su un TOAST  *****/
        public List<string> DeleteAssociazione(int id)
        {
            if (!ModelState.IsValid)
            {
                return new List<string> { "1", "Model state non valido" };
            }

            /***** APRO LA CONNESSIONE AL DB *****/
            IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());

            //Elimina l'elemento dalla tabella Arc_Elemento
            string sqlString = "DELETE FROM Tab_Associaz_Elem WHERE Id_Associazione=" + id;
            var affectedRows = db.Execute(sqlString);

            return new List<string> { "2", "Elemento disassociato con succcesso" };

        }
    }
}
