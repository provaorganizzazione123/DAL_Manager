using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2
{
    //***** MODEL che rispecchia la tabella [Tab_Associaz_Elem] *****//
  public class Associazione
  {

    public int? Id_Associazione { get; set; }

    public string Id_Elemento1 { get; set; }

    public string Id_elemento2 { get; set; }


  }
}
