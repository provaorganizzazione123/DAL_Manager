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
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Contenitore/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Contenitore/5
        public void Delete(int id)
        {
        }
    }
}
