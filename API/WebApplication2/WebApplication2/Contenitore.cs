using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApplication2
{
    public class Contenitore
    {
        public string Id_Contenitore { get; set; }
        public string Nome_Contenitore { get; set; }       
        public string Colore_Contenitore { get; set; }
    }
}