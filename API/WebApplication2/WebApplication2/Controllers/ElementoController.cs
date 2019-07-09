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

namespace WebApplication2.Controllers
{
    public class ElementoController : ApiController
    {
        // GET api/values
        public IEnumerable<Elemento> Get()
        {
            IDbConnection db = new SqlConnection("Data Source=DESKTOP-VBBJIQF; Initial catalog=DataBaseDiProva;Integrated Security = true;");

            string SqlString = "SELECT * FROM [Arc_Elemento]";

            var ElementiTornati = (List<Elemento>)db.Query<Elemento>(SqlString);

            return ElementiTornati.ToList();
        }
        //GET api/values/Parametro
        public IEnumerable<Elemento> Get(int id)
        {
            IDbConnection db = new SqlConnection("Data Source=DESKTOP-VBBJIQF; Initial catalog=DataBaseDiProva;Integrated Security = true;");

            string SqlString = "SELECT * FROM [Arc_Elemento] WHERE Id_Contenitore =" + id;

            var ElementiTornati = (List<Elemento>)db.Query<Elemento>(SqlString);

            return ElementiTornati;
        }

        //PUT
        public IHttpActionResult putElemento(Elemento elemento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // ***************devo passare qui i campi da immetere nella query***********
            IDbConnection db = new SqlConnection("Data Source=DESKTOP-VBBJIQF; Initial catalog=DataBaseDiProva;Integrated Security = true;");
            string stringhetta = "Update [Arc_Elemento] SET NomeElemento='"+ elemento.NomeElemento+"', DescrizioneElemento='"+ elemento.DescrizioneElemento+"', Id_Contenitore= '"+ elemento.Id_Contenitore +"' WHERE IdElemento =" + elemento.IdElemento ;
            var affectedRows = db.Execute(stringhetta);

            return CreatedAtRoute("DefaultApi", new { id = elemento.IdElemento }, elemento);
        }

        // POST: api/Elemento
        public IHttpActionResult PostElemento(Elemento elemento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // ***************devo passare qui i campi da immetere nella query***********
            IDbConnection db = new SqlConnection("Data Source=DESKTOP-VBBJIQF; Initial catalog=DataBaseDiProva;Integrated Security = true;");
            string stringhetta = "INSERT INTO Arc_Elemento (NomeElemento, DescrizioneElemento, Id_Contenitore) Values ('" + elemento.NomeElemento + "', '" + elemento.DescrizioneElemento + "', '" + elemento.Id_Contenitore + "');";
            var affectedRows = db.Execute(stringhetta);

            return CreatedAtRoute("DefaultApi", new { id = elemento.IdElemento }, elemento);
        }

        [ResponseType(typeof(Elemento))]
        public IHttpActionResult DeleteElemento(int id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // ***************devo passare qui i campi da immetere nella query***********
            IDbConnection db = new SqlConnection("Data Source=DESKTOP-VBBJIQF; Initial catalog=DataBaseDiProva;Integrated Security = true;");
            string stringhetta = "DELETE FROM Arc_Elemento WHERE IdElemento=" + id;
            var affectedRows = db.Execute(stringhetta);

            return Ok();
        }

    }
}
