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

namespace WebApplication2.Controllers
{
    public class AssociazioneController : ApiController
    {
        // GET: api/Associazione
        public IEnumerable<Associazione> Get()
        {
            IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());

            string SqlString = "SELECT * FROM [Tab_Associaz_Elem]";

            var ElementiTornati = (List<Associazione>)db.Query<Associazione>(SqlString);

            return ElementiTornati.ToList();
        }

        // GET: api/Associazione/id
        public IEnumerable<int> Get(int id)
        {

          // Metodo che chiama in get la lista delle associazioni di un determinato elemento padre passandogli l'id

          IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());

          string SqlString = "SELECT Id_elemento2 FROM [Tab_Associaz_Elem] WHERE Id_Elemento1 =" + id;

          var ElementiTornati = (List<int>)db.Query<int>(SqlString);

          return ElementiTornati;
        }

    // POST: api/Associazione
    public List<string> PostAssociazione(List<int> listaId)
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
      // ******devo passare qui i campi da immetere nella query****
      IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());
      int conta = listaId.Count;
      for (int i = 1; i != conta; i++)
      {
        int idPadre = listaId[0];
        int idFiglio = listaId[i];
        string stringhetta = "INSERT INTO Tab_Associaz_Elem (Id_Elemento1,Id_Elemento2) Values ('" + idPadre + "', '" + idFiglio + "');";
        var affectedRows = db.Execute(stringhetta);
      }
      return new List<string> { "3", "Associazione avvenuta con successo" };
    }

    // PUT: api/Associazione/5
    public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Associazione/5
        public void Delete(int id)
        {
        }
    }
}
