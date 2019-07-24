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
  public class ContenitoreController : ApiController
  {
    // GET: api/Contenitore
    public IEnumerable<Contenitore> Get()
    {

      IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());

      string SqlString = "SELECT * FROM [Arc_Contenitori]";

      var ElementiTornati = (List<Contenitore>)db.Query<Contenitore>(SqlString);

      return ElementiTornati.ToList();
    }

    // POST: api/Contenitore       
    public List<string> postContenitore(Contenitore Contenitore)
    {
      if (!ModelState.IsValid)
      {
        // return BadRequest(ModelState);
        return new List<string> { "1", "Il model state non è valido" };
      }

      // Genero la chiave primaria:

      string IdGui = "CN" + Guid.NewGuid().ToString().Substring(0, 8);

      // ******devo passare qui i campi da immetere nella query****
      IDbConnection db = new SqlConnection(HttpContext.Current.Application["SqlString"].ToString());
     
      string stringhetta = "INSERT INTO Arc_Contenitori (Id_Contenitore, Nome_Contenitore , Colore_Contenitore) Values ('" + IdGui + "', '" + Contenitore.Nome_Contenitore + "', '" + Contenitore.Colore_Contenitore + "');";
      try { var affectedRows = db.Execute(stringhetta);
            return new List<string> { "2", "Contenitore inserito con successo" };
      }
      catch { return new List<string> { "3", "Contenitore già esistente" }; }     
    }


    // PUT: api/Contenitore/5
    public void Put(string id, [FromBody]string value)
    {
    }

    // DELETE: api/Contenitore/5
    public void Delete(string id)
    {
    }
  }
}
